import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { setUserName } from "../Actions/userData";
import { useNavigate } from "react-router-dom";

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
        <div>
            <div className="title">WELCOME TO CHAT ROOMS</div>
            <br />
            <div className="user">
                Enter Your Name: <br />
                <input
                    type="text"
                    name="username"
                    value={name}
                    onChange={(e) => updateName(e)}
                />
                <input type="button" value="Submit" onClick={submit}></input>
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
