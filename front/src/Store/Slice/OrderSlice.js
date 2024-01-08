import {createSlice} from "@reduxjs/toolkit";
import { AddOrder ,UserOrder} from "../OrderAction";
const OrderSlice=createSlice({
    name:"OrderSlice",
    initialState:{
        addOrderLoading:false,
        addOrderMsg:null,
        addOrderError:null,
        userOrderLoading:false,
        userOrderMsg:null,
        userOrderError:null
    },
    extraReducers:{
        [AddOrder.pending]:(state)=>{
            state.addOrderLoading=true
            state.addOrderMsg=null
            state.addOrderError=null
        },
        [AddOrder.fulfilled]:(state,{payload})=>{
            state.addOrderLoading=false
            state.addOrderMsg=payload
            state.addOrderError=null
        }, 
        [AddOrder.rejected]:(state,{payload})=>{
            state.addOrderLoading=false
            state.addOrderMsg=null
            state.addOrderError=payload
        },
        [UserOrder.pending]:(state)=>{
            state.userOrderLoading=true
            state.userOrderMsg=null
            state.userOrderError=null
        },
        [UserOrder.fulfilled]:(state,{payload})=>{
            state.userOrderLoading=false
            state.userOrderMsg=payload
            state.userOrderError=null
        }, 
        [UserOrder.rejected]:(state,{payload})=>{
            state.userOrderLoading=false
            state.userOrderMsg=null
            state.userOrderError=payload
        },
    }
})

export default OrderSlice.reducer;