import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //app.enableCors({
    //origin: 'https://www.ifms.pro.br',
    //credentials: true
  //});

  app.enableCors({
    origin: true, 
    credentials: true
  });

  //app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use('/politicas', express.static(join(__dirname, '..', 'public')));

  await app.listen(3000, '0.0.0.0');
  console.log(`Server running on: ${await app.getUrl()}`);
}
bootstrap();