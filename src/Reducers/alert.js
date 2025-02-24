import { REMOVE_ALERT, SET_ALERT } from "../Actions/types";

const initialState = [];

const alert = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_ALERT:
            const index = state.findIndex((alert) => alert.id === payload.id);
            if(index !== -1) return state;
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter((alert) => alert.id !== payload);
        default:
            return state;
    }
};

export default alert;
