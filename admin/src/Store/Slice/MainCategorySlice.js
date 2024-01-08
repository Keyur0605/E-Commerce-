import {createSlice} from "@reduxjs/toolkit"
import {AddMainCate,GetMainCate,DeleteMainCate,UpdateMainCate} from "../CategoryAction"
const CategorySlice = createSlice({
    name:"category",
    initialState:{
     isLoading:false,
     MainCategory :null,
     isError:null,
     getLoading:false,
     getMainCate:[],
     getError:null,
     delLoading:false,
     delMsg:null,
     delError:null,
     updatemainLoading:false,
     updatemainMsg:null,
     updatemainError:null
    },
    extraReducers:{
     [AddMainCate.pending]:(state)=>{
        state.isLoading= true
        state.MainCategory=null
        state.isError=null
     },
     [AddMainCate.fulfilled]:(state, { payload })=>{
        state.isLoading=false
        state.MainCategory=payload
        state.isError = null
        
     },
     [AddMainCate.rejected]:(state,{payload})=>{
        state.isLoading=false
        state.MainCategory=null
        state.isError=payload
     },

     [GetMainCate.pending]:(state)=>{
      state.getLoading= true
      state.getMainCate=[]
      state.getError=null
   },
   [GetMainCate.fulfilled]:(state, { payload })=>{
      state.getLoading=false
      state.getMainCate=payload
      state.getError = null
   },
   [GetMainCate.rejected]:(state,{payload})=>{
      state.getLoading=false
      state.getMainCate=[]
      state.getError=payload
   },

   [DeleteMainCate.pending]:(state)=>{
      state.delLoading= true
      state.delMsg=null
      state.delError=null
   },
   [DeleteMainCate.fulfilled]:(state, { payload })=>{
      state.delLoading=false
      state.delMsg=payload
      state.delError = null
   },
   [DeleteMainCate.rejected]:(state,{payload})=>{
      state.delLoading=false
      state.delMsg=null
      state.delError=payload
   },

   [UpdateMainCate.pending]:(state)=>{
      state.updatemainLoading= true
      state.updatemainMsg=null
      state.updatemainError=null
   },
   [UpdateMainCate.fulfilled]:(state, { payload })=>{
      state.updatemainLoading=false
      state.updatemainMsg=payload
      state.updatemainError = null
   },
   [UpdateMainCate.rejected]:(state,{payload})=>{
      state.updatemainLoading=false
      state.updatemainMsg=null
      state.updatemainError=payload
   },

    }
})

export default CategorySlice.reducer