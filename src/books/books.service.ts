import { RESPONSE_MSG } from "src/constant/constant";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookDto } from "./dto/books.dto";
import { IBook } from "./interface/books.interface";
import { Model } from "mongoose";
import slugify from "slugify";
import { InjectModel } from "@nestjs/mongoose";
import { IBookDocument } from "./schema/books.schema";

@Injectable()
export class BooksService {
  constructor(
    @InjectModel("Books")
    private readonly bookModel: Model<IBookDocument>
  ) {}
  async addBook(userData, createBookDto: CreateBookDto): Promise<any> {
    try {
      const bookTitle = slugify(createBookDto.title, { lower: true });
      const isBookExist = await this.bookModel.findOne({ title: bookTitle });
      if (isBookExist) {
        return RESPONSE_MSG.BOOK_EXIST;
      }
      console.log(bookTitle);
      const bookData = { ...createBookDto, title: bookTitle };

      const newBook = new this.bookModel(bookData);
      const bookSaved = await newBook.save();
      console.log(bookSaved);
      
      return bookSaved;
    } catch (error) {
      throw error;
    }
  }

  async findBook(bookId: any): Promise<any> {
    try {
      const bookDetails = await this.bookModel.findOne({ bookId }).exec();
      return bookDetails;
    } catch (error) {
      throw new Error("Failed to find book");
    }
  }
}
