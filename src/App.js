import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.css";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import ChatRoom from "./Components/ChatBox/ChatRoom";
import ChatShowRoom from "./Components/ChatShowRoom/ChatShowRoom";
import Insights from "./Components/GraphInsight/Insights";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import store from "./Store/store";
import { loadUser } from "./Actions/auth";
import setAuthToken from "./utils/axiosTokenHeader";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Profile from "./Components/Profile/Profile";
import AuthenticatedLayout from "./Components/AuthenticatedLayout/AuthenticatedLayout";
import NavBar from "./Components/Layout/NavBar/NavBar";
import Alert from "./Components/Layout/Alert";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <div className="App">
            <Router>
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
                <NavBar />
                <Alert />
                <Routes>
                    <Route element={<WelcomePage />} path="/" />
                    <Route element={<Insights />} path="/insights" />

                    <Route element={<PrivateRoute />}>
                        <Route element={<AuthenticatedLayout />}>
                            <Route
                                path="/profile/:profileId"
                                element={<Profile />}
                            />
                            <Route
                                path="/chatRooms"
                                element={<ChatShowRoom />}
                            />
                            <Route
                                path="/chatRooms/:chatRoom"
                                element={<ChatRoom />}
                            />
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
