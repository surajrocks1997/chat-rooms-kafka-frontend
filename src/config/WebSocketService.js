import { toast } from "react-toastify";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default class WebSocketService {
    constructor() {
        this.stompClient = null;
        this.initWebSocket();
    }

    initWebSocket() {
        const token = localStorage.token;
        console.log("From WebSocketService Class");
        const socket = new SockJS(
            "http://localhost:8082/chat-rooms"
        );
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect(
            {
                Authorization: "Bearer " + token,
            },
            (frame) => {
                console.log("Connected to WebSocket Server");
                // console.log(frame);
            },
            () => {
                toast.error(
                    "Could not Connect to Server. Please try refreshing the page"
                );
                console.log(
                    "Could not Connect to WebSocket Server. Please Try Again"
                );
            }
        );
    }

    getStompClient() {
        return this.stompClient;
    }

    disconnectStompClient() {
        this.getStompClient().disconnect();
    }
}

// const webSocketService = new WebSocketService();
// export default webSocketService;
