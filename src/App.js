import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./Components/WelcomePage";
import ChatRoom from "./Components/ChatRoom";
import ChatShowRoom from "./Components/ChatShowRoom";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route Component={WelcomePage} path="/"></Route>
                    <Route Component={ChatShowRoom} path="/chatRooms"></Route>
                    <Route Component={ChatRoom} path="/chatRooms/:chatRoom"></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
