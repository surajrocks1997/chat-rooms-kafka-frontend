export const messageSse = new EventSource(
    "http://localhost:8081/sse/messageData",
    { withCredentials: false }
);

export const wordCountSse = new EventSource(
    "http://localhost:8081/sse/wordCountData",
    { withCredentials: false }
);

