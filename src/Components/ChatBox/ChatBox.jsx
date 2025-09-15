import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import { RECEIPT_SENT_LOCAL } from "../../Actions/types";

const ChatBox = ({
    chatRooms: { messages, isLoading },
    auth: {
        user: { username },
    },
}) => {
    const navigate = useNavigate();

    const openProfile = (id) => {
        navigate(`/profile/${id}`);
    };

    return isLoading ? (
        <div className="chat-spinner">
            <Spinner />
        </div>
    ) : (
        <div className="chat-page">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className="text-appearance"
                    style={{
                        display: "flex",
                        flexDirection:
                            username === message.username
                                ? "row-reverse"
                                : "row",
                    }}
                >
                    <div className="user-image">
                        <img
                            src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                            alt="user"
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
                                username === message.username
                                    ? "rgb(248, 239, 220)"
                                    : "white",
                        }}
                    >
                        <div className="chat-message-header">
                            <p
                                className="username"
                                onClick={() => openProfile(message.username)}
                            >
                                {message.username}
                            </p>
                            <p className="message">{message.message}</p>
                        </div>
                        <div className="message-insight">
                            <div className="receipt">
                                {message.state === RECEIPT_SENT_LOCAL ? (
                                    <i
                                        className="{fa-solid fa-check}"
                                        style={{ color: "black" }}
                                    ></i>
                                ) : (
                                    <i
                                        className="fa-solid fa-check-double"
                                        style={{ color: "green" }}
                                    ></i>
                                )}
                                {/* <i class="fa-regular fa-clock fa-xs" style={{color: "black"}}></i> */}

                                {/* <i className="fa-solid fa-check-double" style={{color: "black"}}></i> */}
                            </div>
                            <div className="timestamp">{message.timestamp}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

ChatBox.propTypes = {
    activeChatRoom: PropTypes.string,
    chatRoomDetails: PropTypes.object,
    isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    chatRooms: state.chatRooms,
    auth: state.auth,
});

export default connect(mapStateToProps, {})(ChatBox);
