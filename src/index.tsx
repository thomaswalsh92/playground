import { App } from "./App";
import * as ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";

const div = document.getElementById("root") as Element;
const root = createRoot(div);
root.render(<App />);
