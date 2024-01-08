import { createSlice } from "@reduxjs/toolkit";
import { GetBanner ,GetMainCate} from "../BannerAction";

const BannerSlice = createSlice({
    name:"BannerSlice",
    initialState:{
      getBannerLoading:false,
      getBannerMsg:null,
      getMainCateLoading:false,
      getMainCate:null
    },
    extraReducers:{
        [GetBanner.pending]:(state)=>{
            state.getBannerLoading=true
            state.getBannerMsg= null
        },
        [GetBanner.fulfilled]:(state,{payload})=>{
            state.getBannerLoading=false
            state.getBannerMsg= payload
        },
        [GetBanner.rejected]:(state)=>{
            state.getBannerLoading=false
            state.getBannerMsg= null
        },
        [GetMainCate.pending]:(state)=>{
            state.getMainCateLoading=true
            state.getMainCate= null
        },
        [GetMainCate.fulfilled]:(state,{payload})=>{
            state.getMainCateLoading=false
            state.getMainCate= payload
            
        },
        [GetMainCate.rejected]:(state)=>{
            state.getMainCateLoading=false
            state.getMainCate= null
        },
    }
})


export default BannerSlice.reducer