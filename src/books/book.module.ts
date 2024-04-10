import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookModel, BookSchema } from './schema/books.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Books', schema: BookSchema },
  ])
],
  controllers: [BookController],
  providers: [BooksService,BookModel],
  exports: [MongooseModule]
})
export class BookModule {}
