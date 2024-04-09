"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESPONSE_MSG = exports.LOGIN_MSG = exports.HttpStatusCodes = exports.STATUS_MSG = exports.mongo_url = void 0;
exports.mongo_url = process.env.DB_CONNECTION_URL;
exports.STATUS_MSG = {
    ERROR: {
        BAD_REQUEST(message) {
            return {
                statusCode: 400,
                success: false,
                message,
                type: 'BAD_REQUEST',
            };
        },
        ERROR_OCCURED: {
            statusCode: 400,
            success: false,
            message: 'error occured',
        },
        UNAUTHORIZED: {
            statusCode: 401,
            success: false,
            message: 'You are not authorized to perform this action',
            type: 'UNAUTHORIZED',
        },
    },
    SUCCESS: {
        statusCode: 200,
        success: true,
        message: 'Success',
    },
    SUCCESS_WITH_MESSAGE(message) {
        return {
            statusCode: 200,
            success: true,
            message,
            type: 'Success',
        };
    },
    CREATED: (message) => {
        return {
            statusCode: 201,
            success: true,
            message: 'Created Successfully',
            data: message,
            type: 'CREATED',
        };
    },
};
exports.HttpStatusCodes = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
};
exports.LOGIN_MSG = {
    NOT_EXIST: 'USER NOT FOUND ,PLEASE SIGNUP',
    NOT_MATCH: 'WRONG PASSWORD',
    NOT_VERIFY: 'EMAIL ID IS NOT VERIFIED!, PLS VERIFY YOUR EMAILID ,OTP IS ALREADY SEND TO YOUR MAILID',
    UNAUTHORIZED: 'YOU ARE NOT AUTHORIZED TO DO THIS TASK',
    ALREADY_SESSION: 'YOU ARE ALREADY LOGIN',
    LOGIN_SUCCESS: 'USER SUCCESSFULLY LOGIN',
    LOGIN_FAILED: 'LOGIN FAILED! TRY AGAIN'
};
exports.RESPONSE_MSG = {
    USER_ALREADY_EXIST: 'USER ALREADY EXISTS',
    USER_CREATED: 'USER CREATED SUCCESSFULLY',
    USER_NOT_CREATED: 'USER NOT CREATED',
    MAILED: 'PLEASE VERIFY YOUR EMAIL BEFORE LOGIN',
    OTP_FAILED: 'USER OTP VERIFICATION FAILED',
    OTP_SUCCESS: 'OTP VERIFICATION SUCCESSFULLY',
    OTP_ERROR: 'OTP VERIFICATION FAILED!',
    LOGOUT_SUCCESS: 'LOGOUT SUCCESSFLLY',
    LOGOUT_FAILED: 'LOGOUT FAILED!',
    TOKEN_SUCCESS: 'TOKEN GENERATE SUCCESSFULLY',
    TOKEN_FAILED: 'FAILED TO GENERATE NEW TOKEN',
    ERROR_EMAIL_RETRIVE: 'RETRIVING EMAIL_ADDRESS FAILED',
    USER_DETAIL: 'USER DATA FATCH SUCCESSFULLY',
    BOOK_CREATED: 'NEW BOOK ADD SUCCESSFULLY',
    BOOK_NOT_PERMISSION: 'YOU HAVE NOT PERMISSION TO ADD NEW BOOK',
    BOOK_EXIST: 'BOOK ALREADY EXIST WITH THIS TITLE',
    BOOK_NOT_FOUND: 'WITH THE BOOK ID IS NOT FOUND!'
};
//# sourceMappingURL=constant.js.map