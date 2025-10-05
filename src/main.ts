import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const configService = app.get(ConfigService);
  const port = configService.get<number>('APP_PORT');
  await app.listen(port || 6002);
}

bootstrap()
  .then(() => {})
  .catch(() => {});
