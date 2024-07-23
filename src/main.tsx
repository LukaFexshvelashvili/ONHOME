import "./css/colors.css";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./css/index.css";
import "./css/components.css";
import "./css/responsive.css";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import "./translations/Translations";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
