"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
};
exports.default = {
    objectId,
};
//# sourceMappingURL=custom.validation.js.map