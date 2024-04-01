import WebSocketService from "./WebSocketService";

export class InitWSManager {
    constructor() {
        console.log("inside init ws manager")
        this.wsManager = {};
    }

    createWSService() {
        this.wsManager["wsId"] = new WebSocketService();
        return this.wsManager["wsId"];
    }

    getWSService() {
        return this.wsManager["wsId"];
    }

    getStompClient(){
        return this.wsManager["wsId"].getStompClient();
    }
}

const initWSManager = new InitWSManager();
export default initWSManager;
