import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BestSellers from './components/bestSeller/BestSellers';
import { Shop, ShopCategory, LoginSignup } from './pages';
import Product from './pages/products/Product';
import Cart from './pages/Cart';
import Checkout from './pages/checkout/CheckOut';
import ReviewOrderPage from './pages/order/ReviewOrder';
import OrderConfirmationPage from './pages/checkout/confirmation';
import AddProduct from './pages/products/AddProduct';
import SocialLogin from './hooks/auth/SocialLogin';
import Category from './components/Category.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import AddUser from './components/admin/AddUser.jsx';
import AddCategory from './components/admin/AddCategory.jsx';  
import Payment from './pages/payment/payment.jsx';
import MobileMoneyPaymentPage from './pages/payment/MobileMoney.jsx';
import InvoicePage from './pages/payment/Invoice.jsx';
import ProtectedRoute from './components/ProductRoute.jsx'; // Import ProtectedRoute
import AdminLogin from './components/admin/AdminLogin.jsx';
import AdminRegister from './components/admin/AdminRegister.jsx';
import SearchPage from './components/search/search.jsx';
import Favorite from './pages/favorite.jsx';
import Register from './hooks/auth/Register.jsx';
import Profile from './pages/profile/Profile.jsx';
import Notification from './pages/Notification.jsx';
import OrderPage from './pages/order/OrderPage.jsx';
import NotFound from './components/NotFound.jsx';

const Home = () => (
  <>
    <Category />
    <BestSellers />
  </>
);

const App = () => {
  const location = useLocation();

  return (
    <div>
      {/* Render Navbar and Footer only if not on the /admins or its subroutes */}
      {!location.pathname.startsWith("/admins") && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/product">
          <Route path=":id" element={<Product />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<SocialLogin />} />
        <Route path="/reviewOrder" element={<ReviewOrderPage />} />
        <Route path="/confirmation" element={<OrderConfirmationPage />} />
        
        {/* Admin Protected Routes */}
        <Route path="/admins" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admins/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
        <Route path="/admins/add-category" element={<ProtectedRoute><AddCategory /></ProtectedRoute>} />
        <Route path="/admins/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
        
        <Route path="/search" element={<SearchPage />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/mobile-money" element={<MobileMoneyPaymentPage/>} />
        <Route path="/invoice/:invoiceId" element={<InvoicePage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admins/admin-register" element={<AdminRegister />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/order' element={<OrderPage />} />
        <Route path="*" element={<NotFound />} /> {/* Fallback for unmatched paths */}
      </Routes>

      {!location.pathname.startsWith("/admins") && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
