const storage = (() => {
    const storageName = "todo_app";

    const fetchData = () => {
        const data = window.localStorage.getItem(storageName);
        return data ? JSON.parse(data) : {};
    };

    const get = (name) => {
        const data = fetchData();
        return data[name] || null;
    };

    const set = (name, value) => {
        const data = fetchData();
        data[name] = value;
        window.localStorage.setItem(storageName, JSON.stringify(data));
    };

    return {
        get,
        set,
    };
})();

export default storage;
