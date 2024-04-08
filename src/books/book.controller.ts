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

  @Get(":bookId")
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
