import SSEService from "./SSEService";
import WebSocketService from "./WebSocketService";

export class InitConnectionManager {
    constructor() {
        console.log("Inside Init Connection Manager");
        this.wsManager = {};
        this.sseManager = {};
    }

    createWSService() {
        this.wsManager["wsId"] = new WebSocketService();
        return this.wsManager["wsId"];
    }

    createSSEService() {
        this.sseManager["sseId"] = new SSEService();
        return this.sseManager["sseId"];
    }

    getWSService() {
        return this.wsManager["wsId"];
    }

    getSSEService() {
        return this.sseManager["sseId"];
    }

    getStompClient() {
        return this.wsManager["wsId"].getStompClient();
    }

    getSSEData() {
        return this.sseManager["sseId"].getSSEData();
    }
}

const initWSManager = new InitConnectionManager();
export default initWSManager;
