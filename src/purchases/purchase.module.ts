import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchaseBookController } from './purchases.controller';
import { HttpResponse } from 'src/common/httpResponse';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PurchaseBookController],
  providers: [PurchasesService,HttpResponse]
})
export class PurchaseModule {}