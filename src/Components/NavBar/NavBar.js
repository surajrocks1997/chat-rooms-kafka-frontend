import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../Actions/auth";

const NavBar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to="/chatRooms">Chat Rooms</Link>
            </li>
            <li>
                <Link to="/insights">Insights</Link>
            </li>
            <li>
                <Link to={`/profile/me`}>Profile</Link>
            </li>
            <li>
                <Link to="/" onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>{" "}
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
                            <i className=""></i>Open Chat Rooms
                        </Link>
                    </p>
                    {!loading && authLinks}
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
});

export default connect(mapStateToProps, { logout })(NavBar);
