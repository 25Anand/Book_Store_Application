"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const mongoose = require("mongoose");
const config_1 = require("@nestjs/config");
exports.databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (config) => {
            mongoose.set('strictQuery', false);
            const debug = config.get('DEBUG') == 'true';
            console.log('DEBUG', debug);
            mongoose.set('debug', debug);
            mongoose.connection.on('connecting', () => {
                console.info('[MongoDB] connecting');
            });
            mongoose.connection.on('error', (error) => {
                console.error(`[MongoDB] connection ${error}`);
                mongoose.disconnect();
            });
            mongoose.connection.on('connected', async () => {
                console.info('[MongoDB] connected');
            });
            mongoose.connection.once('open', () => {
                console.info('[MongoDB] connection opened');
            });
            mongoose.connection.on('reconnected', () => {
                console.warn('[MongoDB] reconnected');
            });
            mongoose.connection.on('reconnectFailed', () => {
                console.error('[MongoDB] reconnectFailed');
            });
            mongoose.connection.on('disconnected', () => {
                console.warn('[MongoDB] disconnected');
            });
            mongoose.connection.on('full-setup', () => {
                console.debug('[MongoDB] reconnecting... %d');
            });
            return mongoose.connect(config.get('DB_URL'));
        },
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=db.provider.js.map