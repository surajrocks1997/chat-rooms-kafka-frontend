import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./ChatBox.css";
import {
    addMessage,
    addUserToOnline,
    removeUserFromOnline,
    clearActiveChatRoomState,
    setRequiredChatState,
} from "../../Actions/chat-rooms";
import ChatBox from "./ChatBox";
import Spinner from "../Spinner/Spinner";
import initWSManager from "../../config/initWSManager";
import { CHAT_MESSAGE, USER_OFFLINE, USER_ONLINE } from "../../Actions/types";

const ChatRoom = ({
    auth: {
        user: { id, name, email },
        loading,
    },
    addMessage,
    addUserToOnline,
    removeUserFromOnline,
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
            if (message.messageType === CHAT_MESSAGE) {
                addMessage(message);
            } else if (message.messageType === USER_ONLINE) {
                addUserToOnline(message.additionalData);
            } else if (message.messageType === USER_OFFLINE) {
                removeUserFromOnline(message.additionalData);
            } else {
                console.warn(message);
            }
        };

        stompClient.subscribe(
            `/topic/chatRoom.${activeChatRoom}`,
            onMessageRecieved,
            { id: activeChatRoom }
        );

        stompClient.send(
            `/app/chatRoom/${activeChatRoom}`,
            {},
            JSON.stringify({
                messageType: USER_ONLINE,
                username: email,
                chatRoomName: activeChatRoom,
            })
        );

        return () => {
            stompClient.send(
                `/app/chatRoom/${activeChatRoom}`,
                {},
                JSON.stringify({
                    messageType: USER_OFFLINE,
                    username: email,
                    chatRoomName: activeChatRoom,
                })
            );
            stompClient.unsubscribe(activeChatRoom);
            clearActiveChatRoomState();
        };
    }, []);

    const sendMessage = () => {
        stompClient.send(
            `/app/chatRoom/${activeChatRoom}`,
            {},
            JSON.stringify({
                messageType: CHAT_MESSAGE,
                username: email,
                chatRoomName: activeChatRoom,
                message: chatText,
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
    addUserToOnline: PropTypes.func.isRequired,
    removeUserFromOnline: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    chatRooms: state.chatRooms,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    addMessage,
    setRequiredChatState,
    clearActiveChatRoomState,
    addUserToOnline,
    removeUserFromOnline,
})(ChatRoom);
