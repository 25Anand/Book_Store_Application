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

  @Post(":id/review")
  async addReview(
    @Body() reviewData: any,
    // @Param("id") bookId: string,
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
