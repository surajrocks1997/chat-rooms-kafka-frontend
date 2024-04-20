import { combineReducers } from "redux";
import chatRooms from "./chat-rooms";
import insights from "./insights";
import auth from "./auth";
import socialInfo from "./social-info";

const reducer = combineReducers({
    auth,
    socialInfo,
    chatRooms,
    insights,
});

export default reducer;
