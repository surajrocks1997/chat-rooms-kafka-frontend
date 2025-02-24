import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useCallback,
    useState,
} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [stompClient, setStompClient] = useState(null);
    const reconnectAttemptRef = useRef(0);
    // const maxReconnectAttemps = 5;
    const isConnectingRef = useRef(false);

    const connect = useCallback(() => {
        if (isConnectingRef.current) return;
        isConnectingRef.current = true;
        const token = localStorage.getItem("token");

        const socket = new SockJS("http://localhost:8082/chat-rooms");

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
            },
            (error) => {
                console.error("Websocket Connection Error: ", error);
                console.log(new Date());
                isConnectingRef.current = false;

                setTimeout(() => {
                    reconnectAttemptRef.current += 1;
                    connect();
                }, 3 * 1000);

                // if (reconnectAttemptRef.current < maxReconnectAttemps) {
                //     const timeout = Math.pow(2, reconnectAttemptRef.current) * 1000;
                //     setTimeout(() => {
                //         reconnectAttemptRef.current += 1;
                //         connect();
                //     }, timeout);
                // } else {
                //     console.error(
                //         "Max Reconnection Attempts Reached. Please Try Refreshing the Page"
                //     );
                // }
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
