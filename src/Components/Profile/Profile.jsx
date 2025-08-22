import { connect } from "react-redux";
import "./Profile.css";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserData } from "../../Actions/profile";
import { sendFriendRequest, userSocialDetailRes } from "../../Actions/social";

const Profile = ({
    auth: { user },
    socialInfo: { isLoading, visitedProfile: vprofile, frSent, frPending },
    fetchUserData,
    sendFriendRequest,
    userSocialDetailRes,
}) => {
    const { profileId } = useParams();

    useEffect(() => {
        if (user !== null) {
            fetchUserData(profileId);
            // userSocialDetailRes(user.id);
        }
    }, [profileId, user]);

    const sendFR = () => {
        sendFriendRequest(profileId);
    };

    return isLoading || user === null ? (
        <Spinner />
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
                {frPending.some((ele) => ele.id === Number(vprofile.id)) ? (
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
                                className={
                                    frSent.includes(profileId)
                                        ? "btn btn-light"
                                        : "btn btn-primary"
                                }
                                onClick={sendFR}
                            >
                                {frSent.includes(profileId) ? (
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
    fetchUserData: PropTypes.func.isRequired,
    sendFriendRequest: PropTypes.func.isRequired,
    userSocialDetailRes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    socialInfo: state.socialInfo,
});

export default connect(mapStateToProps, {
    fetchUserData,
    sendFriendRequest,
    userSocialDetailRes,
})(Profile);
