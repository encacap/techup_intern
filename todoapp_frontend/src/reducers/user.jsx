import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_USER } from "../constants/user";
import storage from "../utils/storage";

const initialState = {
    user: storage.get("user") || {},
    accessToken: storage.get("accessToken") || null,
    refreshToken: storage.get("refreshToken") || null,
};

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_USER: {
            storage.set("user", payload);
            return {
                ...state,
                user: payload,
            };
        }
        case SET_ACCESS_TOKEN: {
            storage.set("accessToken", payload);
            return {
                ...state,
                accessToken: payload,
            };
        }
        case SET_REFRESH_TOKEN: {
            storage.set("refreshToken", payload);
            return {
                ...state,
                refreshToken: payload,
            };
        }
        default: {
            return state;
        }
    }
};

export default userReducer;
