"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponseMaker = exports.successResponseMaker = void 0;
const successResponseMaker = (message, data, page = null) => {
    if (page) {
        return {
            success: true,
            message,
            data,
            page
        };
    }
    return {
        success: true,
        message,
        data,
    };
};
exports.successResponseMaker = successResponseMaker;
const errorResponseMaker = (message, errors) => {
    return {
        success: false,
        message,
        errors,
    };
};
exports.errorResponseMaker = errorResponseMaker;
//# sourceMappingURL=model.js.map