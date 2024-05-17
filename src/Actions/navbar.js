import axios from "axios";
import { SPRING_SERVER_URL } from "../config/uri";

export const loadFriendRequestProfiles = (frPending) => async (dispatch) => {
    const res = await axios.post(
        SPRING_SERVER_URL + "/users/userIds",
        frPending
    );
    return res.data;
};
