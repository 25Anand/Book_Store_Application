import * as amqp from "amqplib";
import { config } from 'dotenv';
import * as nodemailer from "nodemailer";

import { UserModel } from "src/users/schema/user.schema";
const env = process.env.NODE_ENV || false;
config({ path: `bin/.env.${env}` });

export class ConsumerNotification{
  private transporter;
  constructor(){ this.transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.AUTH_EMAIL,
      pass: process.env.AUTH_PASSWORD,
    },
  });
}
  async consumePurchaseNotifications() {
    try {
        const connection = await amqp.connect('amqp://localhost');
        const channel = await connection.createChannel();
        const queue = 'books_purchase_notifications';
        await channel.assertQueue(queue, { durable: false });
  
        channel.consume(queue, async (message:any) => {
            const purchaseData = JSON.parse(message.content.toString());
            console.log(`Received purchase notification: ${JSON.stringify(purchaseData)}`);
  
            const userData = await UserModel.findById(purchaseData.userId);
            if (userData && userData.email) { 
                const email = userData.email;
                await this.sendPurchaseEmail(email, purchaseData);
            } else {
                console.error('User data not found or email not available.');
            }
  
        }, { noAck: true });
    } catch (error) {
        console.error('Error consuming purchase notifications:', error);
    }
  }
  
    async sendPurchaseEmail(email: string, purchaseData: any) {
      const data = {
        message:"ooh Congratulation you got a new book"
      };
      
      const mailOptions = {
        from: "bharatannd2000@gmail.com",
        to: email,
        subject: "Congratulations on Your New Book Purchase!",
        html: data.message,
      };
      await this.transporter.sendMail(mailOptions);
    }
  }

