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
}) => {
    const [stompClient, setStompClient] = useState(null);
    const reconnectAttemptRef = useRef(0);
    // const maxReconnectAttemps = 5;
    const isConnectingRef = useRef(false);

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
            },
            (error) => {
                console.error("Websocket Connection Error: ", error);
                console.log(new Date());
                isConnectingRef.current = false;

                setWebSocketErrorAlert(
                    "Disconnected from Server. Trying to Connect...",
                    "danger"
                );
                setTimeout(() => {
                    reconnectAttemptRef.current += 1;
                    connect();
                }, 3 * 1000);
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
});

export default connect(mapStateToProps, {
    setWebSocketConnectAlert,
    setWebSocketErrorAlert,
})(WebSocketProvider);
