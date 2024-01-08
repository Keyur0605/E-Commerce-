import { createSlice } from "@reduxjs/toolkit";
import { AddBanner,GetBanner ,DeleteBanner} from "../BannerAction";
const BannerSlice = createSlice({
    name:"BannerSlice",
    initialState:{
        bannerLoading:false,
        bannerMsg:null,
        GetbannerLoading:false,
        GetbannerMsg:null,
        DeleteBannerLoading:false,
        DeleteBannerMsg:null
    },
    extraReducers:{
        [AddBanner.pending]:(state)=>{
            state.bannerLoading = true
            state.bannerMsg = null
        },
        [AddBanner.fulfilled]:(state,{payload})=>{
            state.bannerLoading = false
            state.bannerMsg = payload
        },
        [AddBanner.rejected]:(state,{payload})=>{
            state.bannerLoading = false
            state.bannerMsg = null
        },
        [GetBanner.pending]:(state)=>{
            state.GetbannerLoading = true
            state.GetbannerMsg = null
        },
        [GetBanner.fulfilled]:(state,{payload})=>{
            state.GetbannerLoading = false
            state.GetbannerMsg = payload
        },
        [GetBanner.rejected]:(state,{payload})=>{
            state.GetbannerLoading = false
            state.GetbannerMsg = null
        },
        [DeleteBanner.pending]:(state)=>{
            state.DeleteBannerLoading = true
            state.DeleteBannerMsg = null
        },
        [DeleteBanner.fulfilled]:(state,{payload})=>{
            state.DeleteBannerLoading = false
            state.DeleteBannerMsg = payload
        },
        [DeleteBanner.rejected]:(state,{payload})=>{
            state.DeleteBannerLoading = false
            state.DeleteBannerMsg = null
        },
    }
})

export default BannerSlice.reducer