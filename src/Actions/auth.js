import axios from "axios";
import {
    AUTH_ERROR,
    CLEAR_PROFILE,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    SET_AUTH_LOADING,
    USER_LOADED,
} from "./types";
import setAuthToken from "../utils/axiosTokenHeader";
import { toast } from "react-toastify";
import { AUTH_SERVER_URL, SPRING_SERVER_URL } from "../config/uri";

export const setAuthLoading = (isLoading) => (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING,
        payload: isLoading,
    });
};

export const signUp =
    ({ fullName, signUpEmail, signUpPassword }) =>
    async (dispatch) => {
        dispatch(setAuthLoading(true));
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            name: fullName,
            email: signUpEmail,
            password: signUpPassword,
        });

        try {
            const res = await axios.post(
                `${AUTH_SERVER_URL}/auth/user`,
                body,
                config
            );

            await axios.post(
                SPRING_SERVER_URL + "/initUserSocialDetails",
                res.data,
                {
                    headers: {
                        "x-auth-token": res.data.token,
                    },
                }
            );

            await dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            await dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => {
                    console.log(error.msg);
                    toast.error(error.msg);
                });
            }

            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

export const login =
    ({ loginEmail, loginPassword }) =>
    async (dispatch) => {
        dispatch(setAuthLoading(true));
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({
            email: loginEmail,
            password: loginPassword,
        });

        try {
            const res = await axios.post(
                `${AUTH_SERVER_URL}/auth`,
                body,
                config
            );

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });

            await dispatch(loadUser());
        } catch (err) {
            console.error(err);
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => {
                    console.log(error.msg);
                    toast.error(error.msg);
                });
            }

            dispatch({
                type: LOGIN_FAIL,
            });
        }
    };

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(`${AUTH_SERVER_URL}/auth`);
        await dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        return res;
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });
};
