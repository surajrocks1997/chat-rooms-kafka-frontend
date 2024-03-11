import {
    ADD_MESSAGE,
    CLEAR_CHAT_ROOM,
    LOADING_CHAT_ROOM,
    SET_ACTIVE_CHAT_ROOM,
} from "../Actions/types";

const initState = {
    activeChatRoom: null,
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
                messages: [...state.messages, payload],
            };
        case CLEAR_CHAT_ROOM:
            return {
                ...state,
                activeChatRoom: null,
                messages: [],
            };

        default:
            return state;
    }
};

export default chatRooms;

// {"username":"SURAJ","message":"asdasd","timestamp":"1709712378206","chatRoomName":"chat-room-1"}
