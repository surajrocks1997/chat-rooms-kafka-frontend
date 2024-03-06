import { useEffect, useState } from "react";
import webSocketService from "../class/WebSocketService";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addMessage, setSubscribedChatRooms } from "../Actions/chat-rooms";
import ChatBox from "./ChatBox";

const ChatRoom = ({
    userInfo: { username },
    addMessage,
    setSubscribedChatRooms,
    chatRooms: { subscribedChatRooms },
}) => {
    const [stompClient, setStompClient] = useState(null);
    const [chatText, setChatText] = useState("");

    useEffect(() => {
        const stompClient = webSocketService.getStompClient();
        setStompClient(stompClient);
    }, []);

    const onMessageRecieved = (payload) => {
        console.log("FROM ON MESSAGE RECIEVED");
        var message = JSON.parse(payload.body);
        addMessage(message);
    };

    const subscribeChatRoom = () => {
        subscribedChatRooms.forEach((room) =>
            stompClient.subscribe(`/topic/${room}`, onMessageRecieved)
        );
    };

    const loginAndFetchSubscribedChatRooms = () => {
        const dataFromDatabase_subscribedRooms = ["chat-room-1"];
        setSubscribedChatRooms(dataFromDatabase_subscribedRooms);
    };

    const sendMessage = () => {
        stompClient.send(
            "/app/chatRoom/chat-room-1",
            {},
            JSON.stringify({
                username,
                message: chatText,
                chatRoomName: "chat-room-1",
            })
        );
        setChatText("");
    };

    return (
        <div>
            <div className="room-list">
                <h1>Chat Room</h1>
                <input
                    type="button"
                    value="FETCH CHAT ROOMS"
                    onClick={loginAndFetchSubscribedChatRooms}
                />{" "}
                <input
                    type="button"
                    value="SUBSCRIBE"
                    onClick={subscribeChatRoom}
                />
                <hr />
            </div>
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
        </div>
    );
};

ChatRoom.propTypes = {
    username: PropTypes.string,
    addMessage: PropTypes.func,
    setSubscribedChatRooms: PropTypes.func,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
    chatRooms: state.chatRooms,
});

export default connect(mapStateToProps, { addMessage, setSubscribedChatRooms })(
    ChatRoom
);
