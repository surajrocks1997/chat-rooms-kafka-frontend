import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp, login } from "../../Actions/auth";
import "./WelcomePage.css";
import { generateToastifyError } from "../../Actions/toastify";
import { useGoogleLogin } from "@react-oauth/google";

const WelcomePage = ({ signUp, login, auth: { isAuthenticated, loading } }) => {
    const navigate = useNavigate();

    const [activeForm, setActiveForm] = useState(0);

    const [loginformData, setLoginFormData] = useState({
        loginEmail: "",
        loginPassword: "",
    });

    const [signupFormData, setSignupFormData] = useState({
        fullName: "",
        signUpEmail: "",
        signUpPassword: "",
        signUpConfirmPassword: "",
    });

    const { loginEmail, loginPassword } = loginformData;
    const { fullName, signUpEmail, signUpPassword, signUpConfirmPassword } =
        signupFormData;

    const onChangeLogin = (e) => {
        setLoginFormData({
            ...loginformData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        login({ loginEmail, loginPassword });
    };

    const onChangeSignUp = (e) => {
        setSignupFormData({
            ...signupFormData,
            [e.target.name]: e.target.value,
        });
    };

    const onSubmitSignUp = (e) => {
        e.preventDefault();
        if (signUpPassword !== signUpConfirmPassword) {
            generateToastifyError("Passwords do not match!");
        } else {
            signUp({ fullName, signUpEmail, signUpPassword });
        }
    };

    const initiateGoogleLogin = useGoogleLogin({
        onSuccess: (successResponse) => console.log(successResponse),
        onError: (errorResponse) => console.log(errorResponse),
        flow: "auth-code",
        ux_mode: "popup",
    });

    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate("/chatRooms");
        }
    });

    return (
        <section className="landing">
            <div className="welcome-page">
                <div className="background"></div>
                <div className="content">
                    <div className="title">Welcome</div>
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
                                            type="text"
                                            placeholder="Full Name"
                                            name="fullName"
                                            value={fullName}
                                            onChange={(e) => onChangeSignUp(e)}
                                            required
                                        />
                                    </div>
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
                        ></input>

                        <div className="external-logins">
                            <p>or you can sign in with:</p>
                            <i
                                className="fa-brands fa-google fa-lg"
                                onClick={() => initiateGoogleLogin()}
                            ></i>
                            <i className="fa-brands fa-facebook-f fa-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

WelcomePage.propTypes = {
    signUp: PropTypes.func,
    login: PropTypes.func,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {
    signUp,
    login,
})(WelcomePage);
