import {createSlice} from "@reduxjs/toolkit"
import { GetOrder,GetOrderItem ,DeleteOrder,UpdateOrderStatus,UpdateRefundStatus,SerachOrder} from "../OrderAction";
const OrderSlice=createSlice({
    name:"OrderSlice",
    initialState:{
        getOrderListLoading:false,
        getOrderListMsg:null,
        getOrderListError:null,
        getOrderItemListLoading:false,
        getOrderItemListMsg:null,
        getOrderItemListError:null,
        deleteorderLoading:false,
        deleteOrderMsg:null,
        updateOrderStatusLoading:false,
        updateOrderStatusMsg:null,
        updateOrderStatusError:null,
        updateRefundStatusLoading:false,
        updateRefundStatusMsg:null,
        updateRefundStatusError:null,
        searchOrderLoading:false,
        searchOrderMsg:null,
        searchOrderError:null,
    },
    extraReducers:{
        [GetOrder.pending]:(state)=>{
            state.getOrderListLoading = true
            state.getOrderListMsg = null
            state.getOrderListError = null
        },
        [GetOrder.fulfilled]:(state,{payload})=>{
            state.getOrderListLoading = false
            state.getOrderListMsg = payload
            state.getOrderListError = null
        },
        [GetOrder.rejected]:(state,{payload})=>{
            state.getOrderListLoading = false
            state.getOrderListMsg = null
            state.getOrderListError = payload
        },
        [GetOrderItem.pending]:(state)=>{
            state.getOrderItemListLoading = true
            state.getOrderItemListMsg = null
            state.getOrderItemListError = null
        },
        [GetOrderItem.fulfilled]:(state,{payload})=>{
            state.getOrderItemListLoading = false
            state.getOrderItemListMsg = payload
            state.getOrderItemListError = null
        },
        [GetOrderItem.rejected]:(state,{payload})=>{
            state.getOrderItemListLoading = false
            state.getOrderItemListMsg = null
            state.getOrderItemListError = payload
        },
        [DeleteOrder.pending]:(state)=>{
            state.deleteorderLoading = true
            state.deleteOrderMsg = null 
        },
        [DeleteOrder.fulfilled]:(state,{payload})=>{
            state.deleteorderLoading = false
            state.deleteOrderMsg = payload
        },
        [DeleteOrder.rejected]:(state)=>{
            state.deleteorderLoading = false
            state.deleteOrderMsg = null
        },
        [UpdateOrderStatus.pending]:(state)=>{
            state.updateOrderStatusLoading = true
            state.updateOrderStatusMsg = null
            state.updateOrderStatusError = null
        },
        [UpdateOrderStatus.fulfilled]:(state,{payload})=>{
            state.updateOrderStatusLoading = false
            state.updateOrderStatusMsg = payload
            state.updateOrderStatusError = null
        },
        [UpdateOrderStatus.rejected]:(state,{payload})=>{
            state.updateOrderStatusLoading = false
            state.updateOrderStatusMsg = null
            state.updateOrderStatusError = payload
        },
        [UpdateRefundStatus.pending]:(state)=>{
            state.updateRefundStatusLoading = true
            state.updateRefundStatusMsg = null
            state.updateRefundStatusError = null
        },
        [UpdateRefundStatus.fulfilled]:(state,{payload})=>{
            state.updateRefundStatusLoading = false
            state.updateRefundStatusMsg = payload
            state.updateRefundStatusError = null
        },
        [UpdateRefundStatus.rejected]:(state,{payload})=>{
            state.updateRefundStatusLoading = false
            state.updateRefundStatusMsg = null
            state.updateRefundStatusError = payload
        },
        [SerachOrder.pending]:(state)=>{
            state.searchOrderLoading = true
            state.searchOrderMsg = null
            state.searchOrderError = null
        },
        [SerachOrder.fulfilled]:(state,{payload})=>{
            state.searchOrderLoading = false
            state.searchOrderMsg = payload
            state.searchOrderError = null
        },
        [SerachOrder.rejected]:(state,{payload})=>{
            state.searchOrderLoading = false
            state.searchOrderMsg = null
            state.searchOrderError = payload
        },
    }
})

export default OrderSlice.reducer;