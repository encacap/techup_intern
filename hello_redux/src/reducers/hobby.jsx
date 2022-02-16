import { ADD_HOBBY, SET_ACTIVE_HOBBY, SET_NEW_HOBBY } from "../constants/hobby";

const initialState = {
    hobbies: [
        {
            id: Date.now(),
            title: "Programming",
        },
    ],
    activeHobbyId: null,
    newHobby: "",
};

const hobbyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NEW_HOBBY: {
            return {
                ...state,
                newHobby: action.payload,
            };
        }
        case ADD_HOBBY: {
            return {
                ...state,
                hobbies: [...state.hobbies, action.payload],
            };
        }
        case SET_ACTIVE_HOBBY: {
            return state;
        }
        default: {
            return state;
        }
    }
};

export default hobbyReducer;
