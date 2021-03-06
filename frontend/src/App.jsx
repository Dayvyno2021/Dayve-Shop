import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Paystack from "./components/paystack/Paystack";
import AdminEditUserScreen from "./pages/adminedituser/AdminEditUserScreen";
import CartPageScreen from "./pages/cartPage/CartPageScreen";
import CreateProductScreen from "./pages/createproduct/CreateProductScreen";
import EditProductScreen from "./pages/createproduct/EditProductScreen";
import HomePageScreen from "./pages/homepage/HomePageScreen";
import LoginScreen from "./pages/loginpage/LoginScreen";
import OrderListScreen from "./pages/orderlistpage/OrderListScreen";
import OrderPageScreen from "./pages/orderpage/OrderPageScreen";
import PaymentScreen from "./pages/paymentpage/PaymentScreen";
import PlaceOrder from "./pages/placeorderpage/PlaceOrder";
import ProductListScreen from "./pages/productlistpage/ProductListScreen";
import ProductScreen from "./pages/productpage/ProductScreen";
import ProfileScreen from "./pages/profilepage/ProfileScreen";
import RegisterScreen from "./pages/registerPage/RegisterScreen";
import ShippingScreen from "./pages/shippingpage/ShippingScreen";
import UsersListScreen from "./pages/userslistpage/UsersListScreen";

function App() {

  const style = {
    gridColumn: '1/-1',
    marginTop: '10rem', 
    fontSize:'1.6rem',
    display: 'block',
    padding: '0 10rem',
    minHeight: '60vh'
}

  return (
    <div className="contains">
      <Header />
        <Routes >
          <Route path="/" element={<Header />}>
            <Route index element={<HomePageScreen />}/>
            <Route path="page/:id" element={<HomePageScreen />}/>
            <Route path="payment/paystack/:id" element={<Paystack />}/>
            <Route path="register" element={<RegisterScreen />}/>
            <Route path="login" element={<LoginScreen />}/>
            <Route path="product/:id" element={<ProductScreen />}/>
            <Route path="cart/:id" element={<CartPageScreen />}/>
            <Route path="shipping" element={<ShippingScreen />}/>
            <Route path="payment" element={<PaymentScreen />}/>
            <Route path="placeorder" element={<PlaceOrder/>}/>
            <Route path="order/:id" element={<OrderPageScreen/>}/>
            <Route path="admin/userslist" element={<UsersListScreen/>}/>
            <Route path="userslist/:id" element={<AdminEditUserScreen/>}/>
            <Route path="admin/productslist" element={<ProductListScreen/>}/>
            <Route path="product/new-product" element={<CreateProductScreen/>}/>
            <Route path="product/edit/:id" element={<EditProductScreen/>}/>
            <Route path="admin/orderlist" element={<OrderListScreen/>}/>
            <Route path="user-profile/:id" element={<ProfileScreen/>}/>

            <Route path="*" element=
              {
              <main style={style}>
                This page is not routed. Click home above to go back to home page
              </main> 
              }
            />
          </Route>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
