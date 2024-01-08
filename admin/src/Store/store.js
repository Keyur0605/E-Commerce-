import { configureStore } from "@reduxjs/toolkit";
import AttributeSlice from "./Slice/AttributeSlice"
import UserAuth from "./Slice/UserAuth";
import MainCategorySlice from "./Slice/MainCategorySlice";
import Category from "./Slice/CategorySlice"
import SubCategorySlice from "./Slice/SubCategorySlice";
import ProductSlice from "./Slice/ProductSlice";
import BannerSlice from "./Slice/BannerSlice";
import PolicySlice from "./Slice/PolicySlice";
import ContactSlice from "./Slice/ContactSlice";
import CouponSlice from "./Slice/CouponSlice";
import OrderSlice from "./Slice/OrderSlice";
import OrderItemSlice from "./Slice/OrderItemSlice";
import LogoSlice from "./Slice/LogoSlice";
import StatisticSlice from "./Slice/StatisticSlice";
const store = configureStore({
    reducer:{
       attribute : AttributeSlice,
       userAuth : UserAuth,
       main_category:MainCategorySlice,
       category:Category,
       sub_category:SubCategorySlice,
       product:ProductSlice,
       banner:BannerSlice,
       policy:PolicySlice,
       contact:ContactSlice,
       coupon:CouponSlice,
       order:OrderSlice,
       orderitem:OrderItemSlice,
       logo:LogoSlice,
       statistic:StatisticSlice
    }
})

export default store;