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
import mongoose, { Document, Types } from 'mongoose';
export interface PurchaseHistory extends Document {
    purchaseId: string;
    bookId: Types.ObjectId;
    userId: Types.ObjectId;
    purchaseDate: Date;
    price: number;
    cardType: string;
    chargeId: string;
}
export declare const purchaseHistorySchema: mongoose.Schema<PurchaseHistory, mongoose.Model<PurchaseHistory, any, any, any, mongoose.Document<unknown, any, PurchaseHistory> & PurchaseHistory & {
    _id: Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PurchaseHistory, mongoose.Document<unknown, {}, mongoose.FlatRecord<PurchaseHistory>> & mongoose.FlatRecord<PurchaseHistory> & {
    _id: Types.ObjectId;
}>;
export declare const PurchaseHistoryModel: mongoose.Model<PurchaseHistory, {}, {}, {}, mongoose.Document<unknown, {}, PurchaseHistory> & PurchaseHistory & {
    _id: Types.ObjectId;
}, any>;
