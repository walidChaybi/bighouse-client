import ReactDOM from "react-dom/client";
import { Listings } from "./sections";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(<Listings title="Big house listings" />);
