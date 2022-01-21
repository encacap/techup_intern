"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Create an object composed of the picked object properties.
 * @param object The source object.
 * @param keys The properties to pick, specified
 * @returns An object composed of the picked properties.
 */
const pick = (object, keys) => {
    const reduceCallback = (result, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            result[key] = object[key];
        }
        return result;
    };
    return keys.reduce(reduceCallback, {});
};
exports.default = pick;
//# sourceMappingURL=pick.js.map