import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Book } from '../books/schema/books.schema';
import { UserModel } from '../users/schema/user.schema';
import { EmailService } from '../nodeMailer/bulkMail';

@Injectable()
export class CronService {
  private lastNotificationTime: Date | null = null;
  constructor(private readonly emailService: EmailService) {}
  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    try {
      const currentTime = new Date();
      if (!this.lastNotificationTime || (currentTime.getTime() - this.lastNotificationTime.getTime() > 5 * 60 * 1000)) {
        const lastHour = new Date(currentTime.getTime() - 5 * 60 * 1000);
        const newBooks = await Book.find({ createdAt: { $gte: lastHour } });
        console.log(newBooks, "new books that have been released");
        if (newBooks.length > 0) {
          const retailUsers = await UserModel.find({ userType: 'Retail User' });
          if (retailUsers.length > 0) {
            const emailContent = `New books have been released: ${newBooks.map(book => book.title).join(', ')}`;
            await this.emailService.sendBulkEmails(retailUsers.map(user => user.email), 'New Book Releases', emailContent);
            this.lastNotificationTime = currentTime;
          }
        }
      }
    } catch (error) {
      console.error('Error in cron job:', error);
    }
  }
}
