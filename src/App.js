import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import { CartProvider } from "./context/cart-provider";
import Checkout from "./pages/Checkout";
import { MyProductProvider } from "./context/product-provide";
import FilteredProducts from "./pages/FilterProducts";
import Category from "./pages/Category";
import Success from "./pages/Checkout/success";
import OffersPage from "./pages/OffersPage";
import { Helmet } from "react-helmet";

export const APP_URLS = {
  "/": {
    title: "Home",
  },
  "/category/mens-clothing": {
    title: "Mens",
  },
  "/category/womens-clothing": {
    title: "Women",
  },
  "/all": {
    title: "All",
  },
  "/checkout": {
    title: "Checkout",
  },
  "/offers": {
    title: "Offers",
  },
  "/searched-products": {
    title: "Products",
  },
};

const Wrapper = ({ children }) => {
  const location = useLocation();
  const params = useParams();

  const getRoutePath = (location, params) => {
    const { pathname } = location;

    if (!Object.keys(params).length) {
      return pathname;
    }

    let path = pathname;
    Object.entries(params).forEach(([paramName, paramValue]) => {
      if (paramValue) {
        path = path.replace(paramValue, `:${paramName}`);
      }
    });
    return path;
  };

  const pathname = getRoutePath(location, params);

  return (
    <>
      <Helmet>
        <title>{`YCompany Fashion - ${
          APP_URLS[pathname]?.title || "Detail"
        }`}</title>
        <meta
          name="description"
          content="YCompany encourages you to boldly embrace your personal style, embodying confidence and optimism that remain unshakable."
        />
        <meta
          name="keywords"
          content="Explore our collection of men's and women's clothing, featuring casuals, t-shirts, and more."
        />
      </Helmet>
      {children}
    </>
  );
};

function App() {
  return (
    <MyProductProvider>
      <CartProvider>
        <BrowserRouter>
          <Wrapper>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/all" element={<ProductPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/searched-products" element={<FilteredProducts />} />
              <Route path="/category/:id" element={<Category />} />
              <Route path="/checkout/success" element={<Success />} />
              <Route path="/offers" element={<OffersPage />} />
            </Routes>
          </Wrapper>
        </BrowserRouter>
      </CartProvider>
    </MyProductProvider>
  );
}

export default App;
