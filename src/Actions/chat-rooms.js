import {
    ADD_MESSAGE,
    ADD_TO_ONLINE_LIST,
    CLEAR_CHAT_ROOM,
    LOADING_CHAT_ROOM,
    REMOVE_FROM_ONLINE_LIST,
    SET_ACTIVE_CHAT_ROOM,
} from "./types";

export const addMessage = (message) => (dispatch) => {
    const { messageType, chatRoomName, ...rest } = message;
    const datetime = new Date(parseInt(rest.timestamp));
    let options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    };
    let formattedDateTime = new Intl.DateTimeFormat("en-US", options).format(
        datetime
    );
    rest.timestamp = formattedDateTime;

    dispatch({
        type: ADD_MESSAGE,
        payload: rest,
    });
};

export const addUserToOnline = (arrOfEmails) => (dispatch) => {
    dispatch({
        type: ADD_TO_ONLINE_LIST,
        payload: arrOfEmails,
    });
};

export const removeUserFromOnline = (arrOfEmails) => (dispatch) => {
    dispatch({
        type: REMOVE_FROM_ONLINE_LIST,
        payload: arrOfEmails,
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

export const clearActiveChatRoomState = () => ({
    type: CLEAR_CHAT_ROOM,
    payload: null,
});
