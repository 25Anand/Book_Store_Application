"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    userRole: { type: String, required: true, enum: ['Author', 'Admin', 'Retail Users'] }
});
exports.UserModel = mongoose_1.default.model('User', exports.UserSchema);
//# sourceMappingURL=user.schema.js.map