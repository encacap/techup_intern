interface ObjectArgument {
    [key: string]: string | any;
}

type Callback = (accumulator: ObjectArgument, current: string, index: number, array: string[]) => ObjectArgument;

/**
 * Create an object composed of the picked object properties.
 * @param object The source object.
 * @param keys The properties to pick, specified
 * @returns An object composed of the picked properties.
 */

const pick = (object: ObjectArgument, keys: string[]) => {
    const reduceCallback: Callback = (result, key) => {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            // eslint-disable-next-line no-param-reassign
            result[key] = object[key];
        }
        return result;
    };
    return keys.reduce(reduceCallback, {});
};

export default pick;
