import {
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_AUTH_LOADING,
    USER_LOADED,
} from "../Actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: false,
    user: null,
};

const auth = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: payload,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading: false,
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
            };

        default:
            return state;
    }
};

export default auth;
