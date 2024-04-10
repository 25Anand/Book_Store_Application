"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseModule = void 0;
const common_1 = require("@nestjs/common");
const purchases_service_1 = require("./purchases.service");
const purchases_controller_1 = require("./purchases.controller");
const httpResponse_1 = require("../common/httpResponse");
const config_1 = require("@nestjs/config");
const book_module_1 = require("../books/book.module");
const stripe_module_1 = require("../utils/stripe/stripe.module");
const rabbitMQ_module_1 = require("../utils/rabbitMQ/rabbitMQ.module");
const db_module_1 = require("../provider/database/db.module");
const mongoose_1 = require("@nestjs/mongoose");
const purchase_schema_1 = require("./schema/purchase.schema");
let PurchaseModule = class PurchaseModule {
};
exports.PurchaseModule = PurchaseModule;
exports.PurchaseModule = PurchaseModule = __decorate([
    (0, common_1.Module)({
        imports: [stripe_module_1.StripeModule, config_1.ConfigModule.forRoot(), book_module_1.BookModule, stripe_module_1.StripeModule, rabbitMQ_module_1.RabbitMQModule, db_module_1.DatabaseModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'PurchaseHistory', schema: purchase_schema_1.purchaseHistorySchema }]),
        ],
        controllers: [purchases_controller_1.PurchaseBookController],
        providers: [purchases_service_1.PurchasesService, httpResponse_1.HttpResponse]
    })
], PurchaseModule);
//# sourceMappingURL=purchase.module.js.map