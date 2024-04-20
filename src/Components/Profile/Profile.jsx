import { connect } from "react-redux";
import "./Profile.css";
import PropTypes from "prop-types";
import Spinner from "../Spinner/Spinner";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchUserData } from "../../Actions/profile";

const Profile = ({
    auth: { user },
    socialInfo: { isLoading, visitedProfile: vprofile },
    fetchUserData,
}) => {
    const { profileId } = useParams();
    console.log(profileId);

    useEffect(() => {
        if (profileId !== "me") {
            fetchUserData(profileId);
        } else fetchUserData(user.id);
    }, [fetchUserData]);

    return isLoading ? (
        <Spinner />
    ) : (
        <div className="profile-page">
            <div className="header">
                <div className="header-info">
                    <div className="profile-photo">
                        <img
                            src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                            alt="user"
                            style={{
                                width: "150px",
                                display: "block",
                                // borderRadius: "20px",
                                margin: "0 7px",
                            }}
                        ></img>
                    </div>
                    <div className="profile-name">
                        <p>{vprofile.name}</p>
                    </div>
                </div>
                {vprofile.id !== user.id && (
                    <div className="header-section">
                        <button className="btn btn-primary">
                            Send Friend Request
                        </button>
                    </div>
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
    fetchUserData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    socialInfo: state.socialInfo,
});

export default connect(mapStateToProps, { fetchUserData })(Profile);
