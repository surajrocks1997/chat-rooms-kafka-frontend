import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {

    if (loading) return <Spinner />;
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
