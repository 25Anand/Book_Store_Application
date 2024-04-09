/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Types } from 'mongoose';
export declare class Dao {
    ObjectId: typeof Types.ObjectId;
    protected modelName: any;
    constructor(model: any);
    saveDataInBackground(data: any): Promise<any>;
    saveData(data: any): Promise<any>;
    getDataById(query: any): Promise<any>;
    findOne(query: any, projection?: any, options?: any): Promise<any>;
    findOneAndUpdate(conditions: any, update: any, options?: any): Promise<any>;
    updateOne(conditions: any, update: any, options?: any): Promise<any>;
    updateMany(conditions: any, update: any, options?: any): Promise<any>;
    findAll(query: any, projection?: any, options?: any): Promise<any>;
    findWithPagination(query: any, projection?: any, options?: any, page?: number, limit?: number): Promise<any>;
    findAllPaginated(query: any, projection?: any, options?: any, page?: number, size?: number): Promise<any>;
    insertMany(data: any, options: any): Promise<any>;
    distinct(path: string): Promise<any>;
    aggregateData(aggregateArray: any, options: any): Promise<any>;
    paginateAggregate(pipeline: any[], options?: any): Promise<any>;
    deleteById(id: string): Promise<any>;
    deleteMany(query: any): Promise<any>;
    aggregate(query: any): Promise<any>;
    findAllCursor(query: any): Promise<any>;
    aggregateCursor(query: any, batchSize: number): Promise<any>;
    vendorFindAllCursor(query: any): Promise<any>;
    clientFindAllCursor(query: any): Promise<any>;
    countDocuments(query: any): Promise<any>;
}
