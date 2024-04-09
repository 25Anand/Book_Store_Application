import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchaseBookController } from './purchases.controller';
import { HttpResponse } from 'src/common/httpResponse';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from 'src/books/book.module';
@Module({
  imports: [ConfigModule.forRoot(),BookModule],
  controllers: [PurchaseBookController],
  providers: [PurchasesService,HttpResponse]
})
export class PurchaseModule {}