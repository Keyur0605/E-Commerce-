import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import UserLRSyatem from "./components/UserLRSystem";
import Home from "./pages/Home";
import Header from "./pages/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import "../node_modules/slick-carousel/slick/slick.css" 
import "../node_modules/slick-carousel/slick/slick-theme.css"
import Wishlist from "./pages/Wishlist";
import CategoryProduct from "./pages/CategoryProduct";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart"
import PageNotFound from "./pages/PageNotFound";
import MyOrder from "./pages/MyOrder";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "./pages/Footer";
function App() {

  return (
    <>

      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={< Home />} />
          <Route path="/product" element={< CategoryProduct />} />
          <Route path="/singleproduct/:id" element={< SingleProduct />} />
          <Route path="/wishlist" element={< ProtectedRoute Cmp={Wishlist } />} />
          <Route path="/login" element={<UserLRSyatem />} />
          <Route path="/cart" element={< ProtectedRoute Cmp={Cart }/>} />
          <Route path="/myorder" element={< ProtectedRoute Cmp={MyOrder }/>} />
          <Route path="/*" element={<PageNotFound />} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
