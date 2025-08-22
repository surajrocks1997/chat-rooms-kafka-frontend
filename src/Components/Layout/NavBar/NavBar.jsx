import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./NavBar.css";
import { useState } from "react";
import { logout } from "../../../Actions/auth";
import { useWebSocket } from "../../../config/WebSocketProvider";

const NavBar = ({
    auth: { isAuthenticated, loading, user },
    logout,
    socialInfo: { frPending },
}) => {
    const [activeDropdown, setActiveDropDown] = useState(null);
    const navigate = useNavigate();
    const { stompClient } = useWebSocket();

    const toggleDropdown = (dropDownName) => {
        setActiveDropDown((prev) =>
            prev === dropDownName ? null : dropDownName
        );
    };

    const handleLogout = () => {
        if (stompClient && stompClient.connected) {
            stompClient.disconnect(() => {
                console.log("Websocket Disconnected on Logout");
            });
        }
        logout();
    };

    const FriendRequestsDropdown = () => (
        <div className="dropdown-content">
            {frPending.length > 0 ? (
                frPending.map((item) => (
                    <div className="frdd" key={item.email}>
                        <div className="profile-photo">
                            <img
                                src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                                alt="user"
                                style={{ width: "40px", display: "block" }}
                            />
                        </div>
                        <div className="name">{item.name}</div>
                        <div className="fr-action">
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    toggleDropdown(null);
                                    navigate(`/profile/${item.id}`);
                                }}
                            >
                                <i className="fa-regular fa-user"></i>
                            </button>
                            <button className="btn btn-success">
                                <i className="fa-solid fa-check"></i>
                            </button>
                            <button className="btn btn-danger">
                                <i className="fa-solid fa-x"></i>
                            </button>
                        </div>
                    </div>
                ))
            ) : (
                <div>No pending friend requests.</div>
            )}
        </div>
    );

    const authLinks = (
        <ul>
            <li>
                <div
                    onClick={() => toggleDropdown("friendRequests")}
                    className="dropdown-trigger"
                >
                    <Link>
                        <i
                            className="fa-solid fa-user"
                            style={{ color: "#ffffff" }}
                        ></i>
                    </Link>
                    {frPending.length > 0 && (
                        <span className="button__badge">
                            {frPending.length}
                        </span>
                    )}
                </div>
                {activeDropdown === "friendRequests" && (
                    <FriendRequestsDropdown />
                )}
            </li>
            <li>
                <div
                    onClick={() => toggleDropdown("messages")}
                    className="dropdown-trigger"
                >
                    <Link>
                        <i
                            className="fa-regular fa-message"
                            style={{ color: "#ffffff" }}
                        ></i>
                    </Link>
                </div>
                {activeDropdown === "messages" && (
                    <div className="dropdown-content">
                        <div className="container">
                            <div className="banner">No New Messages</div>
                            <button className="btn btn-primary">
                                Jump To Chat Page
                            </button>
                        </div>
                    </div>
                )}
            </li>
            <li>
                <Link to="/insights">Insights</Link>
            </li>
            <li>
                <Link to={`/profile/${user.username}`}>
                    <i className="fa-solid fa-id-badge"></i>{" "}
                    <span>Profile</span>
                </Link>
            </li>
            <li>
                <Link to="/" onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span className="hide-sm">Logout</span>
                </Link>
            </li>
        </ul>
    );

    return (
        !loading &&
        isAuthenticated && (
            <div className="navbar">
                <p>
                    <Link to="/chatRooms">
                        Welcome
                        {user ? (
                            `, ${user.firstName}`
                        ) : (
                            <i className="fa-solid fa-spinner fa-spin"></i>
                        )}
                    </Link>
                </p>
                {authLinks}
            </div>
        )
    );
};

NavBar.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    logout: PropTypes.func,
    user: PropTypes.object,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    socialInfo: state.socialInfo,
});

export default connect(mapStateToProps, { logout })(NavBar);
