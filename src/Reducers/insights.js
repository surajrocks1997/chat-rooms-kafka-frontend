import {
    UPDATE_PER_CHAT_ROOM_DATA,
    UPDATE_WORD_COUNT_DATA,
    SET_INIT_INSIGHT_MESSAGE_DATA,
    SET_INIT_INSIGHT_WORD_DATA,
} from "../Actions/types";

const initState = {
    perChatRoomData: [],
    // perChatRoomData: {
    //     Sports: 0,
    //     Technology: 0,
    //     Science: 0,
    //     Automobile: 0,
    //     Gadgets: 0,
    //     News: 0,
    //     Random: 0,
    // },
    wordCountData: [],
};

const insights = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_INIT_INSIGHT_MESSAGE_DATA:
            return {
                ...state,
                perChatRoomData: payload,
            };
        case SET_INIT_INSIGHT_WORD_DATA:
            return {
                ...state,
                wordCountData: payload.sort((a, b) => a.count - b.count),
            };
        case UPDATE_PER_CHAT_ROOM_DATA:
            let myIndex = state.perChatRoomData.findIndex(
                (item) => item.chatRoomName === payload.chatRoomName
            );
            let newData;
            if (myIndex !== -1) {
                const updatedData = {
                    ...state.perChatRoomData[myIndex],
                    count: payload.count,
                };
                newData = [
                    ...state.perChatRoomData.slice(0, myIndex),
                    updatedData,
                    ...state.perChatRoomData.slice(myIndex + 1),
                ];
            } else {
                newData = [...state.perChatRoomData, payload];
            }
            return {
                ...state,
                perChatRoomData: newData,
            };
        case UPDATE_WORD_COUNT_DATA:
            const index = state.wordCountData.findIndex(
                (item) => item.word === payload.word
            );
            let newWords;
            if (index !== -1) {
                const updatedWord = {
                    ...state.wordCountData[index],
                    count: payload.count,
                };
                newWords = [
                    ...state.wordCountData.slice(0, index),
                    updatedWord,
                    ...state.wordCountData.slice(index + 1),
                ];
            } else {
                newWords = [...state.wordCountData, payload];
            }

            newWords.sort((a, b) => b.count - a.count);
            const finalData = newWords.slice(0, 20);
            return {
                ...state,
                wordCountData: finalData.sort((a, b) => a.count - b.count),
            };
        default:
            return state;
    }
};

export default insights;
