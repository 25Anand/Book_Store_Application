import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchaseBookController } from './purchases.controller';
import { HttpResponse } from 'src/common/httpResponse';
import { ConfigModule } from '@nestjs/config';
import { BookEntity } from 'src/entity/book.entity';
@Module({
  imports: [ConfigModule.forRoot(),BookEntity],
  controllers: [PurchaseBookController],
  providers: [PurchasesService,HttpResponse]
})
export class PurchaseModule {}