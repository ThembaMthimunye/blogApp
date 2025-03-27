import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom"; // Import HashRouter
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./context/authContext";
import { SocketContextProvider } from "./context/SocketContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SocketContextProvider>
      <App />
    </SocketContextProvider>
  </StrictMode>
);
