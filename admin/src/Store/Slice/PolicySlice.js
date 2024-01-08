import {createSlice} from "@reduxjs/toolkit"
import { AddPolicy,GetPolicy,UpdatePolicy,DeletePolicy } from "../PolicyAction"

const PolicySlice = createSlice({
    name:"PolicySlice",
    initialState:{
        addPolicyLoader:false,
        addPolicyMsg:null,
        getPolicyLoader:false,
        getPolicyMsg:null,
        deletePolicyLoading:false,
        deletePolicyMsg:null,
        updatePolicyLoading:false,
        updatePolicyMsg:null

    },
    extraReducers:{
        [AddPolicy.pending]:(state)=>{
            state.addPolicyLoader=true
            state.addPolicyMsg=null
        },
        [AddPolicy.fulfilled]:(state,{payload})=>{
            state.addPolicyLoader=false
            state.addPolicyMsg=payload
        },
        [AddPolicy.rejected]:(state)=>{
            state.addPolicyLoader=false
            state.addPolicyMsg=null
        },
        [GetPolicy.pending]:(state)=>{
            state.getPolicyLoader=true
            state.getPolicyMsg=null
        },
        [GetPolicy.fulfilled]:(state,{payload})=>{
            state.getPolicyLoader=false
            state.getPolicyMsg=payload
        },
        [GetPolicy.rejected]:(state)=>{
            state.getPolicyLoader=false
            state.getPolicyMsg=null
        },
        [UpdatePolicy.pending]:(state)=>{
            state.updatePolicyLoading=true
            state.updatePolicyMsg=null
        },
        [UpdatePolicy.fulfilled]:(state,{payload})=>{
            state.updatePolicyLoading=false
            state.updatePolicyMsg=payload
        },
        [UpdatePolicy.rejected]:(state)=>{
            state.updatePolicyLoading=false
            state.updatePolicyMsg=null
        },
        [DeletePolicy.pending]:(state)=>{
            state.deletePolicyLoading=true
            state.deletePolicyMsg=null
        },
        [DeletePolicy.fulfilled]:(state,{payload})=>{
            state.deletePolicyLoading=false
            state.deletePolicyMsg=payload
        },
        [DeletePolicy.rejected]:(state)=>{
            state.deletePolicyLoading=false
            state.deletePolicyMsg=null
        },
    }
})

export default PolicySlice.reducer