import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.scss";
import { FavoritesProvider } from './context/Contex.jsx'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FavoritesProvider>
      <App/>
    </FavoritesProvider>
  </BrowserRouter>
);
