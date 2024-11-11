
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Request } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthPatterns, NATS_SERVICE } from 'src/common/constants';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token Not Found.');
    }
    try {
      const { user, token: newToken } = await firstValueFrom(
        this.client.send(AuthPatterns.REFRESH_TOKEN_USER, token)
        // .pipe(
        //   catchError(
        //     error => { 
        //       throw new HttpException(error, HttpStatus.UNAUTHORIZED) 
        //     }
        //   )
        //   )
        );
      request['user'] = user;
      request['token'] = newToken;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
