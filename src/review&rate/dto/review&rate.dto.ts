import { IsString, IsNumber, Min, Max, IsNotEmpty, IsDate } from 'class-validator';
import { Types } from 'mongoose';

export class CreateRatingDto {
    @IsString()
    @IsNotEmpty()
    readonly bookId: Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    readonly userId: Types.ObjectId;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @Max(5)
    readonly rating: number;

    @IsString()
    @IsNotEmpty()
    readonly review: string;

    @IsNotEmpty()
    @IsDate()
    createdAt: Date;
}
