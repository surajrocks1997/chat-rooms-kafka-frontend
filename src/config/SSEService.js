export default class SSEService {
    constructor() {
        this.sseData = null;
        this.initSSE();
    }

    initSSE() {
        console.log("From SSE Service Class");
        this.sseData = new EventSource(
            "http://localhost:8081/sse/insightData",
            { withCredentials: false }
        );
    }

    getSSEData() {
        return this.sseData;
    }

    disconnectSSE() {
        this.sseData.close();
    }
}
