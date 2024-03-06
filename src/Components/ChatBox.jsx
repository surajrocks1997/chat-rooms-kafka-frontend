import { connect } from "react-redux";
import PropTypes from "prop-types";

const ChatBox = ({ chatRooms: { activeChatRoom, chatRoomDetails } }) => {
    var activeChatRoomMessages =
        chatRoomDetails[activeChatRoom]?.messages || [];

    return (
        <div className="chat-page">
            <h1>Chat Box Here</h1>
            {activeChatRoomMessages.map((message) => (
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
