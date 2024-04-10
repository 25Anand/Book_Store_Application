"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
const book_module_1 = require("./books/book.module");
const review_rate_module_1 = require("./review&rate/review&rate.module");
const purchase_module_1 = require("./purchases/purchase.module");
const configuration_1 = require("./config/configuration");
const db_module_1 = require("./provider/database/db.module");
const revenue_module_1 = require("./revenue/revenue.module");
dotenv.config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ load: [configuration_1.default], isGlobal: true }),
            users_module_1.UsersModule,
            db_module_1.DatabaseModule,
            book_module_1.BookModule,
            review_rate_module_1.ReviewModule,
            purchase_module_1.PurchaseModule,
            revenue_module_1.RevenueCalculationModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map