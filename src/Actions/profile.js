import axios from "axios";
import { SPRING_SERVER_URL } from "../config/uri";
import {
    FRIENDS,
    GET_SOCIAL_INFO,
    POPULATE_VISITED_PROFILE,
    SET_SOCIAL_LOADING,
} from "./types";

export const visitedUserData = (userId) => async (dispatch) => {
    var visitedProfile = await axios.get(`${SPRING_SERVER_URL}/user/${userId}`);

    dispatch({
        type: POPULATE_VISITED_PROFILE,
        payload: visitedProfile.data,
    });

    await dispatch(getSocialSummary());

    dispatch(setSocialInfoIsLoading(false));
};

export const getSocialSummary = () => async (dispatch) => {
    var socialSummary = await axios.get(`${SPRING_SERVER_URL}/social/summary`);

    dispatch({
        type: GET_SOCIAL_INFO,
        payload: socialSummary.data,
    });
};

export const setSocialInfoIsLoading = (isLoading) => (dispatch) => {
    dispatch({
        type: SET_SOCIAL_LOADING,
        payload: isLoading,
    });
};

export const acceptFriendRequest = (id) => async (dispatch) => {
    await axios.post(`${SPRING_SERVER_URL}/social/friendship/accept/${id}`);

    dispatch({
        type: FRIENDS,
        payload: id,
    });
};
