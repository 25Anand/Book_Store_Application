import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class ProducerService {
  async sendPurchaseNotification(purchaseData: any) {
    try {
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      const queue = 'books_purchase_notifications';
      const message = JSON.stringify(purchaseData);
      await channel.assertQueue(queue, { durable: false });
      await channel.sendToQueue(queue, Buffer.from(message));
      console.log(`Purchase notification sent: ${message}`);
      await channel.close();
      await connection.close();
    } catch (error) {
      console.error('Error sending purchase notification:', error);
    }
  }
}
