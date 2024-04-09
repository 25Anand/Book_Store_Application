"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseHistoryModel = void 0;
const mongoose_1 = require("mongoose");
const purchaseHistorySchema = new mongoose_1.Schema({
    purchaseId: { type: String, unique: true, required: false },
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    purchaseDate: { type: Date, required: true },
    price: { type: Number, required: true },
});
exports.PurchaseHistoryModel = (0, mongoose_1.model)('PurchaseHistory', purchaseHistorySchema);
//# sourceMappingURL=purchase.schema.js.map