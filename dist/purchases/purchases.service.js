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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchasesService = void 0;
const common_1 = require("@nestjs/common");
const book_entity_1 = require("../entity/book.entity");
const purchase_schema_1 = require("./schema/purchase.schema");
let PurchasesService = class PurchasesService {
    constructor(bookentity) {
        this.bookentity = bookentity;
    }
    async purchaseBook(data) {
        try {
            const book = await this.bookentity.findBookById(data.bookId);
            if (!book) {
                throw new Error("Book not found.");
            }
            if (data.price !== book.price) {
                throw new Error("Purchasing price must match the book price.");
            }
            const purchase = new purchase_schema_1.PurchaseHistoryModel({
                bookId: data.bookId,
                userId: data.userId,
                purchaseDate: data.purchaseDate,
                price: data.price,
            });
            const savedPurchase = await purchase.save();
            await this.bookentity.updateOne({ _id: data.bookId }, { $inc: { sellCount: 1 } });
            return savedPurchase;
        }
        catch (error) {
            console.error("Error in buyBook:", error);
            throw error;
        }
    }
    async viewHistory(token) {
        try {
            if (!token) {
                throw new Error("Token not provided");
            }
            const id = token.userId;
            if (!token.role || token.role !== "Retail User") {
                throw new Error("User does not have permission to view purchase history");
            }
            const history = await purchase_schema_1.PurchaseHistoryModel.find({ userId: id });
            return history;
        }
        catch (error) {
            console.log(error, "error=============");
        }
    }
};
exports.PurchasesService = PurchasesService;
exports.PurchasesService = PurchasesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [book_entity_1.BookEntity])
], PurchasesService);
//# sourceMappingURL=purchases.service.js.map