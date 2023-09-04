import { CssBaseline } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { ApiProvider } from "./contexts/apicontext";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApiProvider>
    </Provider>
  </React.StrictMode>
);
reportWebVitals();
