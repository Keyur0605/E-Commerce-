import {createSlice} from "@reduxjs/toolkit"
import { GetContact } from "../ContactAction";
const ContactSlice = createSlice({
    name:"ContactSlice",
    initialState:{
        getContactLoading:false,
        getContactMsg:null,
    },extraReducers:{
       [GetContact.pending]:(state)=>{
        state.getContactLoading = true
        state.getContactMsg  = null
       },
       [GetContact.fulfilled]:(state,{payload})=>{
        state.getContactLoading = false
        state.getContactMsg  = payload
       },
       [GetContact.rejected]:(state)=>{
        state.getContactLoading = false
        state.getContactMsg  = null
       },
       
    }
})

export default ContactSlice.reducer;