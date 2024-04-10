"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PurchaseHistoryModel = exports.purchaseHistorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.purchaseHistorySchema = new mongoose_1.default.Schema({
    purchaseId: { type: String, unique: true, required: false },
    bookId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'books',
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    purchaseDate: { type: Date, required: true },
    price: { type: Number, required: true },
    cardType: { type: String, required: true },
    chargeId: { type: String, required: false }
});
exports.purchaseHistorySchema.pre('save', async function (next) {
    try {
        if (!this.isNew) {
            return next();
        }
        const currentDate = new Date();
        const year = currentDate.getFullYear().toString().substr(-2);
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const latestPurchase = await exports.PurchaseHistoryModel.findOne({
            purchaseId: new RegExp(`^${year}-${month}-\\d+$`)
        }, { purchaseId: 1 }).sort({ purchaseId: -1 });
        let numericPart = '001';
        if (latestPurchase) {
            const lastNumericPart = parseInt(latestPurchase.purchaseId.split('-')[2]);
            numericPart = (lastNumericPart + 1).toString().padStart(3, '0');
        }
        this.purchaseId = `${year}-${month}-${numericPart}`;
        next();
    }
    catch (error) {
        throw error;
    }
});
exports.PurchaseHistoryModel = mongoose_1.default.model('PurchaseHistory', exports.purchaseHistorySchema);
//# sourceMappingURL=purchase.schema.js.map