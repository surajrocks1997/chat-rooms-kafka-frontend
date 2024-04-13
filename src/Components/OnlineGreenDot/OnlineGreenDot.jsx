import onlineGreenDot from "./online-green-dot.png";

const OnlineGreeDot = () => {
    return (
        <div className="online-green-dot-img">
            <img
                src={onlineGreenDot}
                alt="Online"
                style={{ width: "13px", display: "block"}}
            />
        </div>
    );
};

export default OnlineGreeDot;
