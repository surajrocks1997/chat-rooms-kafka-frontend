import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { setUserName } from "../Actions/userData";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = ({ setUserName }) => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const updateName = (e) => {
        setName(e.target.value.toUpperCase());
    };

    const submit = () => {
        if (!name || name === "") return;
        setUserName(name);
        navigate("/chatRooms");
    };

    return (
        <div className="welcome-page">
            <div className="background"></div>
            <div className="content">
                <div className="title">Welcome to Chat Rooms!!</div>
                <br />
                <div className="user">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={name}
                        onChange={(e) => updateName(e)}
                    />
                    <input
                        type="button"
                        value="Submit"
                        onClick={submit}
                    ></input>
                </div>
            </div>
        </div>
    );
};

WelcomePage.propTypes = {
    setUserName: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, { setUserName })(WelcomePage);
