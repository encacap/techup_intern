"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteAtPath = (object, path, index) => {
    if (index === path.length - 1) {
        // eslint-disable-next-line no-param-reassign
        delete object[path[index]];
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    deleteAtPath(object[path[index]], path, index + 1);
};
const toJSON = (schema) => {
    let transform;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
        transform = schema.options.toJSON.transform;
    }
    // eslint-disable-next-line no-param-reassign
    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(doc, ret, options) {
            Object.keys(schema.paths).forEach((path) => {
                if (schema.paths[path].options && schema.paths[path].options.private) {
                    deleteAtPath(ret, path.split("."), 0);
                }
            });
            // eslint-disable-next-line no-param-reassign
            delete ret.__v;
            // eslint-disable-next-line no-param-reassign
            delete ret.createdAt;
            // eslint-disable-next-line no-param-reassign
            delete ret.updatedAt;
            if (transform) {
                return transform(doc, ret, options);
            }
        },
    });
};
exports.default = toJSON;
//# sourceMappingURL=toJSON.plugin.js.map