import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
    return isAuthenticated === null ? (
        <Spinner />
    ) : !loading && !isAuthenticated ? (
        <Navigate to="/" />
    ) : (
        <Outlet />
    );
};

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(PrivateRoute);
