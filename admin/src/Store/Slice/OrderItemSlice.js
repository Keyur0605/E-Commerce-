import { createSlice } from "@reduxjs/toolkit";
import { UpdateOrderItemQuantity,DeleteOrderItem } from "../OrderItemAction";


const OrderItemSlice=createSlice({
    name:"OrderItemSlice",
    initialState:{
        updateOrderQuantityLoading:false,
        updateOrderQuantityMsg:null,
        updateOrderQuantityError:null,
        deleteOrderQuantityLoading:false,
        deleteOrderQuantityMsg:null,
        deleteOrderQuantityError:null
    },
    extraReducers:{
        [UpdateOrderItemQuantity.pending]:(state)=>{
            state.updateOrderQuantityLoading = true
            state.updateOrderQuantityMsg = null
            state.updateOrderQuantityError = null
        },
        [UpdateOrderItemQuantity.fulfilled]:(state,{payload})=>{
            state.updateOrderQuantityLoading = false
            state.updateOrderQuantityMsg = payload
            state.updateOrderQuantityError = null
        },
        [UpdateOrderItemQuantity.rejected]:(state,{payload})=>{
            state.updateOrderQuantityLoading = false
            state.updateOrderQuantityMsg = null
            state.updateOrderQuantityError = payload
        },
        [DeleteOrderItem.pending]:(state)=>{
            state.deleteOrderQuantityLoading = true
            state.deleteOrderQuantityMsg = null
            state.deleteOrderQuantityError = null
        },
        [DeleteOrderItem.fulfilled]:(state,{payload})=>{
            state.deleteOrderQuantityLoading = false
            state.deleteOrderQuantityMsg = payload
            state.deleteOrderQuantityError = null
        },
        [DeleteOrderItem.rejected]:(state,{payload})=>{
            state.deleteOrderQuantityLoading = false
            state.deleteOrderQuantityMsg = null
            state.deleteOrderQuantityError = payload
        }
    }
})

export default OrderItemSlice.reducer;