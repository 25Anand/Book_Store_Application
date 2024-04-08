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
exports.BooksService = void 0;
const constant_1 = require("../constant/constant");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const slugify_1 = require("slugify");
const mongoose_2 = require("@nestjs/mongoose");
let BooksService = class BooksService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async addBook(userData, createBookDto) {
        try {
            const bookTitle = (0, slugify_1.default)(createBookDto.title, { lower: true });
            const isBookExist = await this.bookModel.findOne({ title: bookTitle });
            if (isBookExist) {
                return constant_1.RESPONSE_MSG.BOOK_EXIST;
            }
            console.log(bookTitle);
            const bookData = { ...createBookDto, title: bookTitle };
            console.log(bookData);
            const newBook = new this.bookModel(bookData);
            const bookSaved = await newBook.save();
            console.log(bookSaved);
            return bookSaved;
        }
        catch (error) {
            throw error;
        }
    }
    async findBook(bookId) {
        try {
            const bookDetails = await this.bookModel.findOne({ bookId }).exec();
            return bookDetails;
        }
        catch (error) {
            throw new Error("Failed to find book");
        }
    }
};
exports.BooksService = BooksService;
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)("Book")),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BooksService);
//# sourceMappingURL=books.service.js.map