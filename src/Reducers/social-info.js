import { POPULATE_VISITED_PROFILE } from "../Actions/types";

const initialState = {
    visitedProfile: null,
    isLoading: true,
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
        default:
            return state;
    }
};

export default socialInfo;
