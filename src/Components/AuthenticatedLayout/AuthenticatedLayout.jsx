import { Outlet } from "react-router-dom";
import WebSocketProvider from "../../config/WebSocketProvider";
import NavBar from "../Layout/NavBar/NavBar";

const AuthenticatedLayout = () => {
    return (
        <WebSocketProvider>
            <NavBar />
            <Outlet />
        </WebSocketProvider>
    );
};

export default AuthenticatedLayout;
