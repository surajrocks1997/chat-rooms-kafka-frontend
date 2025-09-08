import { connect } from "react-redux";
import "./PrivateChat.css";
import OnlineGreeDot from "../OnlineGreenDot/OnlineGreenDot";
import ChatBox from "../ChatBox/ChatBox";

const PrivateChat = () => {
    return (
        <div className="private-chat">
            <div className="section-container">
                <div className="online-container">
                    <div className="top-section">
                        <div className="online-header">
                            <div className="header-section">Online</div>
                        </div>
                        <div className="online-section">
                            <div className="online-presence">
                                <div className="green-dot">
                                    <OnlineGreeDot />
                                </div>
                                <div className="fullname">John Doe</div>
                                <div className="username">@ jdoe</div>
                            </div>
                            <div className="online-presence">
                                <div className="green-dot">
                                    <OnlineGreeDot />
                                </div>
                                <div className="fullname">Williams Carl</div>
                                <div className="username">@ wcarl</div>
                            </div>
                            <div className="online-presence">
                                <div className="green-dot">
                                    <OnlineGreeDot />
                                </div>
                                <div className="fullname">Simpal Diety</div>
                                <div className="username">@ samplyd</div>
                            </div>
                            <div className="online-presence">
                                <div className="green-dot">
                                    <OnlineGreeDot />
                                </div>
                                <div className="fullname">Serena Gonzalez</div>
                                <div className="username">@ serenaz</div>
                            </div>
                        </div>
                    </div>
                    <div className="online-footer">
                        <div className="footer-section">Total Online: 4</div>
                    </div>
                </div>
                <div className="chat-box-container">
                    <div className="chat-box-header">
                        <div className="profile-details">
                            <img
                                className="avatar"
                                src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                                alt="Profile"
                            />
                            <div className="chat-box-fullname">John Doe</div>
                        </div>
                        <div className="features">
                            <i className="feature fa-solid fa-phone fa-lg"></i>
                            <i className="fa-solid fa-video fa-lg feature"></i>
                            <i className="fa-solid fa-magnifying-glass fa-lg feature"></i>
                        </div>
                    </div>
                    <div className="chat-page">
                        <div
                            className="text-appearance"
                            style={{
                                display: "flex",
                                flexDirection: true ? "row-reverse" : "row",
                            }}
                        >
                            <div className="user-image">
                                <img
                                    src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"
                                    alt="user"
                                    style={{
                                        width: "40px",
                                        display: "block",
                                        borderRadius: "20px",
                                        margin: "0 7px",
                                    }}
                                ></img>
                            </div>
                            <div
                                className="chat-message"
                                // key={message.timestamp}
                                style={{
                                    backgroundColor: true
                                        ? "rgb(248, 239, 220)"
                                        : "white",
                                }}
                            >
                                <div className="chat-message-header">
                                    <p
                                        className="username"
                                        // onClick={() => openProfile(message.username)}
                                    >
                                        jdoe
                                    </p>
                                    <p className="message">Hey there</p>
                                </div>
                                <p className="timestamp">16.04</p>
                            </div>
                        </div>
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            // ref={inputRef}
                            // onKeyUp={handleKeyUp}
                            id="text-message"
                            // value={chatText}
                            // onChange={(e) => setChatText(e.target.value)}
                            placeholder="Please Type Some Message here!!"
                            size="50"
                        />
                        <input
                            className="btn-primary"
                            id="send-button"
                            type="button"
                            value="Send"
                            // onClick={handleSendMessage}
                        />
                    </div>
                </div>
                <div className="games-container">
                    <div className="games-header">Games</div>
                    <div className="games">
                        <div className="game"></div>
                        <div className="game"></div>
                        <div className="game"></div>
                        <div className="game"></div>
                        <div className="game"></div>
                        <div className="game"></div>
                        <div className="game"></div>
                        <div className="game"></div>
                        <div className="game"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect()(PrivateChat);
