import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import SideBar from "./components/Sidebar/SideBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddMainCategory from "./pages/AddMainCategory";
import ProductList from "./pages/ProductList";
import AddCategory from "./pages/AddCategory";
import AddSubCategory from "./pages/AddSubCategory";
import Banner from "./pages/Banner";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import OrderList from "./pages/OrderList";
import Attribute from "./pages/Attribute";
import AddProduct from "./pages/AddProduct";
import Login from "./components/Login"
import Protected from "./components/Protected";
import "./Style/Category.css"
import Policy from "./pages/Policy";
import Coupon from "./pages/Coupon";
import UpdateProductPage from "./pages/UpdateProduct";
import PageNotFound from "./pages/PageNotFound";
import OrderItem from "./pages/OrderItem";
import Logo from "./pages/Logo";
import { useEffect,useState } from "react";
function App() {

  const[admin,setAdmin]=useState("")
 
  useEffect(()=>{
    if(localStorage.getItem("isAdmin")){
      var isadmin = JSON.parse(localStorage.getItem("isAdmin"))
      setAdmin(isadmin)
    }
  },[])
 
  return (
    <>
   <ToastContainer/>
    <Router>
      {admin  ?<SideBar>
        <Routes>
          <Route path="/" element={<Protected Cmp={Dashboard}/>} />
          <Route path="/category/maincategory" element={<Protected Cmp={AddMainCategory}/>} />
          <Route path="/category/category" element={<Protected Cmp={AddCategory}/>} />
          <Route path="/category/subcategory" element={<Protected Cmp={AddSubCategory}/>} />
          <Route path="/banner" element={<Protected Cmp={Banner}/>} />
          <Route path="/contact" element={<Protected Cmp={Contact}/>} />
          <Route path="/product" element={<Protected Cmp={Product}/>} />
          <Route path="/product/add" element={<Protected Cmp={AddProduct}/>}/>
          <Route path="/product/:update" element={<Protected Cmp={UpdateProductPage}/>}/>
          <Route path="/product/list" element={<Protected Cmp={ProductList}/>}/>
          <Route path="/order" element={<Protected Cmp={OrderList}/>} />
          <Route path="/order/:id" element={<Protected Cmp={OrderItem}/>} />
          <Route path="/attribute" element={<Protected Cmp={Attribute}/>} />
          <Route path="/policy" element={<Protected Cmp={Policy}/>} />
          <Route path="/logo" element={<Protected Cmp={Logo}/>} />
          <Route path="/coupon" element={<Protected Cmp={Coupon}/>} />
          <Route path="*" element={<PageNotFound/>} />
          <Route path="/login" element={<Login/>}/> 
        </Routes>
      </SideBar>: <Routes>
          <Route path="/" element={<Protected Cmp={Dashboard}/>} />
          <Route path="/category/maincategory" element={<Protected Cmp={AddMainCategory}/>} />
          <Route path="/category/category" element={<Protected Cmp={AddCategory}/>} />
          <Route path="/category/subcategory" element={<Protected Cmp={AddSubCategory}/>} />
          <Route path="/banner" element={<Protected Cmp={Banner}/>} />
          <Route path="/contact" element={<Protected Cmp={Contact}/>} />
          <Route path="/product" element={<Protected Cmp={Product}/>} />
          <Route path="/product/add" element={<Protected Cmp={AddProduct}/>}/>
          <Route path="/product/:update" element={<Protected Cmp={UpdateProductPage}/>}/>
          <Route path="/product/list" element={<Protected Cmp={ProductList}/>}/>
          <Route path="/order" element={<Protected Cmp={OrderList}/>} />
          <Route path="/order/:id" element={<Protected Cmp={OrderItem}/>} />
          <Route path="/attribute" element={<Protected Cmp={Attribute}/>} />
          <Route path="/policy" element={<Protected Cmp={Policy}/>} />
          <Route path="/logo" element={<Protected Cmp={Logo}/>} />
          <Route path="/coupon" element={<Protected Cmp={Coupon}/>} />
          <Route path="*" element={<PageNotFound/>} />
          <Route path="/login" element={<Login/>}/> 
        </Routes> }
    </Router>
    </>
  );
}

export default App;
