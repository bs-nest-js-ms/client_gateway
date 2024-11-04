import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { RpcCustomExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const logger =  new Logger("Client Gateway of all Microservices");
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Con esto tipamos loes errores que vengan del microservicio dandole un statuscode y un mensaje
  app.useGlobalFilters(new RpcCustomExceptionFilter);
  
  await app.listen(envs.port);
  logger.log(`====> Client Gateway started on port: ${envs.port} <====`);
}
bootstrap();
