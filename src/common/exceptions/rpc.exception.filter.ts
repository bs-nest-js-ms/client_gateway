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

    if (rpcError.toString().includes('Empty response')) {
      return response.status(500).json({status: 500, message: getErrors('Empty response', rpcError.toString()).message});
    } else {
      return response.status(500).json({status: 500, message: `${rpcError}`});
    }

  }
}

export const getErrors = (key: string, rpcError: string): {key: string, message: string} => {
  const errors: {key: string, message: string} = {
    key: key, message: rpcError.toString().substring(0, rpcError.toString().indexOf('(') - 1),
  }
  return errors;
}
