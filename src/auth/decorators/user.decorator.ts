import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.user) throw new HttpException('User in request not found, (AuthGuard Called?)', HttpStatus.INTERNAL_SERVER_ERROR);
    return request.user;
  },
);