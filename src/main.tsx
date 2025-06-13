import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "@/assets/styles/index.css";
import { init } from "@rematch/core";
import { models } from "@/stores/models";

const store = init({
  models,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
