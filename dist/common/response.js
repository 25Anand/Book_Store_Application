"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_DATA = exports.RESPONSE_MSG = void 0;
const common_1 = require("@nestjs/common");
exports.RESPONSE_MSG = {
    SUCCESS: 'Success.',
    ERROR: 'Something went wrong.',
};
exports.RESPONSE_DATA = {
    SUCCESS: {
        statusCode: common_1.HttpStatus.OK,
        message: exports.RESPONSE_MSG.SUCCESS,
    },
    ERROR: {
        statusCode: common_1.HttpStatus.BAD_REQUEST,
        message: exports.RESPONSE_MSG.ERROR,
    },
};
//# sourceMappingURL=response.js.map