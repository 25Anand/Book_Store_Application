import mongoose, { Document } from "mongoose";
import { ENUM } from "src/common/enum";

export interface IBookDocument extends Document {
  bookId: string;
  email: string;
  authors: string[];
  sellCount: number;
  title: string;
  description: string;
  price: number;
}

export const BookSchema = new mongoose.Schema<IBookDocument>(
  {
    bookId: { type: String, required: true },
    email: { type: String, required: false },
    authors: [{ type: String, required: true }],
    sellCount: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.BOOK,
  }
);

export const Book = mongoose.model<IBookDocument>("Book", BookSchema);