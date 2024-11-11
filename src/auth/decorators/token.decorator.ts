import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';

export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request.token) throw new HttpException('Token in request not found, (AuthGuard Called?)', HttpStatus.INTERNAL_SERVER_ERROR);
    return request.token;
  },
);