import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as amqp from "amqplib";
import { Model } from "mongoose";
import { MailService } from "src/nodeMailer/nodeMailer";
import { IUser } from "src/users/interface/user.interface";

@Injectable()
export class ConsumerService {
  constructor(
    
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly mailService: MailService,
  ) {}

  async consumePurchaseNotifications() {
    try {
      const connection = await amqp.connect("amqp://localhost");
      const channel = await connection.createChannel();
      const queue = "books_purchase_notifications";
      await channel.assertQueue(queue, { durable: false });

      channel.consume(
        queue,
        async (message: any) => {
          const purchaseData = JSON.parse(message.content.toString());
          console.log(
            `Received purchase notification: ${JSON.stringify(purchaseData)}`
          );

          const userData = await this.userModel.findById({
            _id: purchaseData.userId,
          });
          if (userData && userData.email) {
            const email = userData.email;
            this.sendPurchaseEmail(email, purchaseData);
          } else {
            console.error("User data not found or email not available.");
          }
        },
        { noAck: true }
      );
    } catch (error) {
      console.error("Error consuming purchase notifications:", error);
    }
  }

  private async sendPurchaseEmail(email: string, purchaseData: any) {
    this.mailService.sendPurchaseEmail(email, purchaseData);
  }
}
