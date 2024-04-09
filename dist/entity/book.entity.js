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
exports.BookEntity = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const books_schema_1 = require("../books/schema/books.schema");
const dao_provider_1 = require("../provider/database/dao.provider");
let BookEntity = class BookEntity extends dao_provider_1.Dao {
    constructor(bookModel) {
        super(books_schema_1.BookSchema);
        this.bookModel = bookModel;
    }
    async findBookById(data) {
        const result = await this.getDataById(data);
        return result;
    }
};
exports.BookEntity = BookEntity;
exports.BookEntity = BookEntity = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BookEntity);
//# sourceMappingURL=book.entity.js.map