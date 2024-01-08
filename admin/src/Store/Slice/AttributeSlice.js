import { createSlice } from "@reduxjs/toolkit";
import { GetAttributeList,GetAttributeGroup,AddAttribute,DeleteAttribute } from "../AttributeAction";
const AttributeSlice = createSlice({
    name:"AttributeSlice",
    initialState:{
        attribute:[],
        isLoading:false,
        isError:null,
        isLoadingAttribute:false,
        isErrorAttribute:null,
        attributeGroup:[],
        loading:false,
        error:false,
        AddAttri:null,
        delLoading:false,
        delError:null,
        delMsg:null,

    },
    extraReducers:{
        [GetAttributeList.pending]: (state) => {
            state.isLoading = true
            state.attribute = null
            state.isError = null
          },
          [GetAttributeList.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.attribute = payload
            state.isError = false 
          },
          [GetAttributeList.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.attribute = null
            state.isError = payload
          },


          [GetAttributeGroup.pending]: (state) => {
            state.isLoadingAttribute = true
            state.attributeGroup = null
            state.isErrorAttribute = null
          },
          [GetAttributeGroup.fulfilled]: (state, { payload }) => {
            state.isLoadingAttribute = false
            state.attributeGroup = payload
            state.isErrorAttribute = false 
          },
          [GetAttributeGroup.rejected]: (state, { payload }) => {
            state.isLoadingAttribute = false
            state.attributeGroup = null
            state.isErrorAttribute = payload
          },

          
          [AddAttribute.pending]: (state) => {
            state.loading = true
            state.AddAttri = null
            state.error = null
           
          },
          [AddAttribute.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.AddAttri = payload
            state.error = false 
            
          },
          [AddAttribute.rejected]: (state, { payload }) => {
            state.loading = false
            state.AddAttri = null
            state.error = payload
            
          },


          [DeleteAttribute.pending]: (state) => {
            state.delLoading = true
            state.delMsg = null
            state.delError = null
           
          },
          [DeleteAttribute.fulfilled]: (state, { payload }) => {
            state.delLoading = false
            state.delMsg = payload
            state.delError = false 
            
          },
          [DeleteAttribute.rejected]: (state, { payload }) => {
            state.delLoading = false
            state.delMsg = null
            state.delError = payload
           
          },
          
         
    }
    
})

export default AttributeSlice.reducer 