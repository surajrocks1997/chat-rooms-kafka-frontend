import { combineReducers } from "redux";
import userInfo from "./userInfo";
import chatRooms from "./chat-rooms";
import insights from "./insights";
import auth from "./auth";

const reducer = combineReducers({
    userInfo,
    chatRooms,
    insights,
    auth,
});

export default reducer;
