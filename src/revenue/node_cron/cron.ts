// cron.service.ts

import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EmailService } from '../../nodeMailer/bulkMail';
import { InjectModel } from '@nestjs/mongoose';
import { IBookDocument } from 'src/books/schema/books.schema';
import { Model } from 'mongoose';
import { IUser } from 'src/users/schema/user.schema';

@Injectable()
export class CronService {
  private lastNotificationTime: Date | null = null;
  constructor(
  
    @InjectModel('Book') private readonly bookModel: Model<IBookDocument>,
    @InjectModel("User") private readonly userModel: Model<IUser>,
    
   
  ) {}
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      const currentTime = new Date();
      if (!this.lastNotificationTime || (currentTime.getTime() - this.lastNotificationTime.getTime() > 5 * 60 * 1000)) {
        const lastHour = new Date(currentTime.getTime() - 5 * 60 * 1000);
        const newBooks = await this.bookModel.find({ createdAt: { $gte: lastHour } });
        console.log(newBooks, "new books that have been released");
        if (newBooks.length > 0) {
          const retailUsers = await this.userModel.find({ userType: 'Retail User' });
          if (retailUsers.length > 0) {
            const emailContent = `New books have been released: ${newBooks.map(book => book.title).join(', ')}`;
            // await EmailService(retailUsers.map(user => user.email), 'New Book Releases', emailContent);
            this.lastNotificationTime = currentTime;
          }
        }
      }
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }
}
