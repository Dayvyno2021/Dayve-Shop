import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import CartPageScreen from "./pages/cartPage/CartPageScreen";
import HomePageScreen from "./pages/homepage/HomePageScreen";
import LoginScreen from "./pages/loginpage/LoginScreen";
import ProductScreen from "./pages/productpage/ProductScreen";
import RegisterScreen from "./pages/registerPage/RegisterScreen";
import ShippingScreen from "./pages/shippingpage/ShippingScreen";

function App() {
  return (
    <div className="contains">
        <Routes >
          <Route path="/" element={<Header />}>
            <Route index element={<HomePageScreen />}/>
            <Route path="register" element={<RegisterScreen />}/>
            <Route path="login" element={<LoginScreen />}/>
            <Route path="product/:id" element={<ProductScreen />}/>
            <Route path="cart/:id" element={<CartPageScreen />}/>
            <Route path="shipping" element={<ShippingScreen />}/>

            <Route path="*" element={<main>This page is not routed yet</main> }/>
          </Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
