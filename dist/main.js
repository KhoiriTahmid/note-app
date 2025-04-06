"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const nest_winston_1 = require("nest-winston");
const logger_interseceptor_1 = require("./common/logger.interseceptor");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(cookieParser());
    app.useLogger(app.get(nest_winston_1.WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalInterceptors(app.get(logger_interseceptor_1.LoggerInterceptor));
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map