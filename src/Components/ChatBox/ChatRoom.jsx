import { useEffect, useRef, useState } from "react";
import { connect, useDispatch } from "react-redux";
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
import {
    CHAT_MESSAGE,
    USER_OFFLINE,
    USER_ONLINE,
    PRIVATE_MESSAGE,
} from "../../Actions/types";
import OnlineGreeDot from "../OnlineGreenDot/OnlineGreenDot";
import { useWebSocket } from "../../config/WebSocketProvider";

const ChatRoom = ({
    auth: { user, loading },
    insights: { perChatRoomData },
    addMessage,
    addUserToOnline,
    removeUserFromOnline,
    chatRooms: { isLoading, online },
    clearActiveChatRoomState,
}) => {
    const { stompClient, sendMessage } = useWebSocket();
    const subscriptionref = useRef(null);
    const dispatch = useDispatch();

    const [chatText, setChatText] = useState("");
    const { chatRoom } = useParams();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!chatRoom || !user) {
            navigate("/chatRooms");
            return;
        }

        const onMessageRecieved = (payload) => {
            console.log("FROM ON MESSAGE RECIEVED");
            var message = JSON.parse(payload.body);
            switch (message.messageType) {
                case CHAT_MESSAGE:
                    addMessage(message);
                    break;
                case USER_ONLINE:
                    addUserToOnline(message.additionalData);
                    break;
                case USER_OFFLINE:
                    removeUserFromOnline(message.additionalData);
                    break;
                case PRIVATE_MESSAGE:
                    console.log("From PRIVATE MESSAGE");
                    break;
                default:
                    console.warn("Unknown message type:", message.messageType);
            }
        };

        if (stompClient && stompClient.connected) {
            subscriptionref.current = stompClient.subscribe(
                `/topic/chatRoom.${chatRoom}`,
                onMessageRecieved,
                { id: chatRoom }
            );

            sendMessage(
                `/app/chatRoom/${chatRoom}`,
                {},
                {
                    messageType: USER_ONLINE,
                    username: user.email,
                    userId: user.id,
                    chatRoomName: chatRoom,
                }
            );
        } else {
            console.warn("Stomp Client is not connected yet");
        }

        if (inputRef.current) {
            inputRef.current.focus();
        }

        return () => {
            if (subscriptionref.current) {
                subscriptionref.current.unsubscribe(chatRoom);
            }

            sendMessage(
                `/app/chatRoom/${chatRoom}`,
                {},
                {
                    messageType: USER_OFFLINE,
                    username: user.email,
                    userId: user.id,
                    chatRoomName: chatRoom,
                }
            );

            dispatch(clearActiveChatRoomState());
        };
    }, [stompClient, chatRoom, user, navigate, dispatch, sendMessage]);

    //     /////////////////////////////////////////////////////////
    //     stompClient.subscribe(
    //         `/user/${user.email}/queue/messages`,
    //         onMessageRecieved,
    //         {}
    //     );
    //     /////////////////////////////////////////////////////////

    const handleSendMessage = () => {
        if (!chatText.trim()) return;

        console.log(stompClient);
        sendMessage(
            `/app/chatRoom/${chatRoom}`,
            {},
            {
                messageType: CHAT_MESSAGE,
                username: user.email,
                userId: user.id,
                chatRoomName: chatRoom,
                message: chatText,
            }
        );

        //     /////////////////////////////////////////////////////////
        //     stompClient.send(
        //         `/app/privateMessage/jdoe@email.com`,
        //         {},
        //         JSON.stringify({
        //             messageType: "PRIVATE_MESSAGE",
        //             username: user.email,
        //             // userId: user.id,
        //             receiver: "jdoe@email.com",
        //             message: chatText,
        //         })
        //     );
        //     /////////////////////////////////////////////////////////

        setChatText("");
    };

    const handleKeyUp = (e) => {
        // handle enter key. key code for enter press is 13
        if (e.keyCode === 13) {
            document.getElementById("send-button").click();
            inputRef.current.focus();
        }
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
                            ref={inputRef}
                            onKeyUp={handleKeyUp}
                            id="text-message"
                            value={chatText}
                            onChange={(e) => setChatText(e.target.value)}
                            placeholder="Please Type Some Message here!!"
                            size="50"
                        />
                        <input
                            className="btn-primary"
                            id="send-button"
                            type="button"
                            value="Send"
                            onClick={handleSendMessage}
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
