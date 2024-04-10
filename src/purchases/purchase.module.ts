import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchaseBookController } from './purchases.controller';
import { HttpResponse } from 'src/common/httpResponse';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from 'src/books/book.module';
import { StripeModule } from 'src/utils/stripe/stripe.module';
import { RabbitMQModule } from 'src/utils/rabbitMQ/rabbitMQ.module';
import { DatabaseModule } from 'src/provider/database/db.module';
import { MongooseModule } from '@nestjs/mongoose';
import { purchaseHistorySchema } from './schema/purchase.schema';

@Module({
  imports: [StripeModule,ConfigModule.forRoot(),BookModule,StripeModule,RabbitMQModule,DatabaseModule,
    MongooseModule.forFeature([{ name: 'PurchaseHistory', schema: purchaseHistorySchema}]),
  ],
  controllers: [PurchaseBookController],
  providers: [PurchasesService,HttpResponse]
})
export class PurchaseModule {}