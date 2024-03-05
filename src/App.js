import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./Components/WelcomePage";
import ChatRoom from "./Components/ChatRoom";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route Component={WelcomePage} path="/"></Route>
                    <Route Component={ChatRoom} path="/chat-room"></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
