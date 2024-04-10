import { ValidationPipe } from '@nestjs/common';
import {  NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middleware/logging.middleware';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { CONSTANT } from './common/constant';
import { consumePurchaseNotifications } from './utils/rabbitMQ/consumer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.use(
    express.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    })
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));
  app.enableCors();
  app.setGlobalPrefix(CONSTANT.API_ROOT_PATH);
  app.use(bodyParser.json());
  app.use(new LoggerMiddleware().use);
  const configService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT')
  console.log('Port number is: ', port);
  consumePurchaseNotifications();
  await app.listen(port);
}
bootstrap();
