"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logging_middleware_1 = require("./middleware/logging.middleware");
const config_1 = require("@nestjs/config");
const bodyParser = require("body-parser");
const express = require("express");
const constant_1 = require("./common/constant");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableShutdownHooks();
    app.use(express.json({
        verify: (req, res, buf) => {
            req.rawBody = buf;
        },
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));
    app.enableCors();
    app.setGlobalPrefix(constant_1.CONSTANT.API_ROOT_PATH);
    app.use(bodyParser.json());
    app.use(new logging_middleware_1.LoggerMiddleware().use);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    console.log('Port number is: ', port);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map