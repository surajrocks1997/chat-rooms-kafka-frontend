import { connect } from "react-redux";
import "./Profile.css";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
    acceptFriendRequest,
    setSocialInfoIsLoading,
    visitedUserData,
} from "../../Actions/profile";
import { sendFriendRequest, userSocialDetailRes } from "../../Actions/social";
import {
    FRIEND_REQUEST_RECEIVED,
    FRIEND_REQUEST_SENT,
    FRIENDS,
} from "../../Actions/types";

const Profile = ({
    auth: { user },
    socialInfo: { isLoading, visitedProfile: vprofile, relationshipMap },
    visitedUserData,
    sendFriendRequest,
    acceptFriendRequest,
}) => {
    const { profileId } = useParams();

    useEffect(() => {
        setSocialInfoIsLoading(true);
        if (user == null) {
        }

        visitedUserData(profileId);
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
                                vprofile.avatar !== null
                                    ? vprofile.avatar
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
                {(() => {
                    if (user.id !== vprofile.id) {
                        if (relationshipMap["FRIENDS"]?.includes(vprofile.id)) {
                            return (
                                <div className="right-header-section">
                                    <div className="friends-btn">
                                        <button
                                            disabled
                                            className="btn btn-success"
                                        >
                                            Friends
                                        </button>
                                    </div>
                                    <div className="message-btn">
                                        <button disabled className="btn btn-light">
                                            Message
                                        </button>
                                    </div>
                                </div>
                            );
                        } else if (
                            relationshipMap["SentFRs"]?.includes(vprofile.id)
                        ) {
                            return (
                                <div className="header-section">
                                    <button disabled className="btn btn-light">
                                        Friend Request Sent
                                    </button>
                                </div>
                            );
                        } else if (
                            relationshipMap["PendingFRs"]?.includes(vprofile.id)
                        ) {
                            return (
                                <div className="header-section">
                                    <button
                                        className="btn btn-success"
                                        onClick={() =>
                                            acceptFriendRequest(vprofile.id)
                                        }
                                    >
                                        Accept
                                    </button>
                                    <button className="btn btn-danger">
                                        Reject
                                    </button>
                                </div>
                            );
                        } else
                            return (
                                <div className="header-section">
                                    <button
                                        className="btn btn-primary"
                                        onClick={sendFR}
                                    >
                                        Send Friend Request
                                    </button>
                                </div>
                            );
                    }
                })()}
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
    acceptFriendRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    socialInfo: state.socialInfo,
});

export default connect(mapStateToProps, {
    visitedUserData,
    sendFriendRequest,
    userSocialDetailRes,
    acceptFriendRequest,
})(Profile);
