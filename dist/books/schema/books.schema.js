"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModel = exports.BookSchema = void 0;
const mongoose_1 = require("mongoose");
const enum_1 = require("../../common/enum");
exports.BookSchema = new mongoose_1.default.Schema({
    bookId: { type: String, required: true },
    email: { type: String, required: false },
    authors: [{ type: String, required: true }],
    sellCount: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
}, {
    versionKey: false,
    timestamps: true,
    collection: enum_1.ENUM.COLLECTIONS.BOOK,
});
exports.BookModel = mongoose_1.default.model("Books", exports.BookSchema);
//# sourceMappingURL=books.schema.js.map