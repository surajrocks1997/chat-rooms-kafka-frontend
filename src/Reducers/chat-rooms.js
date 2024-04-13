import {
    ADD_MESSAGE,
    CLEAR_CHAT_ROOM,
    LOADING_CHAT_ROOM,
    SET_ACTIVE_CHAT_ROOM,
    ADD_TO_ONLINE_LIST,
    REMOVE_FROM_ONLINE_LIST,
} from "../Actions/types";

const initState = {
    activeChatRoom: null,
    online: [],
    isLoading: false,
    messages: [],
};

const chatRooms = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOADING_CHAT_ROOM:
            return {
                ...state,
                isLoading: payload,
            };
        case SET_ACTIVE_CHAT_ROOM:
            return {
                ...state,
                activeChatRoom: payload,
            };
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [payload, ...state.messages],
            };
        case ADD_TO_ONLINE_LIST:
            return {
                ...state,
                online: payload,
            };
        case REMOVE_FROM_ONLINE_LIST:
            return {
                ...state,
                online: payload,
            };
        case CLEAR_CHAT_ROOM:
            return {
                ...state,
                activeChatRoom: null,
                messages: [],
                online: [],
            };

        default:
            return state;
    }
};

export default chatRooms;
