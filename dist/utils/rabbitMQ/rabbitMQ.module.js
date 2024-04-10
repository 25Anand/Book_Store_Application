"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQModule = void 0;
const common_1 = require("@nestjs/common");
const consumer_1 = require("./consumer/consumer");
const producer_1 = require("./producer/producer");
const nodeMailer_1 = require("../../nodeMailer/nodeMailer");
const users_module_1 = require("../../users/users.module");
const user_schema_1 = require("../../users/schema/user.schema");
const config_1 = require("@nestjs/config");
let RabbitMQModule = class RabbitMQModule {
};
exports.RabbitMQModule = RabbitMQModule;
exports.RabbitMQModule = RabbitMQModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            config_1.ConfigModule.forRoot(),
        ],
        providers: [consumer_1.ConsumerService, producer_1.ProducerService, nodeMailer_1.MailService, user_schema_1.UserModel],
        exports: [consumer_1.ConsumerService, producer_1.ProducerService]
    })
], RabbitMQModule);
//# sourceMappingURL=rabbitMQ.module.js.map