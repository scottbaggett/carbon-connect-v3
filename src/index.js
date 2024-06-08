import { createRoot } from "react-dom/client";
import CarbonConnectModal from "./App.tsx";

const container = document.getElementById("app");
const root = createRoot(container);
root.render(<CarbonConnectModal />);
