import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./ChatBox.css";
import {
    addMessage,
    clearActiveChatRoomState,
    setRequiredChatState,
} from "../../Actions/chat-rooms";
import ChatBox from "./ChatBox";
import Spinner from "../Spinner/Spinner";
import initWSManager from "../../config/initWSManager";

const ChatRoom = ({
    auth: {
        user: { name },
        loading,
    },
    addMessage,
    chatRooms: { isLoading, activeChatRoom },
    setRequiredChatState,
    clearActiveChatRoomState,
}) => {
    const [stompClient, setStompClient] = useState(null);
    const [chatText, setChatText] = useState("");

    useEffect(() => {
        let wsId = initWSManager.getWSService();
        if (wsId == null) {
            wsId = initWSManager.createWSService();
        }
        const stompClient = wsId.getStompClient();
        setStompClient(stompClient);
        setRequiredChatState(activeChatRoom);

        const onMessageRecieved = (payload) => {
            console.log("FROM ON MESSAGE RECIEVED");
            var message = JSON.parse(payload.body);
            addMessage(message);
        };

        stompClient.subscribe(
            `/topic/chatRoom.${activeChatRoom}`,
            onMessageRecieved,
            { id: activeChatRoom }
        );

        return () => {
            stompClient.unsubscribe(activeChatRoom);
            clearActiveChatRoomState();
        };
    }, []);

    const sendMessage = () => {
        stompClient.send(
            `/app/chatRoom/${activeChatRoom}`,
            {},
            JSON.stringify({
                username: name,
                message: chatText,
                chatRoomName: activeChatRoom,
            })
        );
        setChatText("");
    };

    return loading ? (
        <Spinner />
    ) : (
        <div className="parent-chat">
            <div className="room-list">
                <h1>{activeChatRoom}</h1>
                <hr />
            </div>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className="chat-box chat-container">
                    <ChatBox />
                    <div className="input-container">
                        <input
                            type="text"
                            value={chatText}
                            onChange={(e) => setChatText(e.target.value)}
                            placeholder="Please Type Some Message here!!"
                            size="50"
                        />
                        <input
                            type="button"
                            value="Send"
                            onClick={sendMessage}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

ChatRoom.propTypes = {
    name: PropTypes.string,
    addMessage: PropTypes.func,
    setRequiredChatState: PropTypes.func,
    clearActiveChatRoomState: PropTypes.func,
};

const mapStateToProps = (state) => ({
    chatRooms: state.chatRooms,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    addMessage,
    setRequiredChatState,
    clearActiveChatRoomState,
})(ChatRoom);
