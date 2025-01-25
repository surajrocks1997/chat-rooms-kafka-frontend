import axios from "axios";
import { FRIEND_REQUEST_SENT, GET_SOCIAL_INFO } from "./types";
import { SPRING_SERVER_URL } from "../config/uri";
import { toast } from "react-toastify";
import { loadFriendRequestProfiles } from "./navbar";

export const userSocialDetailRes = (userId) => async (dispatch) => {
    const res = await axios.get(
        `${SPRING_SERVER_URL}/getUserSocialDetails/${userId}`,
        {
            withCredentials: true,
        }
    );

    var pending = res.data.friendRequestDetails.received.pending;
    if (pending.length > 0) {
        const pendingUserProfiles = await dispatch(
            loadFriendRequestProfiles(pending)
        );
        res.data.friendRequestDetails.received.pending = pendingUserProfiles;
    }

    dispatch({
        type: GET_SOCIAL_INFO,
        payload: res.data,
    });
};

export const sendFriendRequest = (receiverId) => async (dispatch) => {
    try {
        axios.get(`${SPRING_SERVER_URL}/sendFR/${receiverId}`, {
            withCredentials: true,
        });

        dispatch({
            type: FRIEND_REQUEST_SENT,
            payload: receiverId,
        });
    } catch (error) {
        toast.error("Friend Request Could Not be Sent. Please Try Again");
    }
};
