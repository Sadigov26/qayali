import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Media from "./pages/Media";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Delivery from "./pages/Delivery";
import "./App.css";
import "./components/Theme.css";
import "./components/Overrides.css";
import "./components/Global.css";
import "./components/Reviews.css";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kataloq" element={<Catalog />} />
          <Route path="/media" element={<Media />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/catdirilma" element={<Delivery />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
