import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Insights.css";
import {
    updatePerChatRoomData,
    updateWordCountData,
    getInitData,
} from "../../Actions/insights";
import { messageSse, wordCountSse } from "../../config/sseConfig";
import GraphsInsight from "./GraphsInsight";

const Insights = ({
    updatePerChatRoomData,
    updateWordCountData,
    getInitData,
    insights: { perChatRoomData, wordCountData },
}) => {
    useEffect(() => {
        getInitData();
        console.log("From Landing Page");

        messageSse.addEventListener("messageEvent", (e) => {
            var jsonData = JSON.parse(e.data);
            console.log(jsonData);
            updatePerChatRoomData(jsonData);
        });

        wordCountSse.addEventListener("wordCountEvent", (e) => {
            var jsonData = JSON.parse(e.data);
            console.log(jsonData);
            updateWordCountData(jsonData);
        });

        wordCountSse.onopen = (e) => {
            console.log(e);
        };

        wordCountSse.onerror = (e) => {
            console.log(e);
        };

        messageSse.onopen = (e) => {
            console.log(e);
        };

        messageSse.onerror = (e) => {
            console.log(e);

            // if (messageSse.readyState === EventSource.CLOSED) {
            //     setTimeout(() => {
            //         messageSse = new EventSource(
            //             "http://localhost:8081/sse/messageData"
            //         );
            //     }, 5000);
            // }
        };

        return () => {
            messageSse.close();
            wordCountSse.close();
        };
    }, [updatePerChatRoomData, updateWordCountData]);

    return (
        <div>
            <div className="graphs-container">
                <GraphsInsight />
            </div>
        </div>
    );
};

Insights.propTypes = {
    updatePerChatRoomData: PropTypes.func,
    perChatRoomData: PropTypes.object,
    updateWordCountData: PropTypes.func,
    wordCountData: PropTypes.array,
    getInitData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    insights: state.insights,
});

export default connect(mapStateToProps, {
    updatePerChatRoomData,
    updateWordCountData,
    getInitData,
})(Insights);
