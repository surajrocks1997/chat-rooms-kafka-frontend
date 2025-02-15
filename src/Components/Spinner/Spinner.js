import React, { Fragment } from "react";

import spinner from "./spinner.gif";
import "./spinner.css";

const Spinner = () => (
    <div className="spinner">
        {/* <img
                src={spinner}
                alt="Loading..."
                // style={{ width: "200px", margin: "auto", display: "block" }}
            /> */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
                r="15"
                cx="40"
                cy="65"
                data-darkreader-inline-fill=""
                data-darkreader-inline-stroke=""
                style={{
                    "--darkreader-inline-fill":
                        "var(--darkreader-text-880088 #ff6dff)",
                    "--darkreader-inline-stroke":
                        "var(--darkreader-text-880088 #ff6dff)",
                }}
            >
                <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="0.9"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.4"
                ></animate>
            </circle>
            <circle
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
                r="15"
                cx="100"
                cy="65"
                data-darkreader-inline-fill=""
                data-darkreader-inline-stroke=""
                style={{
                    "--darkreader-inline-fill":
                        "var(--darkreader-text-880088 #ff6dff)",
                    "--darkreader-inline-stroke":
                        "var(--darkreader-text-880088 #ff6dff)",
                }}
            >
                <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="0.9"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.2"
                ></animate>
            </circle>
            <circle
                fill="#FFFFFF"
                stroke="#000000"
                strokeWidth="2"
                r="15"
                cx="160"
                cy="65"
                data-darkreader-inline-fill=""
                data-darkreader-inline-stroke=""
                style={{
                    "--darkreader-inline-fill":
                        "var(--darkreader-text-880088 #ff6dff)",
                    "--darkreader-inline-stroke":
                        "var(--darkreader-text-880088 #ff6dff)",
                }}
            >
                <animate
                    attributeName="cy"
                    calcMode="spline"
                    dur="0.9"
                    values="65;135;65;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                ></animate>
            </circle>
        </svg>
    </div>
);

export default Spinner;
