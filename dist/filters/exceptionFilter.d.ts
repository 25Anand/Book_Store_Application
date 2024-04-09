import { ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
export declare const getErrorMessage: <T>(exception: T) => string;
export declare class AllExceptionsFilter<T> implements ExceptionFilter {
    private readonly httpAdapterHost;
    private readonly logger;
    constructor(httpAdapterHost: HttpAdapterHost, logger: Logger);
    catch(exception: any, host: ArgumentsHost): void;
}
