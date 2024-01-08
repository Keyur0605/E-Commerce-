import { createSlice } from "@reduxjs/toolkit";
import {GetStatisticData} from "../StatisticAction"

const StatisticSlice = createSlice({
    name:"StatisticSlice",
    initialState:{
        getStatisticLoading:false,
        getStatisticMsg:null,
        getStatisticError:null,
    },
    extraReducers:{
        [GetStatisticData.pending]:(state)=>{
            state.getStatisticLoading  = true
            state.getStatisticMsg  = null
            state.getStatisticError  = null
        },
        [GetStatisticData.fulfilled]:(state,{payload})=>{
            state.getStatisticLoading  = false
            state.getStatisticMsg  = payload
            state.getStatisticError  = null
        },
        [GetStatisticData.rejected]:(state,{payload})=>{
            state.getStatisticLoading  = false
            state.getStatisticMsg  = null
            state.getStatisticError  = payload
        }
    }
})

export default StatisticSlice.reducer