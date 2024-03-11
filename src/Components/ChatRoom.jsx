import { useEffect, useState } from "react";
import webSocketService from "../class/WebSocketService";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    addMessage,
    clearActiveChatRoomState,
    setRequiredChatState,
} from "../Actions/chat-rooms";
import ChatBox from "./ChatBox";
import Spinner from "./Spinner/Spinner";

const ChatRoom = ({
    userInfo: { username },
    addMessage,
    chatRooms: { isLoading, activeChatRoom },
    setRequiredChatState,
    clearActiveChatRoomState,
}) => {
    const [stompClient, setStompClient] = useState(null);
    const [chatText, setChatText] = useState("");

    useEffect(() => {
        const stompClient = webSocketService.getStompClient();
        setStompClient(stompClient);
        setRequiredChatState(activeChatRoom);

        const onMessageRecieved = (payload) => {
            console.log("FROM ON MESSAGE RECIEVED");
            var message = JSON.parse(payload.body);
            addMessage(message);
        };

        stompClient.subscribe(
            `/topic/chatRoom/${activeChatRoom}`,
            onMessageRecieved
        );

        return () => {
            stompClient.unsubscribe(`/topic/chatRoom/${activeChatRoom}`);
            clearActiveChatRoomState();
        };
    }, []);

    const sendMessage = () => {
        stompClient.send(
            `/app/chatRoom/${activeChatRoom}`,
            {},
            JSON.stringify({
                username,
                message: chatText,
                chatRoomName: activeChatRoom,
            })
        );
        setChatText("");
    };

    return (
        <div>
            <div className="room-list">
                <h1>{activeChatRoom} - Chat Room</h1>
                <hr />
            </div>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="chat-box">
                    <ChatBox />
                    <input
                        type="text"
                        value={chatText}
                        onChange={(e) => setChatText(e.target.value)}
                        placeholder="Please Type Some Message here!!"
                        size="50"
                    />
                    <input type="button" value="Send" onClick={sendMessage} />
                </div>
            )}
        </div>
    );
};

ChatRoom.propTypes = {
    username: PropTypes.string,
    addMessage: PropTypes.func,
    setRequiredChatState: PropTypes.func,
    clearActiveChatRoomState: PropTypes.func,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    chatRooms: state.chatRooms,
});

export default connect(mapStateToProps, {
    addMessage,
    setRequiredChatState,
    clearActiveChatRoomState,
})(ChatRoom);
