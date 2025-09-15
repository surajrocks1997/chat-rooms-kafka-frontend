import {
    ADD_MESSAGE,
    CLEAR_CHAT_ROOM,
    LOADING_CHAT_ROOM,
    SET_ACTIVE_CHAT_ROOM,
    ADD_TO_ONLINE_LIST,
    REMOVE_FROM_ONLINE_LIST,
    SET_CHAT_LOADING,
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
        case SET_CHAT_LOADING:
            return {
                ...state,
                isLoading: payload,
            };
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
            const index = state.messages.findIndex(
                (item) => item.correlationId === action.payload.correlationId
            );

            let updatedMessageState;

            if (index !== -1) {
                updatedMessageState = [
                    ...state.messages.slice(0, index),
                    action.payload,
                    ...state.messages.slice(index + 1),
                ];
            } else {
                updatedMessageState = [payload, ...state.messages];
            }

            return {
                ...state,
                messages: updatedMessageState,
            };
        case ADD_TO_ONLINE_LIST:
            return {
                ...state,
                online:
                    state.online.length === 0
                        ? payload
                        : [payload, ...state.online],
            };
        case REMOVE_FROM_ONLINE_LIST:
            return {
                ...state,
                online: state.online.filter((value) => value !== payload),
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
