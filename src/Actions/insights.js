import { UPDATE_PER_CHAT_ROOM_DATA, UPDATE_WORD_COUNT_DATA } from "./types";

export const updatePerChatRoomData = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_PER_CHAT_ROOM_DATA,
        payload: data,
    });
};

export const updateWordCountData = (data) => (dispatch) => {
    dispatch({
        type: UPDATE_WORD_COUNT_DATA,
        payload: data,
    });
};
