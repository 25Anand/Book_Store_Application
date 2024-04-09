import { Injectable } from '@nestjs/common';
import { PurchaseHistory, PurchaseHistoryModel } from './schema/purchase.schema';
import { IBookDocument } from 'src/books/schema/books.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PurchasesService {
  constructor(@InjectModel('Book') private readonly bookSchema: Model<IBookDocument>) {}
  async purchaseBook(data:any):Promise<PurchaseHistory>{
      try {
         const book = await this.bookSchema.findOne(data.bookId);
         if (!book) {
           throw new Error("Book not found.");
         }
         if (data.price !== book.price) {
           throw new Error("Purchasing price must match the book price.");
         }
         // const paymentIntent = await createPaymentIntent(data);
         const purchase = new PurchaseHistoryModel({
           bookId: data.bookId,
           userId: data.userId,
           purchaseDate: data.purchaseDate,
           price: data.price,
         //   chargeId: paymentIntent.id,
         });
         const savedPurchase = await purchase.save();
         await this.bookSchema.updateOne(
           { _id: data.bookId },
           { $inc: { sellCount: 1 } }
         );
         // await sendPurchaseNotification(savedPurchase);
         return savedPurchase;
       } catch (error) {
         console.error("Error in buyBook:", error);
         throw error;
       }
   }

   async viewHistory(token: any) {
    try{
      if (!token) {
        throw new Error("Token not provided");
      }
      const id = token.userId;
      if (!token.role || token.role !== "Retail User") {
        throw new Error("User does not have permission to view purchase history");
      }
      const history = await PurchaseHistoryModel.find({ userId: id });
      return history;
    }
    catch(error)
    {
      console.log(error,"error=============")
    }
  }
}

