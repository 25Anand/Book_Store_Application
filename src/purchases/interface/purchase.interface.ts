import { Types } from "mongoose";

export interface IPurchaseData {
    bookId: Types.ObjectId;
    userId: Types.ObjectId;
    purchaseDate: Date;
    price: number;
}