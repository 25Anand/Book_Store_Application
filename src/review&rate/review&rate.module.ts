import { Module } from '@nestjs/common';
import { RatingSchema } from './schema/review&rate.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RatingController } from './review&rate.controller';
import { RatingService } from './review&rate.service';

@Module({
    imports:[
      MongooseModule.forFeature([{ name: 'Rating', schema: RatingSchema },
    ])
  ],
    controllers: [RatingController],
    providers: [RatingService]
  })
export class ReviewModule {}
