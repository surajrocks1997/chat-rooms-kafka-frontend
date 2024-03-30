import { connect } from "react-redux";
import PropTypes from "prop-types";

const ChatBox = ({ chatRooms: { activeChatRoom, messages } }) => {

    return (
        <div className="chat-page">
            {messages.map((message) => (
                <div className="chat-message" key={message.timestamp}>
                    <p className="username">{message.username}</p>
                    <p className="message">{message.message}</p>
                    <p className="timestamp">{message.timestamp}</p>
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
    userInfo: state.userInfo,
    chatRooms: state.chatRooms,
});

export default connect(mapStateToProps, {})(ChatBox);
