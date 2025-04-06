"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
class ValidationService {
    constructor(schema) {
        this.schema = schema;
    }
    transform(value, metadata) {
        return this.schema.parse(value);
    }
}
exports.ValidationService = ValidationService;
//# sourceMappingURL=validation.service.js.map