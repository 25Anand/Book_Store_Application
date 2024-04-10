import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// import { RevenueCalculationService } from '.';
import { purchaseHistorySchema } from 'src/purchases/schema/purchase.schema';
import { BookSchema } from 'src/books/schema/books.schema';
import { MailService } from 'src/nodeMailer/nodeMailer';
import { RevenueCalculationService } from './revenue.controller';
import { CronService } from './node_cron/cron';
import { ScheduleModule } from '@nestjs/schedule';
import { BookModule } from 'src/books/book.module';
import { UsersModule } from 'src/users/users.module';
import { CronModule } from './node_cron/cron.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PurchaseHistory', schema: purchaseHistorySchema },
      { name: 'Book', schema: BookSchema },
    ]),
    BookModule, 
    UsersModule,
    ScheduleModule.forRoot(),
    CronModule
  ],
  controllers:[RevenueCalculationService],
  providers: [MailService,CronService],
})
export class RevenueCalculationModule {}
