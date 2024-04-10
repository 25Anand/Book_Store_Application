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
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
const config_1 = require("@nestjs/config");
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: this.configService.get("EMAIL_USER"),
                pass: this.configService.get("EMAIL_PASSWORD"),
            },
        });
    }
    async newBookPublished(email, bookTitle) {
        const mailOptions = {
            from: "bharatanand722@gmail.com",
            to: email,
            subject: "New Book Release Notification",
            html: { path: "../templates/newBookPublished.html" },
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendPurchaseEmail(email, purchaseData) {
        const mailOptions = {
            from: "bharatanand722@gmail.com",
            to: email,
            subject: "Congratulations on Your New Book Purchase!",
            html: { path: "../templates/bookPurchase.html" },
        };
        await this.transporter.sendMail(mailOptions);
    }
    async sendmailtoauthor(authoremail, author, revenue) {
        const mailOptions = {
            from: "bharatanand722@gmail.com",
            to: authoremail,
            subject: "Updated Revenue Information",
            html: { path: "../templates/revenue.html" },
        };
        await this.transporter.sendMail(mailOptions);
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=nodeMailer.js.map