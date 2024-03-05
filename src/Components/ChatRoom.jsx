import { useEffect, useState } from "react";
import webSocketService from "../class/WebSocketService";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { MESSAGE } from "../Actions/types";

const ChatRoom = ({ userInfo: { username } }) => {
    const [stompClient, setStompClient] = useState(null);
    const dispatch = useDispatch();
    const [chatText, setChatText] = useState("");

    useEffect(() => {
        const stompClient = webSocketService.getStompClient();
        setStompClient(stompClient);
    }, []);

    const onMessageRecieved = (payload) => {
        console.log("FROM ON MESSAGE RECIEVED");
        var message = JSON.parse(payload.body);
        dispatch({
            type: MESSAGE,
            payload: message,
        });
    };

    const subscribeChatRoom = () => {
        stompClient.subscribe("/topic/chat-room-1", onMessageRecieved);
    };

    const sendMessage = () => {
        stompClient.send(
            "/app/chatRoom/chat-room-1",
            {},
            JSON.stringify({
                username,
                message: chatText,
                details: {
                    chatRoomName: "chat-room-1",
                },
            })
        );
        setChatText("");
    };

    return (
        <div>
            <h1>Chat Room</h1>
            <input
                type="button"
                value="SUBSCRIBE"
                onClick={subscribeChatRoom}
            />
            <hr />
            <input
                type="text"
                value={chatText}
                onChange={(e) => setChatText(e.target.value)}
                placeholder="Please Type Some Message here!!"
                size="50"
            />
            <input type="button" value="Send" onClick={sendMessage} />
        </div>
    );
};

ChatRoom.propTypes = {
    username: PropTypes.string,
};

const mapStateToProps = (state) => ({
    userInfo: state.userInfo,
});

export default connect(mapStateToProps, {})(ChatRoom);
