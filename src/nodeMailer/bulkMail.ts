// email.service.ts

import { Injectable } from '@nestjs/common';
import { MailService } from './nodeMailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailService: MailService) {}

  async sendBulkEmails(emails: string[], subject: string, content: string) {
    try {
      const maxEmailsPerMinute = 100;
      const chunkSize = Math.ceil(emails.length / maxEmailsPerMinute);

      for (let i = 0; i < chunkSize; i++) {
        const start = i * maxEmailsPerMinute;
        const end = (i + 1) * maxEmailsPerMinute;
        const chunkEmails = emails.slice(start, end);

        await Promise.all(chunkEmails.map(email => this.mailService.sendPurchaseEmail(email, content)));
      }

      console.log('Bulk emails sent successfully');
    } catch (error) {
      console.error('Error sending bulk emails:', error);
      throw error;
    }
  }
}
