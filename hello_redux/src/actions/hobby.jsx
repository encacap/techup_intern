import { ADD_HOBBY, SET_ACTIVE_HOBBY, SET_NEW_HOBBY } from "../constants/hobby";

export const setNewHobby = (payload) => {
    return {
        type: SET_NEW_HOBBY,
        payload,
    };
};

export const addNewHobby = (hobby) => {
    return {
        type: ADD_HOBBY,
        payload: hobby,
    };
};

export const setActiveHobby = (hobby) => {
    return {
        type: SET_ACTIVE_HOBBY,
        payload: hobby,
    };
};
