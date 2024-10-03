import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const rpcError = exception.getError(); // La forma que tiene el error es ej: { message: 'Product Not Found', status: 404 }
    const context = host.switchToHttp();
    const response = context.getResponse();
    //console.log({rpcError});
    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      return response
        .status(rpcError.status)
        .json({ status: rpcError.status, message: rpcError.message });
    }
    return response.status(400).json({status: 400, message: rpcError});
  }
}
