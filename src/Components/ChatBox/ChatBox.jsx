import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ChatBox = ({
    chatRooms: { messages },
    auth: {
        user: { email },
    },
}) => {
    const navigate = useNavigate();

    const openProfile = (id) => {
        navigate(`/profile/${id}`);
    };

    return (
        <div className="chat-page">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className="text-appearance"
                    style={{
                        display: "flex",
                        flexDirection:
                            email === message.username ? "row-reverse" : "row",
                    }}
                >
                    <div className="user-image">
                        <img
                            src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                            alt="user image"
                            style={{
                                width: "40px",
                                display: "block",
                                borderRadius: "20px",
                                margin: "0 7px",
                            }}
                        ></img>
                    </div>
                    <div
                        className="chat-message"
                        key={message.timestamp}
                        style={{
                            backgroundColor:
                                email === message.username
                                    ? "rgb(248, 239, 220)"
                                    : "white",
                        }}
                    >
                        <div className="chat-message-header">
                            <p
                                className="username"
                                onClick={() => openProfile(message.userId)}
                            >
                                {message.username}
                            </p>
                            <p className="message">{message.message}</p>
                        </div>
                        <p className="timestamp">{message.timestamp}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

ChatBox.propTypes = {
    activeChatRoom: PropTypes.string,
    chatRoomDetails: PropTypes.object,
};

const mapStateToProps = (state) => ({
    chatRooms: state.chatRooms,
    auth: state.auth,
});

export default connect(mapStateToProps, {})(ChatBox);
