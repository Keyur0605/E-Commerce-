import {createSlice} from "@reduxjs/toolkit"
import {GetCoupon} from "../CouponAction"
const CouponSlice = createSlice({
    name:"CouponSlice",
    initialState:{
        getCouponLoading:false,
        getCouponMsg:null,
        getCouponError:null
    },
    extraReducers:{
     [GetCoupon.pending]:(state)=>{
        state.getCouponLoading=true
        state.getCouponMsg = null
        state.getCouponError = null
     },
     [GetCoupon.fulfilled]:(state , {payload})=>{
        state.getCouponLoading=false
        state.getCouponMsg = payload
        state.getCouponError = null
     },
     [GetCoupon.rejected]:(state,{payload})=>{
        state.getCouponLoading=false
        state.getCouponMsg = null
        state.getCouponError = payload
     }
    }
})


export default CouponSlice.reducer;