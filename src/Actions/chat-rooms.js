import {
    ADD_MESSAGE,
    CREATE_CHAT_ROOMS,
    SET_SUBSCRIBED_CHAT_ROOMS,
} from "./types";

export const addMessage = (message) => (dispatch) => {
    dispatch({
        type: ADD_MESSAGE,
        payload: message,
    });
};

export const setSubscribedChatRooms = (rooms) => (dispatch) => {
    dispatch({
        type: SET_SUBSCRIBED_CHAT_ROOMS,
        payload: rooms,
    });

    rooms.forEach((room) =>
        dispatch({
            type: CREATE_CHAT_ROOMS,
            payload: room,
        })
    );
};
