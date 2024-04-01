import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setActiveChatRoom } from "../../Actions/chat-rooms";
import "./ChatShowRoom.css";
import { useEffect } from "react";
import initWSManager from "../../config/initWSManager";

const ChatShowRoom = ({ setActiveChatRoom }) => {
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
        let stompClient = initWSManager.getWSService();
        if (stompClient == null) {
            initWSManager.createWSService();
        }
    })
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

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, { setActiveChatRoom })(ChatShowRoom);
