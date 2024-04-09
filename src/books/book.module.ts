import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BooksService } from './books.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BookSchema } from './schema/books.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'Book', schema: BookSchema },
  ])
],
  controllers: [BookController],
  providers: [BooksService],
  exports: [MongooseModule]
})
export class BookModule {}
