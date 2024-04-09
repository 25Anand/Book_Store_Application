"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const env = process.env.NODE_ENV || false;
if (!env)
    process.exit(100);
(0, dotenv_1.config)({ path: `bin/.env.${env}` });
exports.default = () => ({
    PORT: process.env.PORT,
    ENV: process.env.NODE_ENV,
    DB_URL: process.env.DB_URL,
    SECRET_KEY: process.env.SECRET_KEY
});
//# sourceMappingURL=configuration.js.map