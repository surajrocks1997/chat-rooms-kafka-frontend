import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// defaults.maintainAspectRatio = false;
// defaults.responsive = true;

const GraphsInsight = ({ insights: { perChatRoomData, wordCountData } }) => {
    return (
        <div>
            <h3>Messages Per Topic</h3>
            <div className="top">
                <Doughnut
                    data={{
                        labels: perChatRoomData.map(
                            (data) => data.chatRoomName
                        ),
                        datasets: [
                            {
                                label: "Chat Room",
                                data: perChatRoomData.map((data) => data.count),
                                backgroundColor: [
                                    "rgba(242,98,121,0.8)",
                                    "rgba(111,84,189,0.8)",
                                    "rgba(63,100,126,0.8)",
                                    "rgba(82,204,206,0.8)",
                                    "rgba(255,237,0,0.8)",
                                    "rgba(0,176,24,0.8)",
                                    "rgba(43,63,229,0.8)",
                                ],
                            },
                        ],
                    }}
                />
            </div>
            <h3>Top 10 Trending Words</h3>
            <div className="bottom">
                <Bar
                    data={{
                        labels: wordCountData.map((data, index) => data.word),
                        datasets: [
                            {
                                label: "Words",
                                data: wordCountData.map(
                                    (data, index) => data.count
                                ),
                                borderRadius: 5,
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

GraphsInsight.propTypes = {};

const mapStateToProps = (state) => ({
    insights: state.insights,
});

export default connect(mapStateToProps, {})(GraphsInsight);
