import { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useNavigate, useParams } from "react-router-dom";
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
import InitConnectionManager from "../../config/InitConnectionManager";
import { CHAT_MESSAGE, USER_OFFLINE, USER_ONLINE } from "../../Actions/types";
import OnlineGreeDot from "../OnlineGreenDot/OnlineGreenDot";

const ChatRoom = ({
    auth: { user, loading },
    insights: { perChatRoomData },
    addMessage,
    addUserToOnline,
    removeUserFromOnline,
    chatRooms: { isLoading, online },
    clearActiveChatRoomState,
}) => {
    const [stompClient, setStompClient] = useState(null);
    const [chatText, setChatText] = useState("");
    const { chatRoom } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        let wsId = InitConnectionManager.getWSService();
        if (wsId == null) {
            wsId = InitConnectionManager.createWSService();
        }
        const stompClient = wsId.getStompClient();

        if (chatRoom === null || user === null || !stompClient) {
            navigate("/chatRooms");
        }

        const onMessageRecieved = (payload) => {
            console.log("FROM ON MESSAGE RECIEVED");
            var message = JSON.parse(payload.body);
            if (message.messageType === CHAT_MESSAGE) {
                addMessage(message);
            } else if (message.messageType === USER_ONLINE) {
                addUserToOnline(message.additionalData);
            } else if (message.messageType === USER_OFFLINE) {
                removeUserFromOnline(message.additionalData);
            } 
            else {
                /////////////////////////////////////////////////////////
                if (message.messageType === "PRIVATE_MESSAGE") {
                    console.log("From PRIVATE MESSAGE");
                } 
                /////////////////////////////////////////////////////////
                else {
                    console.warn(message);
                }
            }
        };

        if (stompClient && stompClient.connected) {
            setStompClient(stompClient);
            stompClient.subscribe(
                `/topic/chatRoom.${chatRoom}`,
                onMessageRecieved,
                { id: chatRoom }
            );
            /////////////////////////////////////////////////////////
            stompClient.subscribe(
                `/user/${user.email}/queue/messages`,
                onMessageRecieved,
                {}
            );
            /////////////////////////////////////////////////////////

            stompClient.send(
                `/app/chatRoom/${chatRoom}`,
                {},
                JSON.stringify({
                    messageType: USER_ONLINE,
                    username: user.email,
                    chatRoomName: chatRoom,
                })
            );
        } else {
            console.log("Websocket Connection hasn't been established yet");
        }

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.send(
                    `/app/chatRoom/${chatRoom}`,
                    {},
                    JSON.stringify({
                        messageType: USER_OFFLINE,
                        username: user.email,
                        chatRoomName: chatRoom,
                    })
                );
                stompClient.unsubscribe(chatRoom);
            }

            clearActiveChatRoomState();
        };
    }, []);

    const sendMessage = () => {
        if (chatText === "") return;
        stompClient.send(
            `/app/chatRoom/${chatRoom}`,
            {},
            JSON.stringify({
                messageType: CHAT_MESSAGE,
                username: user.email,
                chatRoomName: chatRoom,
                message: chatText,
            })
        );

        /////////////////////////////////////////////////////////
        stompClient.send(
            `/app/privateMessage/jdoe@email.com`,
            {},
            JSON.stringify({
                messageType: "PRIVATE_MESSAGE",
                username: user.email,
                receiver: "jdoe@email.com",
                message: chatText,
            })
        );
        /////////////////////////////////////////////////////////

        setChatText("");
    };

    return loading ? (
        <Spinner />
    ) : (
        <div className="parent-chat">
            <div className="left-container">
                <div className="room-list">
                    <p>Online</p>
                    {online.map((user, index) => (
                        <div className="online-presence" key={index}>
                            <OnlineGreeDot />
                            <p>{user}</p>
                        </div>
                    ))}
                </div>
                <div className="room-insight">
                    <p>Total Online: {online.length}</p>
                    <p>
                        Total Messages:{" "}
                        {perChatRoomData.find(
                            (room) => room.chatRoomName === chatRoom
                        )
                            ? perChatRoomData.find(
                                  (room) => room.chatRoomName === chatRoom
                              ).count
                            : 0}
                    </p>
                </div>
            </div>

            {loading && isLoading ? (
                <Spinner />
            ) : (
                <div className="chat-box chat-container">
                    <div className="chat-container-header">
                        <p>{chatRoom}</p>
                    </div>

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
                            className="btn-primary"
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
    perChatRoomData: PropTypes.array,
    user: PropTypes.object,
};

const mapStateToProps = (state) => ({
    chatRooms: state.chatRooms,
    auth: state.auth,
    insights: state.insights,
});

export default connect(mapStateToProps, {
    addMessage,
    clearActiveChatRoomState,
    addUserToOnline,
    removeUserFromOnline,
})(ChatRoom);
