import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { BookSchema, IBookDocument } from 'src/books/schema/books.schema';
import { Dao } from 'src/provider/database/dao.provider';
@Injectable()
export class BookEntity extends Dao {
  constructor(private bookModel: Model<IBookDocument>) {
    super(BookSchema);
  }
  async findBookById(data:any){
    const result = await this.getDataById(data);
    return result;
  }
}