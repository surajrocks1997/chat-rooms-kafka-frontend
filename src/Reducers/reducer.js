import { combineReducers } from "redux";
import userInfo from "./userInfo";
import chatRooms from "./chat-rooms";

const reducer = combineReducers({
    userInfo,
    chatRooms,
});

export default reducer;
