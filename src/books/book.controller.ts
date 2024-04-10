import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  Get,
  Req,
  UseGuards,
  Param,
} from "@nestjs/common";
import { CreateBookDto } from "./dto/books.dto";
import { AuthGuard } from "src/guard/auth.guard";
import { BooksService } from "./books.service";
import { RESPONSE_MSG } from "src/constant/constant";

@Controller("books")
export class BookController {
  constructor(private readonly booksService: BooksService) {}

  /* The code snippet you provided is defining a POST endpoint `/newBook` in the `BookController` class
  of a NestJS application. Here's a breakdown of what the code is doing: */
  @UseGuards(AuthGuard)
  @Post("newBook")
  async addNewBook(
    @Req() request,
    @Res() response,
    @Body() createBookDto: CreateBookDto
  ) {
    try {
      const userData = request.user;
      console.log(createBookDto);
      const book = await this.booksService.addBook(userData, createBookDto);

      return response.status(HttpStatus.CREATED).json({
        message: book,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * 
   * @param bookId 
   * @param response 
   * @returns 
   */
  @/* This code snippet defines a GET endpoint in the `BookController` class of a NestJS application.
  The endpoint is designed to retrieve a specific book by its `bookId`. Here's a breakdown of what
  the code is doing: */
  Get(":bookId")
  async findOneById(
    @Param("bookId") bookId: string,
    @Res() response
  ): Promise<any> {
    try {

      const Book = await this.booksService.findBook(bookId);
      if (!Book) {
        return response.status(HttpStatus.OK).json({
          message: RESPONSE_MSG.BOOK_NOT_FOUND,
        });
      }
      return response.status(HttpStatus.OK).json({
        message: Book,
      });
    } catch (error) {
      throw error;
    }
  }
}
