import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../../Actions/auth";
import "./NavBar.css";
import { useEffect, useState } from "react";

const NavBar = ({
    auth: { isAuthenticated, loading, user },
    logout,
    socialInfo: { frPending },
}) => {
    const [fRDD, setFRDD] = useState(false);
    const [mDD, setMDD] = useState(false);
    const [nDD, setNDD] = useState(false);

    const navigate = useNavigate();

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

    const fRDDActions = (e, position, id) => {
        e.preventDefault();
        setDDTrue(position);
        navigate(`/profile/${id}`);
    };

    const authLinks = () => (
        <ul>
            <li>
                <Link onClick={() => setDDTrue(0)} style={{
                    border: "2px solid red"
                }}>
                    <i
                        className="fa-regular fa-user"
                    ></i>
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
                        {fRDD && frPending.length > 0 && (
                            <div>
                                {frPending.map((item, index) => (
                                    <div className="frdd" key={item.email}>
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
                                        <div className="name">{item.name}</div>
                                        <div className="fr-action">
                                            <button
                                                className="btn btn-primary"
                                                onClick={(e) => {
                                                    fRDDActions(e, 0, item.id);
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
                                ))}
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
                    ></i>
                    <span className={0 ? "button__badge" : "no_badge"}>
                        {0 ? frPending.length : ""}
                    </span>
                    <div
                        className={
                            mDD === true ? "dropdown dropdown-content" : ""
                        }
                    >
                        {mDD && (
                            <div className="container">
                                <div className="banner">No New Messages</div>
                                <button className="btn btn-primary">
                                    Jump To Chat Page
                                </button>
                            </div>
                        )}
                    </div>
                </Link>
            </li>
            {/* <li>
                <Link>
                    <i
                        className="fa-solid fa-earth-americas"
                        onClick={() => setDDTrue(2)}
                    ></i>
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
            </li> */}

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
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <span className="hide-sm"> Logout</span>
                </Link>
            </li>
        </ul>
    );

    return (
        <div className="navbar">
            {!loading && isAuthenticated && (
                <>
                    <p>
                        <Link to="/chatRooms">
                            <i className=""></i>Welcome
                            {user === null ? (
                                <i class="fa-solid fa-spinner fa-spin"></i>
                            ) : (
                                ", " + user.name
                            )}
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
