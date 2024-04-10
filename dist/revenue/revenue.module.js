"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevenueCalculationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const purchase_schema_1 = require("../purchases/schema/purchase.schema");
const books_schema_1 = require("../books/schema/books.schema");
const nodeMailer_1 = require("../nodeMailer/nodeMailer");
const revenue_controller_1 = require("./revenue.controller");
const cron_1 = require("./node_cron/cron");
const schedule_1 = require("@nestjs/schedule");
const book_module_1 = require("../books/book.module");
const users_module_1 = require("../users/users.module");
const cron_module_1 = require("./node_cron/cron.module");
let RevenueCalculationModule = class RevenueCalculationModule {
};
exports.RevenueCalculationModule = RevenueCalculationModule;
exports.RevenueCalculationModule = RevenueCalculationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'PurchaseHistory', schema: purchase_schema_1.purchaseHistorySchema },
                { name: 'Book', schema: books_schema_1.BookSchema },
            ]),
            book_module_1.BookModule,
            users_module_1.UsersModule,
            schedule_1.ScheduleModule.forRoot(),
            cron_module_1.CronModule
        ],
        controllers: [revenue_controller_1.RevenueCalculationService],
        providers: [nodeMailer_1.MailService, cron_1.CronService],
    })
], RevenueCalculationModule);
//# sourceMappingURL=revenue.module.js.map