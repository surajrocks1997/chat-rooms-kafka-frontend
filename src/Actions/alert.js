import { SET_ALERT, REMOVE_ALERT } from "./types";
import { v4 as uuid } from "uuid";

export const setAlert = (msg, alertType, timeInSeconds) => (dispatch) => {
    const id = uuid();
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id },
    });

    setTimeout(
        () => {
            dispatch({
                type: REMOVE_ALERT,
                payload: id,
            });
        },
        timeInSeconds ? timeInSeconds * 1000 : 5 * 1000
    );
};

export const setWebSocketErrorAlert = (msg, alertType) => (dispatch) => {
    const id = "WEBSOCKET_ERROR";
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType: "danger", id },
    });
};

export const setWebSocketConnectAlert = (msg, alertType) => (dispatch) => {
    const id = "WEBSOCKET_ERROR";
    dispatch(setAlert(msg, alertType));

    setTimeout(() => {
        dispatch({
            type: REMOVE_ALERT,
            payload: id,
        });
    }, 500);
};
