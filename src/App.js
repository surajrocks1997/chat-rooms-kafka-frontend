import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import NavBar from "./Components/NavBar/NavBar";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    });

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
                <Routes>
                    <Route element={<WelcomePage />} path="/" />
                    <Route element={<PrivateRoute />} path="/">
                        <Route path="/chatRooms" element={<ChatShowRoom />} />
                        <Route
                            path="/chatRooms/:chatRoom"
                            element={<ChatRoom />}
                        />
                    </Route>
                    <Route element={<Insights />} path="/insights" />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
