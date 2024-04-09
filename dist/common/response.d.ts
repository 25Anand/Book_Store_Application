import { HttpStatus } from '@nestjs/common';
export declare const RESPONSE_MSG: {
    SUCCESS: string;
    ERROR: string;
};
export declare const RESPONSE_DATA: {
    SUCCESS: {
        statusCode: HttpStatus;
        message: string;
    };
    ERROR: {
        statusCode: HttpStatus;
        message: string;
    };
};
