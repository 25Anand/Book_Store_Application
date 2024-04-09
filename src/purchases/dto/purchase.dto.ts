import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PurchaseBookDto {
    @IsNotEmpty()
    @IsString()
    bookId: string;
  
    @IsString()
    @IsNotEmpty()
    userId: string;
  
   @IsNumber()
   @IsNotEmpty()
    price: number;
  
    @IsDate()
    purchaseDate:Date
  }