import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Insights.css";
import { getInitData } from "../../Actions/insights";
import GraphsInsight from "./GraphsInsight";

const Insights = ({ getInitData }) => {
    useEffect(() => {
        getInitData();
        console.log("From Landing Page");
    }, []);

    return (
        <div>
            <div className="graphs-container">
                <GraphsInsight />
            </div>
        </div>
    );
};

Insights.propTypes = {
    getInitData: PropTypes.func,
};

const mapStateToProps = (state) => ({
    insights: state.insights,
});

export default connect(mapStateToProps, {
    getInitData,
})(Insights);
