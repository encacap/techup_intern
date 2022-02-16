import axios from "axios";
import storage from "./storage";

import { API as APIConfigs } from "../configs/configs";

const createInstance = (type = "authentication") => {
    const instance = axios.create({
        baseURL: APIConfigs.gateway,
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (type === "authentication") {
        instance.interceptors.request.use(
            (config) => {
                config.headers.Authorization = `Bearer ${storage.get("accessToken")?.token}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        instance.interceptors.response.use(
            (response) => response.data,
            async (error) => {
                const { response, config: originalConfigs } = error;

                if (!response) return Promise.reject(error);

                const { status } = response;

                if (!status) return Promise.reject(error);
                if (status !== 401 && originalConfigs.retry) return Promise.reject(error);
                if (!storage.get("refreshToken")?.token) return Promise.reject(error);

                originalConfigs.retry = true;

                try {
                    const { data } = await axios.post(
                        "auth/refresh-tokens",
                        {
                            refreshToken: storage.get("refreshToken")?.token,
                        },
                        originalConfigs
                    );
                    storage.set("accessToken", data.access);
                    storage.set("refreshToken", data.refresh);
                    instance.defaults.headers.Authorization = `Bearer ${data.access}`;
                    originalConfigs.headers.Authorization = `Bearer ${data.access}`;
                    return axios(originalConfigs);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }
        );
    }

    return instance;
};
export const guestRequest = createInstance("guest");
export default createInstance();
