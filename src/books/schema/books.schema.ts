import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Book extends Document {
  @Prop({ required: true ,unique: true })
  bookId: string;

  @Prop({ required: true,unique: true })
  title: string;

  @Prop({ type: [String], required: true })
  authors: string[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  sellCount: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
