import {
    FRIEND_REQUEST_SENT,
    GET_SOCIAL_INFO,
    POPULATE_VISITED_PROFILE,
    REMOVE_SOCIAL_INFO,
    SET_SOCIAL_LOADING,
} from "../Actions/types";

const initialState = {
    visitedProfile: null,
    isLoading: true,
    relationshipMap: {},
};

const socialInfo = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case SET_SOCIAL_LOADING:
            return {
                ...state,
                isLoading: payload,
            };
        case POPULATE_VISITED_PROFILE:
            return {
                ...state,
                visitedProfile: payload,
            };
        case GET_SOCIAL_INFO:
            return {
                ...state,
                relationshipMap: payload
            };
        case FRIEND_REQUEST_SENT:
            return {
                ...state,
                relationshipMap: {
                    ...state.relationshipMap,
                    [payload]: FRIEND_REQUEST_SENT,
                },
            };
        case REMOVE_SOCIAL_INFO:
            return initialState;
        default:
            return state;
    }
};

export default socialInfo;
