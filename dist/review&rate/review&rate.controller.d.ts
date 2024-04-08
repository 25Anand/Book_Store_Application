import { RatingService } from "./review&rate.service";
export declare class RatingController {
    private readonly ratingService;
    constructor(ratingService: RatingService);
    addReview(reviewData: any, response: any): Promise<any>;
}
