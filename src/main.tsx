import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// --- SPA 404 Fallback (for static hosts) ---
const pendingPath = sessionStorage.getItem("__spa_fallback_path__");
if (pendingPath && pendingPath !== "/" && pendingPath !== "/index.html") {
  history.replaceState(null, "", pendingPath);
  sessionStorage.removeItem("__spa_fallback_path__");
}
// ------------------------------------------

createRoot(document.getElementById("root")!).render(<App />);
