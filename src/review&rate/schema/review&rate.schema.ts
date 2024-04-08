import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Rating extends Document {
  @Prop({ required: true })
  bookId: Types.ObjectId;

  @Prop({ required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  review: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
