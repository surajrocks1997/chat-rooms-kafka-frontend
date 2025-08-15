import axios from "axios";
import {
    ADD_MESSAGE,
    ADD_TO_ONLINE_LIST,
    CLEAR_CHAT_ROOM,
    LOADING_CHAT_ROOM,
    REMOVE_FROM_ONLINE_LIST,
    SET_ACTIVE_CHAT_ROOM,
} from "./types";
import { SPRING_SERVER_URL } from "../config/uri";

export const addMessage = (message) => (dispatch) => {
    const { messageType, chatRoomName, ...rest } = message;
    const datetime = new Date();
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

export const fetchAllOnline = (chatRoom) => async (dispatch) => {
    try {
        const res = await axios.get(
            `${SPRING_SERVER_URL}/user/chatRooms/${chatRoom}/online`
        );
        dispatch({
            type: ADD_TO_ONLINE_LIST,
            payload: res.data,
        });
    } catch (error) {
        console.error("Error fetching online users:", error);
    }
};

export const addUserToOnline = (email) => (dispatch) => {
    dispatch({
        type: ADD_TO_ONLINE_LIST,
        payload: email,
    });
};

export const removeUserFromOnline = (email) => (dispatch) => {
    dispatch({
        type: REMOVE_FROM_ONLINE_LIST,
        payload: email,
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
    // fetch 40 messages from database with this roomName
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
