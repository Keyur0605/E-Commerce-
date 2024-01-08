import {createSlice} from "@reduxjs/toolkit"
import { AddAddress,GetAddress ,DeleteAddress} from "../AddressAction";
const AddressSlice = createSlice({
    name:"AddressSlice",
    initialState:{
        addAddressLoading:false,
        addAddressMsg:null,
        addAddressError:null,
        getAddressLoading:false,
        getAddressMsg:null,
        getAddressError:null,
        deleteAddressLoading:false,
        deleteAddressMsg:null,
        deleteAddressError:null
    },
    extraReducers:{
        [AddAddress.pending]:(state)=>{
            state.addAddressLoading=true
            state.addAddressMsg=null
            state.addAddressError=null
        },
        [AddAddress.fulfilled]:(state , {payload})=>{
            state.addAddressLoading=false
            state.addAddressMsg=payload
            state.addAddressError=null
        },
        [AddAddress.rejected]:(state , {payload})=>{
            state.addAddressLoading=false
            state.addAddressMsg=null
            state.addAddressError=payload
        },
        [GetAddress.pending]:(state)=>{
            state.getAddressLoading=true
            state.getAddressMsg=null
            state.getAddressError=null
        },
        [GetAddress.fulfilled]:(state , {payload})=>{
            state.getAddressLoading=false
            state.getAddressMsg=payload
            state.getAddressError=null
        },
        [GetAddress.rejected]:(state , {payload})=>{
            state.getAddressLoading=false
            state.getAddressMsg=null
            state.getAddressError=payload
        },
        [DeleteAddress.pending]:(state)=>{
            state.deleteAddressLoading=true
            state.deleteAddressMsg=null
            state.deleteAddressError=null
        },
        [DeleteAddress.fulfilled]:(state , {payload})=>{
            state.deleteAddressLoading=false
            state.deleteAddressMsg=payload
            state.deleteAddressError=null
        },
        [DeleteAddress.rejected]:(state , {payload})=>{
            state.deleteAddressLoading=false
            state.deleteAddressMsg=null
            state.deleteAddressError=payload
        },
    }
})


export default AddressSlice.reducer;