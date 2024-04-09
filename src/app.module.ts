import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { BookModule } from './books/book.module';
import { ReviewModule } from './review&rate/review&rate.module';
import { PurchaseModule } from './purchases/purchase.module';
import configuration from './config/configuration';
import { AllExceptionsFilter } from './filters/exceptionFilter';
import { APP_FILTER } from '@nestjs/core/constants';
import { DatabaseModule } from './provider/database/db.module';

dotenv.config();

@Module({
  imports: [ 
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    UsersModule,
    DatabaseModule,
    BookModule,
    ReviewModule,
    PurchaseModule,
    ],
})
export class AppModule {}
