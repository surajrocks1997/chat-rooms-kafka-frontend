import { combineReducers } from "redux";
import chatRooms from "./chat-rooms";
import insights from "./insights";
import auth from "./auth";

const reducer = combineReducers({
    auth,
    chatRooms,
    insights,
});

export default reducer;
