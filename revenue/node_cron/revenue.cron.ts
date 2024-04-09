import { Res } from '@nestjs/common';
import { response } from 'express';
import cron from 'node-cron';
import { revenueController } from 'revenue/revenue.controller';
cron.schedule('59 23 L * *', async () => {
    try {
        console.log('Running revenue calculation and sending emails...');
       await revenueController.revenue(response)
        console.log('Revenue calculation and email sending complete.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}, {
    scheduled: true,
    timezone: 'Asia/Kolkata'

});