import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import App from "./App";
import "./styles.scss";

import { BrowserRouter } from "react-router-dom";

import userReducer from "./redux/slices/userSlice";
import bugReducer from "./redux/slices/bugSlice";

const reducer = combineReducers({
  user: userReducer,
  bug: bugReducer,
});

const store = configureStore({ reducer });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
