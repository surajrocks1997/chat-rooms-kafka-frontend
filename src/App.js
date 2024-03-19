import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./Components/WelcomePage";
import ChatRoom from "./Components/ChatRoom";
import ChatShowRoom from "./Components/ChatShowRoom";
import Insights from "./Components/Insights";

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
                <Layout>
                    <Routes>
                        <Route Component={WelcomePage} path="/"></Route>
                        <Route
                            Component={ChatShowRoom}
                            path="/chatRooms"
                        ></Route>
                        <Route
                            Component={ChatRoom}
                            path="/chatRooms/:chatRoom"
                        ></Route>
                    </Routes>
                </Layout>
            </Router>
        </div>
    );
};

export default App;
