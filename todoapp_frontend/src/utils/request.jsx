import axios from "axios";
import storage from "./storage";

const createInstance = () => {
    const accessToken = storage.get("accessToken") || {};

    const instance = axios.create({
        baseURL: "http://localhost:2000/v1/",
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.token}`,
        },
    });
    return instance;
};

export default createInstance();
