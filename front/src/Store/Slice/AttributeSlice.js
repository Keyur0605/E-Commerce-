import { createSlice } from "@reduxjs/toolkit";
import { GetAttrbute } from "../AttributeAction";

const AttributeSlice = createSlice({
    name:"AttributeSlice",
    initialState:{
        getAttributeLoading:false,
        getAttributeMsg:null
    },
    extraReducers:{
        [GetAttrbute.pending]:(state)=>{
            state.getAttributeLoading=true
            state.getAttributeMsg=null
        },
        [GetAttrbute.fulfilled]:(state,{payload})=>{
            state.getAttributeLoading=false
            state.getAttributeMsg=payload
        },
        [GetAttrbute.rejected]:(state)=>{
            state.getAttributeLoading=false
            state.getAttributeMsg=null
        }
    }
})

export default AttributeSlice.reducer;