import axios from "axios";
import { SPRING_SERVER_URL } from "../config/uri";
import { POPULATE_VISITED_PROFILE } from "./types";

export const fetchUserData = (userId) => async (dispatch) => {
    const res = await axios.get(`${SPRING_SERVER_URL}/users/${userId}`);

    dispatch({
        type: POPULATE_VISITED_PROFILE,
        payload: res.data,
    });
};
