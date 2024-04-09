"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = void 0;
const http_status_enum_1 = require("@nestjs/common/enums/http-status.enum");
const response_1 = require("./response");
class HttpResponse {
    async sendResponse(res, b = { statusCode: http_status_enum_1.HttpStatus.BAD_REQUEST }, data = {}) {
        if (b.statusCode.toString().startsWith('2')) {
            b.data = data;
            res.status(b.statusCode).json(b);
        }
        else {
            res.status(b.statusCode).json({
                status: b.statusCode,
                success: false,
                error: data.message ? data.message : response_1.RESPONSE_MSG.ERROR,
                message: b.message ? b.message : response_1.RESPONSE_MSG.ERROR,
                path: res.req.originalUrl,
                timestamp: new Date().toISOString(),
            });
        }
        console.log('');
        console.log('*********************************RESPONSE SUCCESS START*************************************');
        console.log('path================>', res.req.originalUrl);
        console.log('type================>', res.req.method.toUpperCase());
        console.log('status==============>', b.statusCode);
        console.log('TIME================>', new Date());
        console.log('Response Time=======>', new Date().getTime() - res.req?.startTime?.getTime(), 'MS');
        console.log('********************************RESPONSE SUCCESS ENDS******************************************');
    }
}
exports.HttpResponse = HttpResponse;
//# sourceMappingURL=httpResponse.js.map