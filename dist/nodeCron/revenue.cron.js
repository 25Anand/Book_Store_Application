"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const revenue_service_1 = require("../revenue/revenue.service");
let RevenueService = class RevenueService {
    constructor(revenueCalculationService) {
        this.revenueCalculationService = revenueCalculationService;
    }
    async calculateRevenueAndSendEmails() {
        try {
            console.log('Running revenue calculation and sending emails...');
            await this.revenueCalculationService.calculateRevenue();
            console.log('Revenue calculation and email sending complete.');
        }
        catch (error) {
            console.error('An error occurred:', error);
        }
    }
};
exports.RevenueService = RevenueService;
__decorate([
    (0, schedule_1.Cron)('59 23 L * *', { timeZone: 'Asia/Kolkata' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RevenueService.prototype, "calculateRevenueAndSendEmails", null);
exports.RevenueService = RevenueService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [revenue_service_1.RevenueCalculationService])
], RevenueService);
//# sourceMappingURL=revenue.cron.js.map