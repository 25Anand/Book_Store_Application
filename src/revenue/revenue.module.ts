import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { RevenueCalculationService } from '.';
import { purchaseHistorySchema } from '../purchases/schema/purchase.schema';
import { BookSchema } from 'src/books/schema/books.schema';
import { MailService } from 'src/nodeMailer/nodeMailer';
import { RevenueCalculationService } from './revenue.service';
import { CronService } from '../nodeCron/cron';
import { ScheduleModule } from '@nestjs/schedule';
import { BookModule } from 'src/books/book.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PurchaseHistory', schema: purchaseHistorySchema },
      { name: 'Book', schema: BookSchema },
    ]),
    BookModule, 
    UsersModule,

    ScheduleModule.forRoot(),
  ],
//   controllers:[RevenueCalculationService,],
  providers: [MailService,RevenueCalculationService],
})
export class RevenueCalculationModule {}
