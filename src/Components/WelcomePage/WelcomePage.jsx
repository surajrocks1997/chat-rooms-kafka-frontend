import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { setUserName } from "../../Actions/userData";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./WelcomePage.css";

const WelcomePage = () => {
    const navigate = useNavigate();

    const [activeForm, setActiveForm] = useState(1);

    const [loginformData, setLoginFormData] = useState({
        loginEmail: "",
        loginPassword: "",
    });

    const [signupFormData, setSignupFormData] = useState({
        signUpEmail: "",
        signUpPassword: "",
        signUpConfirmPassword: "",
    });

    const { loginEmail, loginPassword } = loginformData;
    const { signUpEmail, signUpPassword, signUpConfirmPassword } =
        signupFormData;

    const onChangeLogin = (e) => {
        setLoginFormData({
            ...loginformData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        navigate("/chatRooms");
    };

    const onChangeSignUp = (e) => {
        setSignupFormData({
            ...signupFormData,
            [e.target.name]: e.target.value,
        });
    };

    const showToastMessage = () => {
        toast.warn("Passwords do not match!");
    };

    const onSubmitSignUp = async (e) => {
        e.preventDefault();
        if (signUpPassword !== signUpConfirmPassword) {
            showToastMessage();
        } else {
            navigate("/chatRooms");
        }
    };

    return (
        <section className="landing">
            <div className="welcome-page">
                <div className="background"></div>
                <div className="content">
                    <div className="title">Welcome to Chat Rooms!!</div>
                    <br />
                    <div className="form">
                        {activeForm === 0 && (
                            <div className="login">
                                <form
                                    className="login-form"
                                    onSubmit={(e) => onSubmitLogin(e)}
                                >
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            name="loginEmail"
                                            value={loginEmail}
                                            onChange={(e) => onChangeLogin(e)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="loginPassword"
                                            minLength="6"
                                            value={loginPassword}
                                            onChange={(e) => onChangeLogin(e)}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        className="btn btn-primary"
                                        value="Log In"
                                    />
                                </form>
                            </div>
                        )}
                        {activeForm === 1 && (
                            <div className="signup">
                                <form
                                    className="signup-form"
                                    onSubmit={(e) => onSubmitSignUp(e)}
                                >
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            placeholder="Email Address"
                                            name="signUpEmail"
                                            value={signUpEmail}
                                            onChange={(e) => onChangeSignUp(e)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            name="signUpPassword"
                                            minLength="6"
                                            value={signUpPassword}
                                            onChange={(e) => onChangeSignUp(e)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            placeholder="Confirm Password"
                                            name="signUpConfirmPassword"
                                            minLength="6"
                                            value={signUpConfirmPassword}
                                            onChange={(e) => onChangeSignUp(e)}
                                        />
                                    </div>
                                    <input
                                        type="submit"
                                        className="btn btn-primary"
                                        value="Sign Up"
                                    />
                                </form>
                            </div>
                        )}

                        <br />

                        <input
                            className="btn btn-success"
                            type="button"
                            value={
                                activeForm === 1 ? "Login Here" : "SignUp Here"
                            }
                            onClick={() =>
                                setActiveForm(activeForm === 1 ? 0 : 1)
                            }
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

WelcomePage.propTypes = {
    setUserName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, { setUserName })(WelcomePage);
