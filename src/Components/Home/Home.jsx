import { connect } from "react-redux";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();
    const openChatRoomPage = () => {
        navigate("/chatRooms");
    }

    const privateChatPage = () => {
        navigate("/chat");
    }

    return (
        <div className="home-page">
            <div className="tile-container">
                <div className="tile" onClick={privateChatPage}>
                    <div className="insights">
                        <div className="friends">9 Friends</div>
                        <div className="online">2 Online</div>
                    </div>
                    <div className="tile-title">Friends Chat</div>
                    <div className="description">
                        Start conversation with your friends in Secure Private
                        End to End Encrypted chat rooms.
                    </div>
                </div>
                <div className="tile" onClick={openChatRoomPage}>
                    <div className="insights">
                        <div className="chatrooms">7 Chat Rooms</div>
                        <div className="online">23 Online</div>
                    </div>
                    <div className="tile-title">
                        Chat rooms
                    </div>
                    <div className="description">
                        Explore various chat rooms and join the ones you like to
                        discuss and share your views.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect()(Home);
