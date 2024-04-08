export declare const mongo_url: string;
export declare const STATUS_MSG: {
    ERROR: {
        BAD_REQUEST(message: string): {
            statusCode: number;
            success: boolean;
            message: string;
            type: string;
        };
        ERROR_OCCURED: {
            statusCode: number;
            success: boolean;
            message: string;
        };
        UNAUTHORIZED: {
            statusCode: number;
            success: boolean;
            message: string;
            type: string;
        };
    };
    SUCCESS: {
        statusCode: number;
        success: boolean;
        message: string;
    };
    SUCCESS_WITH_MESSAGE(message: string): {
        statusCode: number;
        success: boolean;
        message: string;
        type: string;
    };
    CREATED: (message: any) => {
        statusCode: number;
        success: boolean;
        message: string;
        data: any;
        type: string;
    };
};
export declare const HttpStatusCodes: {
    OK: number;
    CREATED: number;
    ACCEPTED: number;
    NO_CONTENT: number;
    MOVED_PERMANENTLY: number;
    FOUND: number;
    SEE_OTHER: number;
    NOT_MODIFIED: number;
    TEMPORARY_REDIRECT: number;
    PERMANENT_REDIRECT: number;
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    METHOD_NOT_ALLOWED: number;
    CONFLICT: number;
    UNPROCESSABLE_ENTITY: number;
    INTERNAL_SERVER_ERROR: number;
    NOT_IMPLEMENTED: number;
    BAD_GATEWAY: number;
    SERVICE_UNAVAILABLE: number;
    GATEWAY_TIMEOUT: number;
};
export declare const LOGIN_MSG: {
    NOT_EXIST: string;
    NOT_MATCH: string;
    NOT_VERIFY: string;
    UNAUTHORIZED: string;
    ALREADY_SESSION: string;
    LOGIN_SUCCESS: string;
    LOGIN_FAILED: string;
};
export declare const RESPONSE_MSG: {
    USER_ALREADY_EXIST: string;
    USER_CREATED: string;
    USER_NOT_CREATED: string;
    MAILED: string;
    OTP_FAILED: string;
    OTP_SUCCESS: string;
    OTP_ERROR: string;
    LOGOUT_SUCCESS: string;
    LOGOUT_FAILED: string;
    TOKEN_SUCCESS: string;
    TOKEN_FAILED: string;
    ERROR_EMAIL_RETRIVE: string;
    USER_DETAIL: string;
    BOOK_CREATED: string;
    BOOK_NOT_PERMISSION: string;
    BOOK_EXIST: string;
    BOOK_NOT_FOUND: string;
};
