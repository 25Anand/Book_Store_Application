import { Document, Schema, model, Types } from 'mongoose';
export interface PurchaseHistory extends Document {
  purchaseId: string;
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
  purchaseDate: Date;
  price: number;
  cardType: string;
  chargeId: string;
}

export const purchaseHistorySchema = new Schema<PurchaseHistory>({
  purchaseId: { type: String, unique: true, required: false },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'books', 
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users', 
    required: true,
  },
  purchaseDate: { type: Date, required: true },
  price: { type: Number, required: true },
  cardType: { type: String, required: false },
  chargeId: { type: String, required: false } 
});


purchaseHistorySchema.pre<PurchaseHistory>('save', async function (next) {
    try {
      if (!this.isNew) {
        return next(); 
      }
      const currentDate = new Date();
      const year = currentDate.getFullYear().toString().substr(-2);
      const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
      
      const latestPurchase = await PurchaseHistoryModel.findOne({ 
        purchaseId: new RegExp(`^${year}-${month}-\\d+$`) 
      }, { purchaseId: 1 }).sort({ purchaseId: -1 });
  
      let numericPart = '001'; 
      if (latestPurchase) {
        const lastNumericPart = parseInt(latestPurchase.purchaseId.split('-')[2]);
        numericPart = (lastNumericPart + 1).toString().padStart(3, '0');
      }
  
      this.purchaseId = `${year}-${month}-${numericPart}`;
      next();
    } catch (error) {
      throw error;
    }
  });

export const PurchaseHistoryModel = model<PurchaseHistory>('PurchaseHistory', purchaseHistorySchema);