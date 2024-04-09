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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const books_dto_1 = require("./dto/books.dto");
const auth_guard_1 = require("../guard/auth.guard");
const books_service_1 = require("./books.service");
const constant_1 = require("../constant/constant");
let BookController = class BookController {
    constructor(booksService) {
        this.booksService = booksService;
    }
    async addNewBook(request, response, createBookDto) {
        try {
            const userData = request.user;
            console.log(createBookDto);
            const book = await this.booksService.addBook(userData, createBookDto);
            return response.status(common_1.HttpStatus.CREATED).json({
                message: book,
            });
        }
        catch (error) {
            throw error;
        }
    }
    async findOneById(bookId, response) {
        try {
            const Book = await this.booksService.findBook(bookId);
            if (!Book) {
                return response.status(common_1.HttpStatus.OK).json({
                    message: constant_1.RESPONSE_MSG.BOOK_NOT_FOUND,
                });
            }
            return response.status(common_1.HttpStatus.OK).json({
                message: Book,
            });
        }
        catch (error) {
            throw error;
        }
    }
};
exports.BookController = BookController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)("newBook"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, books_dto_1.CreateBookDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "addNewBook", null);
__decorate([
    (0, common_1.Get)(":bookId"),
    __param(0, (0, common_1.Param)("bookId")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "findOneById", null);
exports.BookController = BookController = __decorate([
    (0, common_1.Controller)("books"),
    __metadata("design:paramtypes", [books_service_1.BooksService])
], BookController);
//# sourceMappingURL=book.controller.js.map