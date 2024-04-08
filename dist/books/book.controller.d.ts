import { CreateBookDto } from "./dto/books.dto";
import { BooksService } from "./books.service";
export declare class BookController {
    private readonly booksService;
    constructor(booksService: BooksService);
    addNewBook(request: any, response: any, createBookDto: CreateBookDto): Promise<any>;
    findOneById(bookId: string, response: any): Promise<any>;
}
