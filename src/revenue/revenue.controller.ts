import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PurchaseHistory,  } from 'src/purchases/schema/purchase.schema';
import { IBookDocument } from 'src/books/schema/books.schema';
import { MailService } from 'src/nodeMailer/nodeMailer';
import { Response } from 'express';

@Injectable()
export class RevenueCalculationService {
  static calculateRevenue(response: Response<any, Record<string, any>>) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel('PurchaseHistory') private readonly purchaseHistoryModel: Model<PurchaseHistory>,
    @InjectModel('Book')       private readonly bookModel: Model<IBookDocument>,
    private readonly mailService: MailService,
  ) {}

  async calculateRevenue(): Promise<Map<string, number>> {
    const purchaseHistory = await this.purchaseHistoryModel.find();
    const groupedPurchaseHistory: Map<string, any[]> = new Map();

    for (const purchase of purchaseHistory) {
      const bookId = purchase.bookId.toString();
      if (!groupedPurchaseHistory.has(bookId)) {
        groupedPurchaseHistory.set(bookId, []);
      }
      groupedPurchaseHistory.get(bookId)?.push(purchase);
    }

    const revenueByAuthor: Map<string, number> = new Map();

    for (const [bookId, purchases] of groupedPurchaseHistory.entries()) {
      const book = await this.bookModel.findById(bookId);
      if (book) {
        const authors = book.authors;
        const price = book.price;
        const totalRevenueForBook = price * purchases.length;

        for (const author of authors) {
          if (!revenueByAuthor.has(author)) {
            revenueByAuthor.set(author, 0);
          }
          revenueByAuthor.set(author, revenueByAuthor.get(author)! + totalRevenueForBook);
        }
      }
    }

    for (const [author, revenue] of revenueByAuthor.entries()) {
      const authorDetails = await this.bookModel.findOne({ userType: 'Author', username: author });
      if (authorDetails) {
        const authorEmail = authorDetails.email;
        this.mailService.sendmailtoauthor(authorEmail, author, revenue);
      }
    }

    return revenueByAuthor;
  }
}
