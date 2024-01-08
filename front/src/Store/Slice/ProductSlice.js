import { createSlice } from "@reduxjs/toolkit";
import { GetProduct, GetCategory, GetSingleProduct, FilterProduct } from "../ProductAction";

const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState: {
    getProductLoading: false,
    getProductMsg: null,
    getAttribute:null,
    getCategoryLoading: false,
    getCategoryMsg: null,
    getSingleProductPLoading: false,
    getSingleProductMsg: null,
    getFilterProductLoading: false,
    getFilterProduct: null
  },
  extraReducers: {
    [GetProduct.pending]: (state) => {
      state.getProductLoading = true
      state.getProductMsg = null
      state.getAttribute = null
    },
    [GetProduct.fulfilled]: (state, { payload }) => {
      state.getProductLoading = false
      state.getProductMsg = payload.listToSend
      state.getAttribute =  payload.attributesObject
    },
    [GetProduct.rejected]: (state) => {
      state.getProductLoading = false
      state.getProductMsg = null
      state.getAttribute = null
    },
    [GetCategory.pending]: (state) => {
      state.getCategoryLoading = true
      state.getCategoryMsg = null
    },
    [GetCategory.fulfilled]: (state, { payload }) => {
      state.getCategoryLoading = false
      state.getCategoryMsg = payload
    },
    [GetCategory.rejected]: (state) => {
      state.getCategoryLoading = false
      state.getCategoryMsg = null
    },
    [GetSingleProduct.pending]: (state) => {
      state.getSingleProductPLoading = true
      state.getSingleProductMsg = null
    },
    [GetSingleProduct.fulfilled]: (state, { payload }) => {
      state.getSingleProductPLoading = false
      state.getSingleProductMsg = payload.product
    },
    [GetSingleProduct.rejected]: (state) => {
      state.getSingleProductPLoading = false
      state.getSingleProductMsg = null
    },
    [FilterProduct.pending]: (state) => {
      state.getFilterProductLoading = true
      state.getFilterProduct = null
    },
    [FilterProduct.fulfilled]: (state, { payload }) => {
      state.getFilterProductLoading = false
      state.getFilterProduct = payload
    },
    [FilterProduct.rejected]: (state) => {
      state.getFilterProductLoading = false
      state.getFilterProduct = null
    },
  }
})

export default ProductSlice.reducer;