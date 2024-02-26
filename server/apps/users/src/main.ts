import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);

  app.enableCors();
  await app.listen(5000);
  console.log('Server is running on port 5000');
}
bootstrap();
