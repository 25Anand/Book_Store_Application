// book.dto.ts

import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly bookId: string;

  @IsArray()
  readonly authors: string[];

  @IsNumber()
  readonly sellCount: number;

  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;

  @IsNumber()
  readonly price: number;
}
