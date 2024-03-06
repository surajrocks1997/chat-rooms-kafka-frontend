import {
    ADD_MESSAGE,
    CREATE_CHAT_ROOMS,
    SET_SUBSCRIBED_CHAT_ROOMS,
} from "../Actions/types";

const initState = {
    activeChatRoom: "chat-room-1",
    isLoading: false,
    subscribedChatRooms: [],
    chatRoomDetails: {},
};

const chatRooms = (state = initState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ADD_MESSAGE:
            return {
                ...state,
                chatRoomDetails: {
                    [payload.chatRoomName]: {
                        ...state.chatRoomDetails[payload.chatRoomName],
                        messages: [
                            ...state.chatRoomDetails[payload.chatRoomName].messages,
                            {
                                username: payload.username,
                                message: payload.message,
                                timestamp: payload.timestamp,
                            },
                        ],
                    },
                },
            };
        case CREATE_CHAT_ROOMS:
            return {
                ...state,
                chatRoomDetails: {
                    [payload]: {
                        messages: [],
                    },
                },
            };
        case SET_SUBSCRIBED_CHAT_ROOMS:
            return {
                ...state,
                subscribedChatRooms: payload,
            };

        default:
            return state;
    }
};

export default chatRooms;

// {"username":"SURAJ","message":"asdasd","timestamp":"1709712378206","chatRoomName":"chat-room-1"}
