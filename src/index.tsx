import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import Wrapper from "./components/Wrapper/Wrapper";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Wrapper>
    <App />
  </Wrapper>
);
