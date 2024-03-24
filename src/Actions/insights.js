import axios from "axios";
import {
    SET_INIT_INSIGHT_DATA,
    SET_INIT_INSIGHT_MESSAGE_DATA,
    SET_INIT_INSIGHT_WORD_DATA,
    UPDATE_PER_CHAT_ROOM_DATA,
    UPDATE_WORD_COUNT_DATA,
} from "./types";

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

export const getInitData = () => async (dispatch) => {
    const initMessageData = await axios.get(
        "http://localhost:8081/init/fetchMessageData"
    );
    const initWordCountData = await axios.get(
        "http://localhost:8081/init/fetchWordData"
    );

    console.log(initMessageData);
    console.log(initWordCountData);

    dispatch({
        type: SET_INIT_INSIGHT_MESSAGE_DATA,
        payload: initMessageData.data,
    });

    dispatch({
        type: SET_INIT_INSIGHT_WORD_DATA,
        payload: initWordCountData.data,
    });
};
