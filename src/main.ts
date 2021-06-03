import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config/dotenv';
import { ErrorFilter } from './fillters/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true, cors: true });
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ErrorFilter());
  await app.listen(PORT);
}
bootstrap();
