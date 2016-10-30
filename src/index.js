import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
// http://localhost:8989/api/languages/hz
ReactDOM.render(
    <App path="http://localhost:8989/api/languages" />,
    document.getElementById("root")
);