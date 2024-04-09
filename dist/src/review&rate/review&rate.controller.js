"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingController = void 0;
const common_1 = require("@nestjs/common");
const review_rate_service_1 = require("./review&rate.service");
let RatingController = class RatingController {
    constructor(ratingService) {
        this.ratingService = ratingService;
    }
    async addReview(reviewData, response) {
        try {
            const { bookId, userId, rating, review } = reviewData;
            const newReview = await this.ratingService.addReview(bookId, userId, rating, review);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: newReview,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.RatingController = RatingController;
__decorate([
    (0, common_1.Post)(":id/review"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RatingController.prototype, "addReview", null);
exports.RatingController = RatingController = __decorate([
    (0, common_1.Controller)("books"),
    __metadata("design:paramtypes", [review_rate_service_1.RatingService])
], RatingController);
//# sourceMappingURL=review&rate.controller.js.map