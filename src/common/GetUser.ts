import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      
      if (!request.user) {
        throw new UnauthorizedException("User not found in request");
      }
      
      return data? request.user?.[data]:request.user;
    },
  );