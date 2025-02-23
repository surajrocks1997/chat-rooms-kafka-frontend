import {
    AUTH_ERROR,
    GOOGLE_LOGIN_FAIL,
    GOOGLE_LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_AUTH_LOADING,
    USER_LOADED,
} from "../Actions/types";

const initialState = {
    // token: localStorage.getItem("token"),
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
        case GOOGLE_LOGIN_SUCCESS:
        case REFRESH_TOKEN_SUCCESS:
            localStorage.setItem("token", payload.accessToken);
            return {
                ...state,
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case GOOGLE_LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
            };

        default:
            return state;
    }
};

export default auth;
