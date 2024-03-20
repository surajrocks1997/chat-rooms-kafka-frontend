import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
    updatePerChatRoomData,
    updateWordCountData,
} from "../Actions/insights";
import { messageSse, wordCountSse } from "../config/config";

const Insights = ({
    updatePerChatRoomData,
    updateWordCountData,
    insights: { perChatRoomData, wordCountData },
}) => {
    useEffect(() => {
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
            <h1>My Insights here</h1>
            <h2>Message Count Per Room </h2>
            <p>Sports : {perChatRoomData.Sports}</p>
            <p>Technology : {perChatRoomData.Technology}</p>
            <p>Science : {perChatRoomData.Science}</p>
            <p>Automobile : {perChatRoomData.Automobile}</p>
            <p>Gadgets : {perChatRoomData.Gadgets}</p>
            <p>News : {perChatRoomData.News}</p>
            <p>Random : {perChatRoomData.Random}</p>

            <h2>Top 10 Trending Words</h2>
            {wordCountData.map(({ word, count }, index) => (
                <p key={index}>{word} : {count}</p>
            ))}
        </div>
    );
};

Insights.propTypes = {
    updatePerChatRoomData: PropTypes.func,
    perChatRoomData: PropTypes.object,
    updateWordCountData: PropTypes.func,
    wordCountData: PropTypes.array,
};

const mapStateToProps = (state) => ({
    insights: state.insights,
});

export default connect(mapStateToProps, {
    updatePerChatRoomData,
    updateWordCountData,
})(Insights);
