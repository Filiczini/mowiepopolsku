// frontend/src/index.js
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./index.css"; // ваші стилі

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
