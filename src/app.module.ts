import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { RedisModule } from './providers/redis/redis.module';
import { BookModule } from './books/book.module';
import { ReviewModule } from './review&rate/review&rate.module';
import { PurchaseModule } from './purchases/purchase.module';

dotenv.config();

@Module({
  imports: [ 
    UsersModule,
    RedisModule,
    // ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
       useFactory:()=>({
         uri:process.env.DB_CONNECTION_URL 
       })
      }),
    BookModule,
    ReviewModule,
    PurchaseModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
