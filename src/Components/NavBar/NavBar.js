import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../Actions/auth";
import "./NavBar.css";
import { useState } from "react";

const NavBar = ({
    auth: { isAuthenticated, loading, user },
    logout,
    socialInfo: { frPending },
}) => {
    const [fRDD, setFRDD] = useState(false);
    const [mDD, setMDD] = useState(false);
    const [nDD, setNDD] = useState(false);

    const setDDTrue = (position) => {
        switch (position) {
            case 0:
                setFRDD(fRDD === true ? false : true);
                setMDD(false);
                setNDD(false);
                break;
            case 1:
                setFRDD(false);
                setMDD(mDD === true ? false : true);
                setNDD(false);
                break;
            default:
                setFRDD(false);
                setMDD(false);
                setNDD(nDD === true ? false : true);
                break;
        }
    };

    const authLinks = () => (
        <ul>
            <li>
                <Link>
                    <i
                        className="fa-regular fa-user navbar-hover"
                        onClick={() => setDDTrue(0)}
                    ></i>{" "}
                    <span
                        className={
                            frPending.length > 0 ? "button__badge" : "no_badge"
                        }
                    >
                        {frPending.length > 0 ? frPending.length : ""}
                    </span>
                    <div
                        className={
                            fRDD === true ? "dropdown dropdown-content" : ""
                        }
                    >
                        {fRDD && (
                            <div className="container frdd">
                                <div className="profile-photo">
                                    <img
                                        src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                                        alt="user"
                                        style={{
                                            width: "40px",
                                            display: "block",
                                        }}
                                    ></img>
                                </div>
                                <div className="name">Suraj Gupta</div>
                                <div className="fr-action">
                                    <button className="btn btn-primary">Accept</button>
                                    <button className="btn btn-danger">Reject</button>
                                </div>
                            </div>
                        )}
                    </div>
                </Link>
            </li>
            <li>
                <Link>
                    <i
                        className="fa-regular fa-message"
                        onClick={() => setDDTrue(1)}
                    ></i>{" "}
                    <span
                        className={
                            frPending.length > 0 ? "button__badge" : "no_badge"
                        }
                    >
                        {frPending.length > 0 ? frPending.length : ""}
                    </span>
                    <div
                        className={
                            mDD === true ? "dropdown dropdown-content" : ""
                        }
                    >
                        {mDD && "MY DATA HERE"}
                    </div>
                </Link>
            </li>
            <li>
                <Link>
                    <i
                        className="fa-solid fa-earth-americas"
                        onClick={() => setDDTrue(2)}
                    ></i>{" "}
                    <span
                        className={
                            frPending.length > 0 ? "button__badge" : "no_badge"
                        }
                    >
                        {frPending.length > 0 ? frPending.length : ""}
                    </span>
                    <div
                        className={
                            nDD === true ? "dropdown dropdown-content" : ""
                        }
                    >
                        {nDD && "MY DATA HERE"}
                    </div>
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
                    {user !== null && authLinks(user.id)}
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
