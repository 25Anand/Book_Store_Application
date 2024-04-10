import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { RatingService } from "./review&rate.service";

@Controller("books")
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  /**
   * 
   * @param reviewData 
   * @param response 
   * @returns 
    * @description This function will used to write the review about the bbok
  */
  @Post(":id/review")
  async addReview(
    @Body() reviewData: any,
    @Res() response
  ) {
    try {
      const { bookId,userId, rating, review } = reviewData;
      const newReview = await this.ratingService.addReview(
        bookId,
        userId,
        rating,
        review
      );
      return response.status(HttpStatus.CREATED).json({
        message: newReview,
      });
    } catch (error) {
      throw error;
      
    }
  }
}
