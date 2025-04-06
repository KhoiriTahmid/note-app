"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomException = void 0;
const common_1 = require("@nestjs/common");
class CustomException extends common_1.HttpException {
    constructor(code, message, errors = null) {
        if (errors) {
            super({
                success: false,
                message,
                errors,
                timestamp: new Date().toISOString()
            }, code);
        }
        else {
            super({
                success: false,
                message,
                timestamp: new Date().toISOString()
            }, code);
        }
    }
}
exports.CustomException = CustomException;
//# sourceMappingURL=customException.js.map