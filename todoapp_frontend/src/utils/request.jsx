import axios from "axios";
import storage from "./storage";

const createInstance = () => {
    const accessToken = storage.get("accessToken") || {};
    const refreshToken = storage.get("refreshToken") || {};

    const instance = axios.create({
        baseURL: "http://localhost:2000/v1/",
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken.token}`,
        },
    });

    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const { response, config: originalConfigs } = error;

            if (!response) return Promise.reject(error);

            const { status } = response;

            if (!status) return Promise.reject(error);
            if (status !== 401 && originalConfigs.retry) return Promise.reject(error);
            if (!refreshToken.token) return Promise.reject(error);

            originalConfigs.retry = true;

            try {
                const { data } = instance.post("auth/refresh-tokens", {
                    refreshToken: refreshToken.token,
                });
                storage.set("accessToken", data.accessToken);
                storage.set("refreshToken", data.refreshToken);
                instance.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
                originalConfigs.headers.Authorization = `Bearer ${data.accessToken}`;
                return axios(originalConfigs);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }
    );

    return instance;
};

export default createInstance();
