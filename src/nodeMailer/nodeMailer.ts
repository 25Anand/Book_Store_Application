import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get<string>("EMAIL_USER"),
        pass: this.configService.get<string>("EMAIL_PASSWORD"),
      },
    });
  }

  async newBookPublished(email: string, bookTitle: string) {
    const mailOptions = {
      from: "bharatanand722@gmail.com",
      to: email,
      subject: "New Book Release Notification",
      html: { path: "../templates/newBookPublished.html" },
    };
    await this.transporter.sendMail(mailOptions);
  }
  
  async sendPurchaseEmail(email: string, purchaseData: any) {
    const mailOptions = {
      from: "bharatanand722@gmail.com",
      to: email,
      subject: "Congratulations on Your New Book Purchase!",
      html: { path: "../templates/bookPurchase.html" },
    };
    await this.transporter.sendMail(mailOptions);
  }

  async sendmailtoauthor(authoremail: string, author: string, revenue: any) {
    const mailOptions = {
      from: "bharatanand722@gmail.com",
      to: authoremail,
      subject: "Updated Revenue Information",
      html: { path: "../templates/revenue.html" },
    };
    await this.transporter.sendMail(mailOptions);
  }
}
