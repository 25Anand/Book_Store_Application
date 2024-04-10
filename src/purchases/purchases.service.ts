import { Injectable } from '@nestjs/common';
import { PurchaseHistory } from './schema/purchase.schema';
import { IBookDocument } from 'src/books/schema/books.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { StripeService } from 'src/utils/stripe/stripe.service';
import { ProducerService } from 'src/utils/rabbitMQ/producer/producer';

@Injectable()
export class PurchasesService {
  constructor(@InjectModel('Books') private readonly bookSchema: Model<IBookDocument>,
              @InjectModel('PurchaseHistory') private readonly purchaseHistorySchema: Model<PurchaseHistory>,
  private stripeService: StripeService,
  private producerService:ProducerService) {}

  async purchaseBook(userData,data:any):Promise<PurchaseHistory>{
      try {
         const book = await this.bookSchema.findOne({_id:data.bookId});
         
         if (!book) {
           throw new Error("Book not found.");
         }
         if (data.price !== book.price) {
           throw new Error("Purchasing price must be match with the book price.");
         }
         const paymentIntent = await this.stripeService.createPaymentIntent(data);
         const purchase = new this.purchaseHistorySchema({
           bookId: data.bookId,
           userId: data.userId,
           purchaseDate: data.purchaseDate,
           price: data.price,
           chargeId: paymentIntent.id,
         });
         const savedPurchase = await purchase.save();
         await this.bookSchema.updateOne(
           { _id: data.bookId },
           { $inc: { sellCount: 1 } }
         );
         await this.producerService.sendPurchaseNotification(savedPurchase);
         return savedPurchase;
       } catch (error) {
         console.error("Error in buyBook:", error);
         throw error;
       }
   }

   async viewHistory(data: any) {
    try{
      if (!data) {
        throw new Error("Token not provided");
      }
      const id = data.userId;
      if (!data.role || data.role !== "Retail User") {
        throw new Error("User does not have permission to view purchase history");
      }
      const history = await this.purchaseHistorySchema.findOne({ userId: id });
      return history;
    }
    catch(error)
    {
      console.log(error,"error=============")
    }
  }
}

