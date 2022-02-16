import { SET_ACCESS_TOKEN, SET_REFRESH_TOKEN, SET_USER } from "../constants/user";

export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const setAccessToken = (accessToken) => ({
    type: SET_ACCESS_TOKEN,
    payload: accessToken,
});

export const setRefreshToken = (refreshToken) => ({
    type: SET_REFRESH_TOKEN,
    payload: refreshToken,
});
