import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import WelcomePage from "./Components/WelcomePage";

const App = () => {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route Component={WelcomePage} path="/"></Route>
                </Routes>
            </Router>
        </div>
    );
};

export default App;
