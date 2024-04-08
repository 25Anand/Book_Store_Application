import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IRating } from "./interface/review&rate.interface";

@Injectable()
export class RatingService {
    constructor(
        @InjectModel("Rating")
        private readonly reviewModel: Model<IRating>
      ) {}

  async addReview(
    bookId: string,
    userId: string,
    rating: number,
    review: string
  ): Promise<any> {
    try {
        const reviewData={bookId,userId,rating,review}
      const ReviewBook = new this.reviewModel(reviewData)
      const reviewSaved= await ReviewBook.save();
      return reviewSaved; 
    } catch(error) {
        throw error
    }
  }
}
