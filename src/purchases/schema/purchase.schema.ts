import { Document, Schema, model, Types } from 'mongoose';
interface purchase extends Document {
  uniqueId: string;
  purchaseId: string;
  bookId: Types.ObjectId;
  userId: Types.ObjectId;
  purchaseDate: Date;
  price: number;
  quantity: number;
}

const purchaseHistorySchema = new Schema<purchase>({
  uniqueId: { type: String, unique: true, required: false},
  purchaseId: { type: String, unique: true, required: false },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: 'Book', 
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  purchaseDate: { type: Date, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true}
});


export const PurchaseHistoryModel = model<purchase>('PurchaseHistory', purchaseHistorySchema);