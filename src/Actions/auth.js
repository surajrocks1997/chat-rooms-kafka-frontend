import axios from "axios";
import {
    AUTH_ERROR,
    CLEAR_PROFILE,
    GOOGLE_LOGIN_FAIL,
    GOOGLE_LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    REMOVE_SOCIAL_INFO,
    SET_AUTH_LOADING,
    USER_LOADED,
} from "./types";
import setAuthToken from "../utils/axiosTokenHeader";
import { AUTH_SERVER_URL, SPRING_SERVER_URL } from "../config/uri";

export const setAuthLoading = (isLoading) => (dispatch) => {
    dispatch({
        type: SET_AUTH_LOADING,
        payload: isLoading,
    });
};

export const googleAuth = (authCode) => async (dispatch) => {
    dispatch(setAuthLoading(true));
    try {
        const config = {
            headers: {
                authCode: authCode,
            },
        };
        const res = await axios.get(
            `${AUTH_SERVER_URL}/google/auth/token`,
            config
        );

        await dispatch({
            type: GOOGLE_LOGIN_SUCCESS,
            payload: res.data,
        });

        await dispatch(loadUser());
    } catch (err) {
        console.log(err);
        dispatch({
            type: GOOGLE_LOGIN_FAIL,
        });
    }
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

            // await axios.post(
            //     SPRING_SERVER_URL + "/initUserSocialDetails",
            //     res.data,
            //     {
            //         headers: {
            //             "x-auth-token": res.data.token,
            //         },
            //     }
            // );

            await dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });

            await dispatch(loadUser());
        } catch (err) {
            console.log(err);
            // const errors = err.response.data.errors;
            // if (errors) {
            //     errors.forEach((error) => {
            //         console.log(error.msg);
            //         toast.error(error.msg);
            //     });
            // }

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
            // const errors = err.response.data.errors;
            // if (errors) {
            //     errors.forEach((error) => {
            //         console.log(error.msg);
            //         toast.error(error.msg);
            //     });
            // }

            dispatch({
                type: LOGIN_FAIL,
            });
        }
    };

const refreshToken = async (dispatch) => {
    const res = await axios.get(`${AUTH_SERVER_URL}/auth/refresh`);
    await dispatch({
        type: REFRESH_TOKEN_SUCCESS,
        payload: res.data,
    });
    return res.data.accessToken;
};

export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
        try {
            const res = await axios.get(`${SPRING_SERVER_URL}/user`);
            await dispatch({
                type: USER_LOADED,
                payload: res.data,
            });
        } catch (err) {
            if (err.response && err.response.status === 401) {
                console.log("Token Expired. Trying to Refresh It...");
                try {
                    await refreshToken(dispatch);
                    await dispatch(loadUser());
                } catch (refreshError) {
                    console.error(
                        "Error retrying request after token refresh",
                        refreshError
                    );
                    dispatch({
                        type: AUTH_ERROR,
                    });
                }
            } else {
                console.error(err);
                dispatch({
                    type: AUTH_ERROR,
                });
            }
        }
    } else {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
    });

    dispatch({
        type: REMOVE_SOCIAL_INFO,
    });
};
