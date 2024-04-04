import {
    ADD_MESSAGE,
    CLEAR_CHAT_ROOM,
    LOADING_CHAT_ROOM,
    SET_ACTIVE_CHAT_ROOM,
} from "./types";

export const addMessage = (message) => (dispatch) => {
    dispatch({
        type: ADD_MESSAGE,
        payload: message,
    });
};

export const setActiveChatRoom = (roomName) => (dispatch) => {
    dispatch({
        type: SET_ACTIVE_CHAT_ROOM,
        payload: roomName,
    });
};

export const setRequiredChatState = (roomName) => (dispatch) => {
    //isloading true
    //update chatRoomDetails
    //is loading false
    dispatch({
        type: LOADING_CHAT_ROOM,
        payload: true,
    });
    // fetch 40 messages from databased with this roomName
    setTimeout(
        () =>
            dispatch({
                type: LOADING_CHAT_ROOM,
                payload: false,
            }),
        0
    );
};

export const clearActiveChatRoomState = () => (dispatch) => {
    dispatch({
        type: CLEAR_CHAT_ROOM,
        payload: null,
    });
};
