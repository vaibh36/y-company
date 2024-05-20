import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/cart-provider";
import Checkout from "./pages/Checkout";
import { MyProductProvider } from "./context/product-provide";
import FilteredProducts from "./pages/FilterProducts";

function App() {
  return (
    <MyProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/all" element={<ProductPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/searched-products" element={<FilteredProducts />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MyProductProvider>
  );
}

export default App;
