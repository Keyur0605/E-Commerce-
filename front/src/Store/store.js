import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import BannerSlice from "./Slice/BannerSlice";
import ProductSlice from "./Slice/ProductSlice";
import AttributeSlice from "./Slice/AttributeSlice";
import WishlistSlice from "./Slice/WishlistSlice";
import CartSlice from "./Slice/CartSlice";
import CouponSlice from "./Slice/CouponSlice";
import AddressSlice from "./Slice/AddressSlice";
import OrderSlice from "./Slice/OrderSlice";
import LogoSlice from "./Slice/LogoSlice";
import ContactSlice from "./Slice/ContactSlice";
const store = configureStore({
    reducer:{
        user:userSlice,
        banner:BannerSlice,
        product:ProductSlice,
        attribute:AttributeSlice,
        wish:WishlistSlice,
        cart:CartSlice,
        coupon:CouponSlice,
        address:AddressSlice,
        order:OrderSlice,
        logo:LogoSlice,
        contact:ContactSlice
    }
})

export default store