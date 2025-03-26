import { Controller, Inject, Post, Get, UseInterceptors, UsePipes, Body, Delete, Res, UseGuards, Req, UnauthorizedException, Param } from '@nestjs/common';
import { AccountService } from './account.service';
import { LoggerInterceptor } from 'src/common/logger.interseceptor';
import { ValidationService } from 'src/common/validation.service';
import { AccountLoginDTO, AccountLoginSchema, AccountSignupDto, AccountSignupSchema, AccountUpdateDTO, AccountUpdateSchema } from './account.schema';
import { Request, Response } from 'express';
import { Roles } from 'src/common/Role';
import { AuthnGuard } from 'src/common/authn.guard';
import { AuthzGuard } from 'src/common/authz.guard';
import { GetUser } from 'src/common/GetUser';

@Controller('api/account')
@UseInterceptors(LoggerInterceptor)
export class AccountController {

    constructor(@Inject() private accountService:AccountService){}

    @Post('/signup')
    @UsePipes(new ValidationService(AccountSignupSchema))
    async create(@Body() req: AccountSignupDto) {
        return await this.accountService.signUp(req)
    }

    @Post("/login")
    @UsePipes(new ValidationService(AccountLoginSchema))
    async login(@Body() req: AccountLoginDTO, @Res() res: Response) {
        const {response, refresh_token} = await this.accountService.login(req);
        res.cookie("refresh_token",refresh_token,{httpOnly:true, secure:true, sameSite:'lax'})
        return res.json(response)
    }

    @UseGuards(AuthnGuard, AuthzGuard)
    @Roles("user", "admin")
    @Post("/update")
    async updateAccount(@Req() req:Request&{user:{id:string}, body:AccountUpdateDTO}){
        if (!req.user.id || !req.body.id || req.user.id !== req.body.id ) {
            throw new UnauthorizedException()
        }
        const arg = {id:req.body.id};
        if (req.body.username) arg['username']=req.body.username;
        if (req.body.email) arg['email']=req.body.email;
        return await this.accountService.updateAccount(arg);
    }
    
    @UseGuards(AuthnGuard, AuthzGuard)
    @Roles("user", "admin")
    @UsePipes(new ValidationService(AccountUpdateSchema))
    @Post("/forget")
    async forgetPassword(@Req() req:Request&{user:{id:string}, body:{id:string, password:string}}){
        if (!req.user.id || !req.body.id || req.user.id !== req.body.id ) {
            throw new UnauthorizedException()
        }
        return await this.accountService.forgetPassword(req.body.id, req.body.password);
    }
    
    @UseGuards(AuthnGuard, AuthzGuard)
    @Roles("user", "admin")
    @Get()
    async getAccountById(@GetUser('id') id: string) {
        return await this.accountService.getAccountById(id);
    }

    @UseGuards(AuthnGuard, AuthzGuard)
    @Roles("user", "admin")
    @Get("/all")
    async getAllAccount() {
        return await this.accountService.getAllAccount()
    }

    @UseGuards(AuthnGuard, AuthzGuard)
    @Roles("user", "admin")
    @Delete()
    async deleteAccount(){
      return await this.accountService.deleteUser()
    }
}
