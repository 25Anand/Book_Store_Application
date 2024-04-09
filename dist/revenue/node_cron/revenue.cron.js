"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_cron_1 = require("node-cron");
const revenue_controller_1 = require("../revenue.controller");
node_cron_1.default.schedule('59 23 L * *', async () => {
    try {
        console.log('Running revenue calculation and sending emails...');
        await revenue_controller_1.revenueController.revenue(express_1.response);
        console.log('Revenue calculation and email sending complete.');
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}, {
    scheduled: true,
    timezone: 'Asia/Kolkata'
});
//# sourceMappingURL=revenue.cron.js.map