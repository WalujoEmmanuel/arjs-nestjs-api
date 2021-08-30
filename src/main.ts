import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.close();
  await app.listen(8007);
  console.log('ARJS-NESTJS-API running on port 8007...');
}
bootstrap();
