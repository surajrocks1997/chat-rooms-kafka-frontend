import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import ChatRoom from "./Components/ChatBox/ChatRoom";
import ChatShowRoom from "./Components/ChatShowRoom/ChatShowRoom";
import Insights from "./Components/GraphInsight/Insights";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
    return (
        <div className="container">
            <div className="insights left-container">
                <Insights />
            </div>

            <div className="right-container">{children}</div>
        </div>
    );
};

const App = () => {
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
                <Routes>
                    <Route Component={WelcomePage} path="/"></Route>
                    <Route Component={ChatShowRoom} path="/chatRooms"></Route>
                    <Route
                        Component={ChatRoom}
                        path="/chatRooms/:chatRoom"
                    ></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
