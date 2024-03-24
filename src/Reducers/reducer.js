import { combineReducers } from "redux";
import userInfo from "./userInfo";
import chatRooms from "./chat-rooms";
import insights from "./insights";

const reducer = combineReducers({
    userInfo,
    chatRooms,
    insights,
});

export default reducer;
