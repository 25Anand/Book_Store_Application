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
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const books_schema_1 = require("../books/schema/books.schema");
const user_schema_1 = require("../users/schema/user.schema");
const bulkMail_1 = require("../nodeMailer/bulkMail");
let CronService = class CronService {
    constructor(emailService) {
        this.emailService = emailService;
        this.lastNotificationTime = null;
    }
    async handleCron() {
        try {
            const currentTime = new Date();
            if (!this.lastNotificationTime || (currentTime.getTime() - this.lastNotificationTime.getTime() > 5 * 60 * 1000)) {
                const lastHour = new Date(currentTime.getTime() - 5 * 60 * 1000);
                const newBooks = await books_schema_1.Book.find({ createdAt: { $gte: lastHour } });
                console.log(newBooks, "new books that have been released");
                if (newBooks.length > 0) {
                    const retailUsers = await user_schema_1.UserModel.find({ userType: 'Retail User' });
                    if (retailUsers.length > 0) {
                        const emailContent = `New books have been released: ${newBooks.map(book => book.title).join(', ')}`;
                        await this.emailService.sendBulkEmails(retailUsers.map(user => user.email), 'New Book Releases', emailContent);
                        this.lastNotificationTime = currentTime;
                    }
                }
            }
        }
        catch (error) {
            console.error('Error in cron job:', error);
        }
    }
};
exports.CronService = CronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "handleCron", null);
exports.CronService = CronService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bulkMail_1.EmailService])
], CronService);
//# sourceMappingURL=cron.js.map