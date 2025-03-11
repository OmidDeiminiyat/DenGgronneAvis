import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { Annonce } from "./pages/Annonce";
import { Login } from "./pages/Login";
import { Navbar } from "./components/navigation/Nav";
import { MinSide } from "./pages/Profile";
import { Category } from "./pages/Category";
import { Footer } from "./components/footer/footer";
import { ProductPage } from "./pages/Product";
import { ProductDetail } from "./components/ProductDetail";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/annonce" element={<Annonce />} />
          <Route path="/pages/login" element={<Login />} />
          <Route path="/pages/minside" element={<MinSide />} />
          <Route path="/pages/category/:categoryId" element={<Category />} />
          <Route path="/pages/Product" element={<ProductPage />} />
          <Route path="/pages/Product/:slug" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
