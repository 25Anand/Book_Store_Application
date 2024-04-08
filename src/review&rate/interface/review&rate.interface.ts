import { Types } from "mongoose";

export interface IRating {
    bookId: Types.ObjectId;
    userId: Types.ObjectId;
    rating: number;
    review: string;
    createdAt: Date;
}
