import { createSlice } from "@reduxjs/toolkit";
import {AddToCart , GetCart ,DeleteCart,UpdateCart} from "../CartAction"
const CartSlice = createSlice({
    name:"CartSlice",
    initialState:{
        cartAddLoading:false,
        cartMsg:null,
        cartError:null,
        cartGetLoading:false,
        cartGetMsg:null,
        cartGetError:null,
        cartDeleteLoading:false,
        cartDeleteMsg:null,
        cartUpdateLoading:false,
        cartUpdateMsg:null,
        cartUpdateError:null  
    },
    reducers:{
       
    },
    extraReducers:{
        [AddToCart.pending]:(state)=>{
            state.cartAddLoading = true
            state.cartMsg = null
            state.cartError = null
        },
        [AddToCart.fulfilled]:(state , {payload})=>{
            state.cartAddLoading = false
            state.cartMsg = payload
            state.cartError = null
        },
        [AddToCart.rejected]:(state  , {payload})=>{
            state.cartAddLoading = false
            state.cartMsg = null
            state.cartError = payload
        },
        [GetCart.pending]:(state)=>{
            state.cartGetLoading = true
            state.cartGetMsg = null
            state.cartGetError = null
        },
        [GetCart.fulfilled]:(state , {payload})=>{
            state.cartGetLoading = false
            state.cartGetMsg = payload
            state.cartGetError = null
        },
        [GetCart.rejected]:(state , {payload})=>{
            state.cartGetLoading = false
            state.cartGetMsg = null
            state.cartGetError = payload
        },
        [DeleteCart.pending]:(state)=>{
            state.cartDeleteLoading = true
            state.cartDeleteMsg = null
        },
        [DeleteCart.fulfilled]:(state , {payload})=>{
            state.cartDeleteLoading = false
            state.cartDeleteMsg = payload
        },
        [DeleteCart.rejected]:(state , {payload})=>{
            state.cartDeleteLoading = false 
            state.cartDeleteMsg = null
        },
        [UpdateCart.pending]:(state)=>{
            state.cartUpdateLoading = true
            state.cartUpdateMsg = null
            state.cartUpdateError = null
        },
        [UpdateCart.fulfilled]:(state , {payload})=>{
            state.cartUpdateLoading = false
            state.cartUpdateMsg = payload
            state.cartUpdateError = null
        },
        [UpdateCart.rejected]:(state  , {payload})=>{
            state.cartUpdateLoading = false
            state.cartUpdateMsg = null
            state.cartUpdateError = payload
        }
    }
})

export default CartSlice.reducer;