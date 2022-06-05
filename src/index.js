import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from './store'
import axios from 'axios';
import { Provider } from 'react-redux'
// Call make Server
makeServer();

axios.interceptors.request.use(function (config) {
  config.headers.authorization = localStorage.getItem('arcadedomToken');
  return config;
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
