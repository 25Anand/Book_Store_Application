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
exports.revenueController = void 0;
const purchase_schema_1 = require("../src/purchases/schema/purchase.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const books_schema_1 = require("../src/books/schema/books.schema");
let calculate_revenue = class calculate_revenue {
    constructor(bookSchema) {
        this.bookSchema = bookSchema;
    }
    async revenue(res) {
        const purchase_history = await purchase_schema_1.PurchaseHistoryModel.find();
        const groupedPurchaseHistory = new Map();
        for (const purchase of purchase_history) {
            const bookId = purchase.bookId.toString();
            if (!groupedPurchaseHistory.has(bookId)) {
                groupedPurchaseHistory.set(bookId, []);
            }
            groupedPurchaseHistory.get(bookId)?.push(purchase);
        }
        const revenueByUser = new Map();
        for (const [bookId, purchases] of groupedPurchaseHistory.entries()) {
            const book = await this.bookSchema.findById(bookId);
            if (book) {
                const authors = book.authors;
                const price = book.price;
                const totalRevenueForBook = price * purchases.length;
                for (const author of authors) {
                    if (!revenueByUser.has(author)) {
                        revenueByUser.set(author, 0);
                    }
                    revenueByUser.set(author, revenueByUser.get(author) + totalRevenueForBook);
                }
            }
        }
        for (const [author, revenue] of revenueByUser.entries()) {
            const authorDetails = await this.bookSchema.findOne({ userType: 'Author', username: author });
            if (authorDetails) {
                const authorEmail = authorDetails.email;
            }
        }
        return res.status(200).json(Array.from(revenueByUser.entries()));
    }
};
calculate_revenue = __decorate([
    __param(0, (0, mongoose_1.InjectModel)('Book')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], calculate_revenue);
exports.revenueController = new calculate_revenue(books_schema_1.Book);
//# sourceMappingURL=revenue.controller.js.map