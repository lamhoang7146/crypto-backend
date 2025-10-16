import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message:
            Object.values(error.constraints || {})[0] || 'Validation error',
        }));
        return new BadRequestException(result);
      },
    }),
  );
  const configService = app.get(ConfigService);
  const corsOptions: CorsOptions = {
    origin: [
      'https://studio.apollographql.com',
      configService.get<string>('FE_APP_URL') || 'http://localhost:5002',
    ],
    credentials: true,
  };

  app.enableCors(corsOptions);
  app.use(cookieParser());
  const port = configService.get<number>('APP_PORT');
  await app.listen(port || 6002);
}

bootstrap()
  .then(() => {})
  .catch(() => {});
