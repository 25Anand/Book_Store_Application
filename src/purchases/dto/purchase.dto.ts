import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class PurchaseBookDto {
    @IsNotEmpty()
    @IsString()
    readonly bookId: Types.ObjectId;
  
    @IsString()
    @IsNotEmpty()
    readonly userId: Types.ObjectId;
  
   @IsNumber()
   @IsNotEmpty()
    price: number;
  
    @IsDate()
    purchaseDate:Date
  }