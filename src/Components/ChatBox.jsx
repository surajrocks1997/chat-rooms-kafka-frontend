import { connect } from "react-redux";
import PropTypes from "prop-types";

const ChatBox = ({ chatRooms: { activeChatRoom, messages } }) => {

    return (
        <div className="chat-page">
            {messages.map((message) => (
                <div key={message.timestamp}>
                    <h3>{message.username}</h3>
                    <p>{message.message}</p>
                    <p>{message.timestamp}</p>
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
