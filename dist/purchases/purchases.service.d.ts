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
import { PurchaseHistory } from './schema/purchase.schema';
import { IBookDocument } from 'src/books/schema/books.schema';
import { Model } from 'mongoose';
import { StripeService } from 'src/utils/stripe/stripe.service';
import { ProducerService } from 'src/utils/rabbitMQ/producer/producer';
export declare class PurchasesService {
    private readonly bookSchema;
    private readonly purchaseHistorySchema;
    private stripeService;
    private producerService;
    constructor(bookSchema: Model<IBookDocument>, purchaseHistorySchema: Model<PurchaseHistory>, stripeService: StripeService, producerService: ProducerService);
    purchaseBook(userData: any, data: any): Promise<PurchaseHistory>;
    viewHistory(data: any): Promise<import("mongoose").Document<unknown, {}, PurchaseHistory> & PurchaseHistory & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
