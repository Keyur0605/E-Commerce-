import { createSlice } from "@reduxjs/toolkit";
import { AddCate,GetCate ,DeleteCate,UpdateCate,GetCateId} from "../CategoryAction";

const CategorySlice = createSlice({
    name:"Category",
    initialState:{
        isLoading:false,
        isError:null,
        AddCategoryMsg:null,
        getCateLoading:false,
        getCate:[],
        getCateError:null,
        delLoading:false,
        delSuucess:false,
        delError:null,
        updateLoading:false,
        updateMsg:null,
        updateError:null,
        getCateIdLoading:false,
        getIdCate:[],
        getCateIdError:null,
    }, extraReducers:{
        [AddCate.pending]:(state)=>{
            state.isLoading = true
            state.AddCategoryMsg = null
            state.isError = null
        },
        [AddCate.fulfilled]:(state,{payload})=>{
            state.isLoading = false
            state.AddCategoryMsg = payload
            state.isError = null
        },
        [AddCate.rejected]:(state,{payload})=>{
            state.isLoading = false
            state.AddCategoryMsg = null
            state.isError = payload
        },

        [GetCate.pending]:(state)=>{
            state.getCateLoading= true
            state.getCate=[]
            state.getCateError=null
         },
         [GetCate.fulfilled]:(state, { payload })=>{
            state.getCateLoading=false
            state.getCate=payload
            state.getCateError = null
         },
         [GetCate.rejected]:(state,{payload})=>{
            state.getCateLoading=false
            state.getCate=[]
            state.getCateError=payload
         },
         [DeleteCate.pending]:(state)=>{
            state.delLoading= true
            state.delSuucess=false
            state.delError=null
         },
         [DeleteCate.fulfilled]:(state, { payload })=>{
            state.delLoading=false
            state.delSuucess=true
            state.delError = null
         },
         [DeleteCate.rejected]:(state,{payload})=>{
            state.delLoading=false
            state.delSuucess=false
            state.delError=payload
         },

         [UpdateCate.pending]:(state)=>{
            state.updateLoading= true
            state.updateMsg=null
            state.updateError=null
         },
         [UpdateCate.fulfilled]:(state, { payload })=>{
            state.updateLoading=false
            state.updateMsg=payload
            state.updateError = null
         },
         [UpdateCate.rejected]:(state,{payload})=>{
            state.updateLoading=false
            state.updateMsg=null
            state.updateError=payload
         },
         [GetCateId.pending]:(state)=>{
            state.getCateIdLoading= true
            state.getIdCate=[]
            state.getCateIdError=null
         },
         [GetCateId.fulfilled]:(state, { payload })=>{
            state.getCateIdLoading=false
            state.getIdCate=payload
            state.getCateIdError = null
         },
         [GetCateId.rejected]:(state,{payload})=>{
            state.getCateIdLoading=false
            state.getIdCate=[]
            state.getCateIdError=payload
         },
    }
})

export default CategorySlice.reducer