import { connect } from "react-redux";
import "./PrivateChat.css";
import OnlineGreeDot from "../OnlineGreenDot/OnlineGreenDot";
import ChatBox from "../ChatBox/ChatBox";

const PrivateChat = () => {
    return (
        <div className="private-chat">
            <div className="section-container">
                <div className="chat-container">
                    <div className="top-section">
                        <div className="chat-header">
                            <div className="header-section">Chat</div>
                        </div>
                        <div className="chat-section">
                            <div className="chat-box">
                                <div className="section">
                                    <div className="profile-details">
                                        <img
                                            className="chat-list-avatar"
                                            src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="chat-list-details">
                                        <div className="chat-detail-top-section">
                                            <div className="chat-list-username">
                                                surajrocks1997
                                            </div>
                                            <div className="lastMessageTime">
                                                2.30 PM
                                            </div>
                                        </div>
                                        <div className="chat-detail-bottom-section">
                                            <div className="lastMessage">
                                                Limit Text to 40 Chars followed by ...
                                            </div>

                                            <div className="msgStatus">
                                                <i
                                                    className="fa-solid fa-check-double"
                                                    style={{
                                                        color: "white",
                                                    }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-box">
                                <div className="section">
                                    <div className="profile-details">
                                        <img
                                            className="chat-list-avatar"
                                            src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="chat-list-details">
                                        <div className="chat-detail-top-section">
                                            <div className="chat-list-username">
                                                scary-instructions-123
                                            </div>
                                            <div className="lastMessageTime">
                                                12.11 PM
                                            </div>
                                        </div>
                                        <div className="chat-detail-bottom-section">
                                            <div className="lastMessage">
                                                Hey There!
                                            </div>

                                            <div className="msgStatus">
                                                <i
                                                    className="fa-solid fa-check-double"
                                                    style={{
                                                        color: "white",
                                                    }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="chat-box">
                                <div className="section">
                                    <div className="profile-details">
                                        <img
                                            className="chat-list-avatar"
                                            src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                                            alt="Profile"
                                        />
                                    </div>
                                    <div className="chat-list-details">
                                        <div className="chat-detail-top-section">
                                            <div className="chat-list-username">
                                                jdoe
                                            </div>
                                            <div className="lastMessageTime">
                                                20 April
                                            </div>
                                        </div>
                                        <div className="chat-detail-bottom-section">
                                            <div className="lastMessage">
                                                Hey! how are you? Hey! how are
                                                you?
                                            </div>

                                            <div className="msgStatus">
                                                <i
                                                    className="fa-solid fa-check-double"
                                                    style={{
                                                        color: "white",
                                                    }}
                                                ></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="online-footer">
                        <div className="footer-section">
                            Total Online: 3 / 24
                        </div>
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
                            <div className="feature">
                                <i className="fa-solid fa-phone fa-lg"></i>
                            </div>
                            <div className="feature">
                                <i className="fa-solid fa-video fa-lg"></i>
                            </div>
                            <div className="feature">
                                <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                            </div>
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
                                <div className="message-insight">
                                    <div className="receipt">
                                        {/* <i className="fa-solid fa-check" style={{color: "black"}}></i> */}
                                        {/* <i className="fa-solid fa-check-double" style={{color: "black"}}></i> */}
                                        <i
                                            className="fa-solid fa-check-double"
                                            style={{ color: "green" }}
                                        ></i>
                                    </div>
                                    <div className="timestamp">16.04</div>
                                </div>
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
