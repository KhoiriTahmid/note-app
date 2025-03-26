import { ConflictException, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import * as bcrypt from "bcrypt";
import { AccountLoginDTO, AccountSignupDto } from "./account.schema";
import {JwtService} from "@nestjs/jwt";
import { ConfigService } from '@nestjs/config';
import { successResponseMaker } from 'src/modelAndSchema/model';
import { CustomException } from 'src/common/customException';

@Injectable()
export class AccountService {
    constructor(
        private prismaService: PrismaService,
        private configService: ConfigService,
        private jwtService: JwtService
    ){}

    async signUp({username, email, password, role}: AccountSignupDto){
        const res = await this.prismaService.account.findMany({where:{ OR:[{username}, {email}]}})
        if (res.length==0) {
            password= bcrypt.hashSync(password,10);
            const {password:_, ...result} = await this.prismaService.account.create({data:{username, email, password, role}});
            return successResponseMaker("success create account.", result)
        }
        let errors:any[] = [];
        if (res.some(account=>account.email===email)) {
            errors.push({field:"email", desc:"already exist"})
        }
        if (res.some(account=>account.username===username)) {
            errors.push({field:"username", desc:"already exist"})
        }
        throw new CustomException(400, "conflict with existing data.",errors)

    }

    async getAccountById(id:string){
        const result = await this.prismaService.account.findUnique({where:{id}});
        if (!result) {
            throw new NotFoundException("Account not found");
        }
        const {password:_, ...res} = result
        return successResponseMaker("Account ditemukan",res)
    }

    async updateAccount({id,email,username}:{id: string, email?:string, username?:string}){
        if (!email && !username) {
            throw new HttpException("there is no email and username you passed", 400);
        }
        let data:Record<string, string>={}
        if(email) data.email=email;
        if(username) data.username=username;

        console.info(data)
        const {password,...result} = await this.prismaService.account.update({where:{id}, data});

        return successResponseMaker("account succesfully updated",result)
    }

    async forgetPassword(id:string,password:string){
        const hashedPassword = bcrypt.hashSync(password, 10);
        const {password:_, ...result} = await this.prismaService.account.update({where:{id},data:{password} });

        return successResponseMaker("success update password", result)
    }

    async getAllAccount(){
        return await this.prismaService.account.findMany()
    }

    async deleteUser(key: string = "koko"){
        return await this.prismaService.account.deleteMany({where:{username:key}})
    }

    async login({usernameOrEmail ,password}: AccountLoginDTO){
        const res = await this.prismaService.account.findFirst({where:{OR:[{username:usernameOrEmail}, {email:usernameOrEmail}]}});
        if(!res){
            throw new NotFoundException("username or email not found")
        }
        if (!bcrypt.compareSync(password, res.password)) {
            throw new HttpException('password wrong',400)
        }
        const access_key = this.configService.get<string>('ACCESS_TOKEN_KEY')
        const refresh_key = this.configService.get<string>('REFRESH_TOKEN_KEY')
        if(!access_key || !refresh_key){
            throw new InternalServerErrorException()
        }
        const access_token = this.jwtService.sign({id:res.id, username:res.username, role:res.role, tokenType:"access"}, { secret: access_key, expiresIn: '60m' })
        const refresh_token = this.jwtService.sign({id:res.id, tokenType:"refresh"}, { secret: refresh_key, expiresIn: '7d' })

        return {refresh_token, response:successResponseMaker("login success.", {access_token})}
    }
}
