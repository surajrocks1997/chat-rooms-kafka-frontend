import PropTypes from "prop-types";
import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useCallback,
    useState,
} from "react";
import { connect } from "react-redux";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import {
    setWebSocketConnectAlert,
    setWebSocketErrorAlert,
} from "../Actions/alert";
import { WEBSOCKET_CONNECTION_URL } from "./uri";

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

const WebSocketProvider = ({
    children,
    setWebSocketConnectAlert,
    setWebSocketErrorAlert,
    auth: { user },
}) => {
    const [stompClient, setStompClient] = useState(null);
    const reconnectAttemptRef = useRef(0);
    const privateSubscriptionRef = useRef(null);
    const hasSubscribedRef = useRef(false);

    // const maxReconnectAttemps = 5;
    const isConnectingRef = useRef(false);

    const onPrivateMessageReceived = useCallback((payload) => {
        const message = JSON.parse(payload.body);

        switch (message.status) {
            case "SENT":
                console.log("Message sent:", message);
                break;
            case "DELIVERED":
                console.log("Message delivered:", message);
                break;
            case "READ":
                console.log("Message read:", message);
                break;
            default:
                console.log("Incoming private message:", message);
        }
    }, []);

    const safeHandler = (payload) => {
        try {
            const body = payload?.body ?? "";
            if (!body) return;
            const msg = JSON.parse(body);
            console.log("private:", msg);
        } catch (e) {
            console.error("private handler error", e);
        }
    };

    const connect = useCallback(() => {
        if (isConnectingRef.current) return;
        isConnectingRef.current = true;
        const token = localStorage.getItem("token");

        const socket = new SockJS(WEBSOCKET_CONNECTION_URL);

        let client = Stomp.over(socket);

        // stompClient.debug = null;

        client.connect(
            {
                Authorization: `Bearer ${token}`,
            },
            () => {
                console.log("Connected to WebSocket Server");
                reconnectAttemptRef.current = 0;
                isConnectingRef.current = false;
                setStompClient(client);
                setWebSocketConnectAlert("You are Online!", "success");

                console.log(user.username);
                if (user?.username) {
                    if (privateSubscriptionRef.current) {
                        privateSubscriptionRef.current.unsubscribe();
                    }

                    privateSubscriptionRef.current = client.subscribe(
                        "/user/queue/direct",
                        safeHandler,
                        { id: `private_${user.username}` }
                    );

                    console.log("Subscribed to /user/queue/direct");
                }
            },
            (error) => {
                console.error("Websocket Connection Error: ", error);
                console.log(new Date());
                isConnectingRef.current = false;

                setWebSocketErrorAlert(
                    "Disconnected from Server. Trying to Connect...",
                    "danger"
                );

                console.log("Disconnected from Server. Trying to Connect...");
                setTimeout(() => {
                    reconnectAttemptRef.current += 1;
                    connect();
                }, 5 * 1000);
            }
        );
    }, []);

    useEffect(() => {
        connect();

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.disconnect();
                console.log("Successfully Disconnected From WebSocket Server");
            }
        };
    }, [connect]);

    const sendMessage = (destination, headers = {}, body = {}) => {
        if (stompClient && stompClient.connected) {
            stompClient.send(destination, headers, JSON.stringify(body));
        } else {
            console.warn("Stomp Client isn't connected");
        }
    };

    const value = {
        stompClient,
        sendMessage,
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
};

WebSocketProvider.propTypes = {
    setWebSocketConnectAlert: PropTypes.func,
    setWebSocketErrorAlert: PropTypes.func,
};

const mapStateToProps = (state) => ({
    alert: state.alert,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    setWebSocketConnectAlert,
    setWebSocketErrorAlert,
})(WebSocketProvider);
