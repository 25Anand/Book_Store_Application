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
exports.AllExceptionsFilter = exports.getErrorMessage = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const getErrorMessage = (exception) => {
    return exception instanceof common_1.HttpException ? exception.message : String(exception);
};
exports.getErrorMessage = getErrorMessage;
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor(httpAdapterHost, logger) {
        this.httpAdapterHost = httpAdapterHost;
        this.logger = logger;
    }
    catch(exception, host) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();
        const httpStatus = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = exception['response']?.message ? exception['response']['message'] : (0, exports.getErrorMessage)(exception);
        message = typeof message == 'string' ? [message] : message;
        const responseBody = {
            status: httpStatus,
            success: false,
            error: message,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            timestamp: new Date().toISOString(),
        };
        this.logger.error(responseBody.path, message);
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
};
exports.AllExceptionsFilter = AllExceptionsFilter;
exports.AllExceptionsFilter = AllExceptionsFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost, common_1.Logger])
], AllExceptionsFilter);
//# sourceMappingURL=exceptionFilter.js.map