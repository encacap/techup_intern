import { CustomHelpers, LanguageMessages } from "joi";

const objectId = (value: string, helpers: CustomHelpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
        return helpers.message('"{{#label}}" must be a valid mongo id' as unknown as LanguageMessages);
    }
    return value;
};

export default {
    objectId,
};
