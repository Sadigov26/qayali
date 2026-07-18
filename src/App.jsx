import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./admin/components/AdminLayout";
import RequireAdmin from "./admin/components/RequireAdmin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminSettings from "./admin/pages/AdminSettings";
import ProductCreate from "./admin/pages/ProductCreate";
import ProductEdit from "./admin/pages/ProductEdit";
import ProductsAdmin from "./admin/pages/ProductsAdmin";
import Layout from "./components/Layout";
import "./App.css";
import "./components/Global.css";
import "./components/Overrides.css";
import "./components/Reviews.css";
import "./components/Theme.css";
import Catalog from "./pages/Catalog";
import About from "./pages/About";
import Delivery from "./pages/Delivery";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Media from "./pages/Media";
import PostDetail from "./pages/PostDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<RequireAdmin />}>
          <Route path="/admin1" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="products/new" element={<ProductCreate />} />
            <Route path="products/:id/edit" element={<ProductEdit />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kataloq" element={<Catalog />} />
          <Route path="/media" element={<Media />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/catdirilma" element={<Delivery />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
