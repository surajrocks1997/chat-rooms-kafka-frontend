import { Outlet } from "react-router-dom";
import WebSocketProvider from "../../config/WebSocketProvider";

const AuthenticatedLayout = () => {
    return (
        <WebSocketProvider>
            <Outlet />
        </WebSocketProvider>
    );
};

export default AuthenticatedLayout;
