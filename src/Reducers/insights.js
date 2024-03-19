import {
    UPDATE_PER_CHAT_ROOM_DATA,
    UPDATE_WORD_COUNT_DATA,
} from "../Actions/types";

const initState = {
    perChatRoomData: {
        Sports: 0,
        Technology: 0,
        Science: 0,
        Automobile: 0,
        Gadgets: 0,
        News: 0,
        Random: 0,
    },
    wordCountData: {},
};

const insights = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_PER_CHAT_ROOM_DATA:
            return {
                ...state,
                perChatRoomData: {
                    ...state.perChatRoomData,
                    [payload.chatRoomName]: payload.count,
                },
            };
        case UPDATE_WORD_COUNT_DATA:
            return {
                ...state,
                wordCountData: {
                    ...state.wordCountData,
                    [payload.word]: payload.count,
                },
            };
        default:
            return state;
    }
};

export default insights;
