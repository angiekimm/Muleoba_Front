import React from "react";
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from "react-dom/client";
import Main from "./Main";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <Main />
  </React.StrictMode>
  </BrowserRouter>
);

reportWebVitals();
