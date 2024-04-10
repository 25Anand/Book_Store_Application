
import { Module } from '@nestjs/common';
import { CronService } from './cron';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from 'src/books/book.module'; // Import the BookModule here
import { UsersModule } from '../../users/users.module'; // Import the UserModule here
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BookModule,
    UsersModule,
  ],
    providers: [CronService],
})
export class CronModule {}
