import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RevenueCalculationService } from 'src/revenue/revenue.service';

@Injectable()
export class RevenueService {
    constructor(private readonly revenueCalculationService: RevenueCalculationService) {}

  @Cron('59 23 L * *', { timeZone: 'Asia/Kolkata' })
  async calculateRevenueAndSendEmails() {
    try {
      console.log('Running revenue calculation and sending emails...');
      await this.revenueCalculationService.calculateRevenue();
      console.log('Revenue calculation and email sending complete.');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
