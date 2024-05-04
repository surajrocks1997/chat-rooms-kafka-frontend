import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../Actions/auth";
import "./NavBar.css";
import { useEffect } from "react";

const NavBar = ({
    auth: { isAuthenticated, loading, user },
    logout,
    socialInfo: { frPending },
}) => {
    const authLinks = () => (
        <ul>
            <li>
                <Link to="/#">
                    <i className="fa-regular fa-user"></i>{" "}
                    <span
                        className={
                            frPending.length > 0 ? "button__badge" : "no_badge"
                        }
                    >
                        {frPending.length > 0 ? frPending.length : ""}
                    </span>
                </Link>
            </li>
            <li>
                <Link to="/#">
                    <i className="fa-regular fa-message"></i>{" "}
                    <span
                        className={
                            frPending.length > 0 ? "button__badge" : "no_badge"
                        }
                    >
                        {frPending.length > 0 ? frPending.length : ""}
                    </span>
                </Link>
            </li>
            <li>
                <Link to="/#">
                    <i className="fa-solid fa-earth-americas"></i>{" "}
                    <span
                        className={
                            frPending.length > 0 ? "button__badge" : "no_badge"
                        }
                    >
                        {frPending.length > 0 ? frPending.length : ""}
                    </span>
                </Link>
            </li>

            <li>
                <Link to="/insights">Insights</Link>
            </li>
            <li>
                <Link to={`/profile/${user.id}`}>
                    <i className="fa-solid fa-id-badge"></i>{" "}
                    <span>Profile</span>
                </Link>
            </li>
            <li>
                <Link to="/" onClick={logout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>{" "}
                    <span className="hide-sm"> Logout</span>
                </Link>
            </li>
        </ul>
    );

    return (
        <div className="navbar">
            {isAuthenticated && (
                <>
                    <p>
                        <Link to="/chatRooms">
                            <i className=""></i>Welcome
                            {!loading && user === null ? "" : ", " + user.name}
                        </Link>
                    </p>
                    {user!== null && authLinks(user.id)}
                </>
            )}
        </div>
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
