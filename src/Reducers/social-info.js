import {
    FRIEND_REQUEST_SENT,
    GET_SOCIAL_INFO,
    POPULATE_VISITED_PROFILE,
} from "../Actions/types";

const initialState = {
    visitedProfile: null,
    isLoading: true,
    friends: [],
    frPending: [],
    frSent: [],
};

const socialInfo = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case POPULATE_VISITED_PROFILE:
            return {
                ...state,
                visitedProfile: payload,
                isLoading: false,
            };
        case GET_SOCIAL_INFO:
            return {
                ...state,
                friends: payload.friendIds,
                frPending: payload.friendRequestDetails.received.pending,
                frSent: payload.friendRequestDetails.sent,
            };
        case FRIEND_REQUEST_SENT:
            return {
                ...state,
                frSent: [...state.frSent, payload],
            };
        default:
            return state;
    }
};

export default socialInfo;
