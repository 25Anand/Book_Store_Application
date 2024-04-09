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
import mongoose, { Document } from "mongoose";
export interface IBookDocument extends Document {
    bookId: string;
    email: string;
    authors: string[];
    sellCount: number;
    title: string;
    description: string;
    price: number;
}
export declare const BookSchema: mongoose.Schema<IBookDocument, mongoose.Model<IBookDocument, any, any, any, mongoose.Document<unknown, any, IBookDocument> & IBookDocument & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IBookDocument, mongoose.Document<unknown, {}, mongoose.FlatRecord<IBookDocument>> & mongoose.FlatRecord<IBookDocument> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const Book: mongoose.Model<IBookDocument, {}, {}, {}, mongoose.Document<unknown, {}, IBookDocument> & IBookDocument & {
    _id: mongoose.Types.ObjectId;
}, any>;
