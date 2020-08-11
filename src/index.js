import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { auth } from "./firebase";

import Routes from "./Routes";
import "./resources/css/app.css";

const App = (props) => (
  <BrowserRouter>
    <Routes {...props} />
  </BrowserRouter>
);

auth.onAuthStateChanged((user) => {
  ReactDOM.render(
    <React.StrictMode>
      <App user={user} />
    </React.StrictMode>,
    document.getElementById("root")
  );
});
