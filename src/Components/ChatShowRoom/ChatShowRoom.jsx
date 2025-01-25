import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveChatRoom } from "../../Actions/chat-rooms";
import "./ChatShowRoom.css";
import { useEffect } from "react";
import InitConnectionManager from "../../config/InitConnectionManager";
import { fetchSSEData } from "../../Actions/insights";
import { userSocialDetailRes } from "../../Actions/social";

const ChatShowRoom = ({
    setActiveChatRoom,
    fetchSSEData,
    userSocialDetailRes,
    auth: { user },
}) => {
    const navigate = useNavigate();
    const chatRoomTopics = [
        "Sports",
        "Technology",
        "Science",
        "Automobile",
        "Gadgets",
        "News",
        "Random",
    ];

    useEffect(() => {
        let stompClient = InitConnectionManager.getWSService();
        if (stompClient == null) {
            InitConnectionManager.createWSService();
        }

        let sseClient = InitConnectionManager.getSSEService();
        if (sseClient == null) {
            InitConnectionManager.createSSEService();
            const sseData = InitConnectionManager.getSSEData();
            fetchSSEData(sseData);
        }

        if (user !== null) {
            userSocialDetailRes(user.id);
        }
    }, [user]);
    return (
        <div className="chat-show-room">
            <p>Select a Chat Room Topic you wish to chat on.</p>
            <div className="grid-container">
                {chatRoomTopics.map((topic, index) => (
                    <div
                        className="grid-item"
                        key={index}
                        onClick={(e) => {
                            setActiveChatRoom(topic);
                            navigate(`/chatRooms/${topic}`, {
                                state: { topicName: topic },
                            });
                        }}
                    >
                        {topic}
                    </div>
                ))}
            </div>
        </div>
    );
};

ChatShowRoom.propTypes = {
    setActiveChatRoom: PropTypes.func,
    fetchSSEData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    setActiveChatRoom,
    fetchSSEData,
    userSocialDetailRes,
})(ChatShowRoom);
