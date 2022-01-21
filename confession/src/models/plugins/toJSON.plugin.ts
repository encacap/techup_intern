/* eslint-disable */
import { Document as MongooseDocument, SchemaDefinition } from "mongoose";

interface Document extends MongooseDocument {
    [key: string]: any;
}

type Options = {
    private?: boolean;
};

type Transform = (doc: Document, ret: Document, options: Options) => Document;

interface Schema extends SchemaDefinition<object> {
    options?: {
        toJSON?: {
            transform?: Transform;
        };
    };
}

const deleteAtPath = (object: Document, path: string[], index: number) => {
    if (index === path.length - 1) {
        // eslint-disable-next-line no-param-reassign
        delete object[path[index]];
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    deleteAtPath(object[path[index]], path, index + 1);
};

const toJSON = (schema: Schema | any) => {
    let transform: Transform;

    if (schema.options.toJSON && schema.options.toJSON.transform) {
        transform = schema.options.toJSON.transform;
    }

    // eslint-disable-next-line no-param-reassign
    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(doc: Document, ret: Document, options: Options) {
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

export default toJSON;
