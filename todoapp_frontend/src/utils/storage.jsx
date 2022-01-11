const storage = (() => {
    const storageName = "todo_app";
    const dataString = window.localStorage.getItem(storageName);

    let data = {};

    if (dataString) {
        data = JSON.parse(dataString);
    }

    const get = (name) => {
        return data[name] || null;
    };

    const set = (name, value) => {
        data[name] = value;
        window.localStorage.setItem(storageName, JSON.stringify(data));
    };

    return {
        get,
        set,
    };
})();

export default storage;
