import {createSlice} from "@reduxjs/toolkit"
import { AddWishList ,DeleteWishList,GetWishList} from "../WishlistAction"


const WishListSlice = createSlice({
    name:"WishListSlice",
    initialState:{
        addWishListLoading:false,
        addWishListMsg:null,
        deleteWishlistLoading:false,
        deleteWishListMsg:null,
        getWishlistLoading:false,
        getWishListMsg:null
    },
    extraReducers:{

      [AddWishList.pending]:(state)=>{
        state.addWishListLoading= true
        state.addWishListMsg = null
      },
      [AddWishList.fulfilled]:(state,{payload})=>{
        state.addWishListLoading= false
        state.addWishListMsg = payload
      },
      [AddWishList.rejected]:(state,{payload})=>{
        state.addWishListLoading= false
        state.addWishListMsg = null
      },
      [DeleteWishList.pending]:(state)=>{
        state.deleteWishlistLoading= true
        state.deleteWishListMsg = null
      },
      [DeleteWishList.fulfilled]:(state,{payload})=>{
        state.deleteWishlistLoading= false
        state.deleteWishListMsg = payload
      },
      [DeleteWishList.rejected]:(state,{payload})=>{
        state.deleteWishlistLoading= false
        state.deleteWishListMsg = null
      },
      [GetWishList.pending]:(state)=>{
        state.getWishlistLoading= true
        state.getWishListMsg = null
      },
      [GetWishList.fulfilled]:(state,{payload})=>{
        state.getWishlistLoading= false
        state.getWishListMsg = payload
      },
      [GetWishList.rejected]:(state,{payload})=>{
        state.getWishlistLoading= false
        state.getWishListMsg = null
      },
    }
})


export default WishListSlice.reducer;