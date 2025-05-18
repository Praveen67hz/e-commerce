import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/shop';
import Cart from './Pages/Cart';
import Login from './Components/Authentication/Login';
import Signup from './Components/Authentication/Signup';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import { ToastContainer } from 'react-toastify';
import AddProduct from './Components/AddProduct/AddProduct';
import EditProduct from './Components/EditProduct/EditProduct';
import RemoveProduct from './Components/RemoveProduct/RemoveProduct';
import ProtectedRoute from './Components/ProtectedRoute';
import OrderSummary from './Pages/OrderSummary';
import ShippingPage from './Components/ShippingPage';
import Payment from './Components/Payment/Payment';
import OrderConfirmation from './Components/OrderConfirmation/OrderConfirmation';
import OrderHistory from './Components/OrderHistory/OrderHistory';
import AdminDashboard from './Components/ADMIN/AdminDashboard';
import AdminProducts from './Components/ADMIN/AdminProducts';
import AdminUsers from './Components/ADMIN/AdminUsers';
import Privacypolicy from './Components/Footer/Privacypolicy';
import TermsCondition from './Components/Footer/TermsCondition';
import CancellationandRefund from './Components/Footer/CancellationandRefund';
import ShippingDelivery from './Components/Footer/ShippingDelivery';
import ContactUs from './Components/Footer/ContactUs';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path ="/invoice" element ={<OrderSummary/>} />
          <Route path='/shipping' element = {<ShippingPage/>}/>
          <Route path = '/payment' element ={<Payment/>} />
          <Route path = '/orderconfirmation' element ={<OrderConfirmation/>}/>
          <Route path = '/orderhistory' element = {<OrderHistory/>}/>

        <Route path="/privacy-policy" element={<Privacypolicy />} />
        <Route path="/terms-and-conditions" element={<TermsCondition />} />
        <Route path="/cancellation-and-refund" element={<CancellationandRefund />} />
        <Route path="/shipping-and-delivery" element={<ShippingDelivery />} />
        <Route path="/contact-us" element={<ContactUs />} />
 
          <Route path="/addproduct" element={<ProtectedRoute adminOnly={true}><AddProduct /></ProtectedRoute>} />
          <Route path="/editproduct/:id" element={<ProtectedRoute adminOnly={true}><EditProduct /></ProtectedRoute>} />
          <Route path="/removeproduct/:id" element={<ProtectedRoute adminOnly={true}><RemoveProduct /></ProtectedRoute>} />
          <Route path="/admindashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/adminproducts" element={<ProtectedRoute adminOnly={true}><AdminProducts /></ProtectedRoute>} />
          <Route path="/adminusers" element={<ProtectedRoute adminOnly={true}><AdminUsers /></ProtectedRoute>} />


        </Routes>
        <Footer />
        <ToastContainer 
          position="top-right"
          autoClose={3000} 
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ marginTop: "90px" }} 
        />

      </BrowserRouter>
    </div>
  );
}

export default App;
