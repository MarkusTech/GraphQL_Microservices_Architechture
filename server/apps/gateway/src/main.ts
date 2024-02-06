import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();

// https://www.youtube.com/watch?v=UxirFATvWTo&t=13s
// 43:00
