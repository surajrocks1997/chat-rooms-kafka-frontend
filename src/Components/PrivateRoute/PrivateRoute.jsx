import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
    return !loading && !isAuthenticated ? (
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
