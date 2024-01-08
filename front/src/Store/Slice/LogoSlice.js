import {createSlice} from "@reduxjs/toolkit"
import {GetLogo} from "../LogoAction"
const LogoSlice=createSlice({
    name:"LogoSlice",
    initialState:{
       
        getLogoLoading:false,
        getLogoMsg:null,
        getLogoError:null,
   
    },
    extraReducers:{
       
        [GetLogo.pending]:(state)=>{
            state.getLogoLoading=true
            state.getLogoMsg=null
            state.getLogoError=null
        },
        [GetLogo.fulfilled]:(state,{payload})=>{
            state.getLogoLoading=false
            state.getLogoMsg=payload
            state.getLogoError=null
        },
        [GetLogo.rejected]:(state,{payload})=>{
            state.getLogoLoading=false
            state.getLogoMsg=null
            state.getLogoError=payload
        },
        
    }
});

export default LogoSlice.reducer;