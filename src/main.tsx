import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { storage } from "./lib/firebase";
import { connectStorageEmulator } from "firebase/storage";
import { ConnectedEmulatorIndicator } from "./components/connected-emulator/index.tsx";

if (import.meta.env.DEV) {
  connectStorageEmulator(storage, "localhost", 9199);
  localStorage.setItem("connectedEmulator", "1");
  console.log("Connected to Firebase Storage emulator at localhost:9199");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <div className="relative">
        <App />
        <ConnectedEmulatorIndicator />
      </div>
    </DndProvider>
  </StrictMode>
);
