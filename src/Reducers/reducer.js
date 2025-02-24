import { combineReducers } from "redux";
import chatRooms from "./chat-rooms";
import insights from "./insights";
import auth from "./auth";
import socialInfo from "./social-info";
import alert from "./alert";

const reducer = combineReducers({
    alert,
    auth,
    socialInfo,
    chatRooms,
    insights,
});

export default reducer;
