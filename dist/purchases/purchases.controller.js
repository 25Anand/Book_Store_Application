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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseBookController = void 0;
const common_1 = require("@nestjs/common");
const purchase_dto_1 = require("./dto/purchase.dto");
const response_1 = require("../common/response");
const httpResponse_1 = require("../common/httpResponse");
const purchases_service_1 = require("./purchases.service");
const auth_guard_1 = require("../guard/auth.guard");
let PurchaseBookController = class PurchaseBookController {
    constructor(httpResponse, purchaseService) {
        this.httpResponse = httpResponse;
        this.purchaseService = purchaseService;
    }
    async purchase(request, purchaseBookDto, response) {
        try {
            const userData = request.user;
            const result = await this.purchaseService.purchaseBook(userData, purchaseBookDto);
            return this.httpResponse.sendResponse(response, response_1.RESPONSE_DATA.SUCCESS, result);
        }
        catch (error) {
            console.error("error in login ", error);
        }
    }
    async getHistoryOfBook(response, request) {
        const userData = request.user;
        const history = await this.purchaseService.viewHistory(userData);
        return this.httpResponse.sendResponse(response, response_1.RESPONSE_DATA.SUCCESS, history);
    }
};
exports.PurchaseBookController = PurchaseBookController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)('purchaseBook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, purchase_dto_1.PurchaseBookDto, Response]),
    __metadata("design:returntype", Promise)
], PurchaseBookController.prototype, "purchase", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('/history'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Response, Object]),
    __metadata("design:returntype", Promise)
], PurchaseBookController.prototype, "getHistoryOfBook", null);
exports.PurchaseBookController = PurchaseBookController = __decorate([
    (0, common_1.Controller)('purchase'),
    __metadata("design:paramtypes", [httpResponse_1.HttpResponse, purchases_service_1.PurchasesService])
], PurchaseBookController);
//# sourceMappingURL=purchases.controller.js.map