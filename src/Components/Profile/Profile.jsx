import { connect } from "react-redux";
import "./Profile.css";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { visitedUserData } from "../../Actions/profile";
import { sendFriendRequest, userSocialDetailRes } from "../../Actions/social";
import {
    FRIEND_REQUEST_RECEIVED,
    FRIEND_REQUEST_SENT,
} from "../../Actions/types";

const Profile = ({
    auth: { user },
    socialInfo: {
        isLoading,
        visitedProfile: vprofile,
        frSent,
        frPending,
        relationshipMap,
    },
    visitedUserData,
    sendFriendRequest,
    userSocialDetailRes,
}) => {
    const { profileId } = useParams();

    useEffect(() => {
        if (user !== null) {
            visitedUserData(profileId);
            // userSocialDetailRes(user.id);
        }
    }, [profileId, user]);

    const sendFR = () => {
        sendFriendRequest(vprofile.id);
    };

    return isLoading || user === null ? (
        <div
            className="home-spinner"
            style={{
                height: "calc(100vh - var(--navBar-height))",
            }}
        >
            <Spinner />
        </div>
    ) : (
        <div className="profile-page">
            <div className="header">
                <div className="header-info">
                    <div className="profile-photo">
                        <img
                            src={
                                vprofile.profilePictureUrl !== null
                                    ? vprofile.profilePictureUrl
                                    : "https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                            }
                            alt="User Profile"
                            style={{
                                width: "150px",
                                display: "block",
                                borderRadius: "50%",
                                margin: "0 7px",
                            }}
                        ></img>
                    </div>
                    <div className="profile-name">
                        <p>{vprofile.firstName + " " + vprofile.lastName} </p>
                    </div>
                </div>
                {user.id !== vprofile.id && relationshipMap[vprofile.id]["status"] ===
                FRIEND_REQUEST_RECEIVED ? (
                    <div className="header-section">
                        <button
                            className="btn btn-success"
                            // onClick={}
                        >
                            Accept
                        </button>
                        <button
                            className="btn btn-danger"
                            // onClick={}
                        >
                            Reject
                        </button>
                    </div>
                ) : (
                    vprofile.id !== user.id && (
                        <div className="header-section">
                            <button
                                disabled={
                                    relationshipMap[vprofile.id]["status"] ===
                                    FRIEND_REQUEST_SENT
                                }
                                className={
                                    relationshipMap[vprofile.id] !== undefined
                                        ? "btn btn-light"
                                        : "btn btn-primary"
                                }
                                onClick={sendFR}
                            >
                                {relationshipMap[vprofile.id]["status"] ===
                                FRIEND_REQUEST_SENT ? (
                                    <>
                                        <span>Friend Request Sent </span>
                                        <i className="fa-solid fa-check"></i>
                                    </>
                                ) : (
                                    "Send Friend Request"
                                )}
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

Profile.propTypes = {
    user: PropTypes.object,
    loading: PropTypes.bool,
    isLoading: PropTypes.bool,
    visitedProfile: PropTypes.object,
    visitedUserData: PropTypes.func.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    userSocialDetailRes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    socialInfo: state.socialInfo,
});

export default connect(mapStateToProps, {
    visitedUserData,
    sendFriendRequest,
    userSocialDetailRes,
})(Profile);
