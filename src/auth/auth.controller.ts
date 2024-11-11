import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from './dtos';
import { AuthPatterns, NATS_SERVICE } from 'src/common/constants';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards';
import { Token, User } from './decorators';
import { LoggedUser } from './interfaces';

@Controller('auth')
export class AuthController {

  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  @Post('register-user')
  onRegisterUser(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send(AuthPatterns.REGISTER_USER, registerUserDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Post('login-user')
  onLoginUser(@Body() loginUserDto: LoginUserDto) {
    return this.client.send(AuthPatterns.SIGN_IN_USER, loginUserDto)
      .pipe(
        catchError(error => {
          throw new RpcException(error);
        })
      );
  }

  @Get('refresh-token')
  @UseGuards(AuthGuard)
  onRefreshToken(@User() user: LoggedUser, @Token() token: string) {
    // console.log({user, token});
    return {
      user, 
      token,
    }
  }
}
