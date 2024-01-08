import {createSlice} from "@reduxjs/toolkit"
import { AddContact ,GetContact , UpdateContact} from "../ContactAction";
const ContactSlice = createSlice({
    name:"ContactSlice",
    initialState:{
        addContactLoading:false,
        addContactMsg:null,
        getContactLoading:false,
        getContactMsg:null,
        updateContactLoading : false,
        updateContactMsg : null

    },extraReducers:{
       [AddContact.pending]:(state)=>{
        state.addContactLoading = true
        state.addContactMsg = null
       },
       [AddContact.fulfilled]:(state,{payload})=>{
        state.addContactLoading = false
        state.addContactMsg = payload
       },
       [AddContact.rejected]:(state)=>{
        state.addContactLoading = false
        state.addContactMsg = null
       },
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
       [UpdateContact.pending]:(state)=>{
        state.updateContactLoading = true
        state.updateContactMsg  = null
       },
       [UpdateContact.fulfilled]:(state,{payload})=>{
        state.updateContactLoading = false
        state.updateContactMsg  = payload
       },
       [UpdateContact.rejected]:(state)=>{
        state.updateContactLoading = false
        state.updateContactMsg  = null
       },
    }
})

export default ContactSlice.reducer;