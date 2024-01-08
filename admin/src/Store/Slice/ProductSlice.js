import { createSlice } from "@reduxjs/toolkit";
import { AddProducts, GetProducts , UpdateProductStatus,DeleteProduct,UpdateProduct,UpdateProductSaleStatus,AdminProductFilter } from "../ProductAction";
const ProductSlice = createSlice({
   name: "ProductSlice",

   initialState: {
      AddProductLoading: false,
      AddProductMsg: null,
      AddProductError: null,
      GetProductLoading: false,
      GetProduct: null,
      GetBrand:null,
      GetProductError: null,
      updateStatusLoading:false,
      updateStatus : null,
      updateStatusError : null,
      DeleteLoading:false,
      DeleteMsg:null,
      DeleteError:null,
      UpdateProductLoading:false,
      UpdateProductMsg:null,
      UpdateProductError:null,
      UpdateProductSaleLoading:false,
      UpdateProductSaleMsg:null,
      filterProductLoading:false,
      filterProduct:null,
      filterProductError:null
      },

   extraReducers: {
      [AddProducts.pending]: (state) => {
         state.AddProductLoading = true
         state.AddProductMsg = null
        
         state.AddProductError = null
      },
      [AddProducts.fulfilled]: (state, { payload }) => {
         state.AddProductLoading = false
         state.AddProductMsg = payload
         state.AddProductError = null
         
      },
      [AddProducts.rejected]: (state, { payload }) => {
         state.AddProductLoading = false
         state.AddProductMsg = null
         state.AddProductError = payload
      },
      [GetProducts.pending]: (state) => {
         state.GetProductLoading = true
         state.GetProduct = null
         state.GetBrand = null
         state.GetProductError = null
      },
      [GetProducts.fulfilled]: (state, { payload }) => {
         state.GetProductLoading = false
         state.GetProduct = payload.productList
         state.GetBrand = payload.brandList
         state.GetProductError = null
        
      },
      [GetProducts.rejected]: (state, { payload }) => {
         state.GetProductLoading = false
         state.GetProduct = null
         state.GetBrand = null
         state.GetProductError = payload
      },
      [UpdateProductStatus.pending]: (state) => {
         state.updateStatusLoading = true
         state.updateStatus = null
         state.updateStatusError = null
      },
      [UpdateProductStatus.fulfilled]: (state, { payload }) => {
         state.updateStatusLoading = false
         state.updateStatus = payload
         state.updateStatusError = null 
      },
      [UpdateProductStatus.rejected]: (state, { payload }) => {
         state.updateStatusLoading = false
         state.updateStatus = null
         state.updateStatusError = payload
      },
      [DeleteProduct.pending]: (state) => {
         state.DeleteLoading = true
         state.DeleteMsg = null
         state.DeleteError = null
      },
      [DeleteProduct.fulfilled]: (state, { payload }) => {
         state.DeleteLoading = false
         state.DeleteMsg = payload
         state.DeleteError = null 
      },
      [DeleteProduct.rejected]: (state, { payload }) => {
         state.DeleteLoading = false
         state.DeleteMsg = null
         state.DeleteError = payload
      },
      [UpdateProduct.pending]: (state) => {
         state.UpdateProductLoading = true
         state.UpdateProductMsg = null
         state.UpdateProductError = null
      },
      [UpdateProduct.fulfilled]: (state, { payload }) => {
         state.UpdateProductLoading = false
         state.UpdateProductMsg = payload
         state.UpdateProductError = null 
      },
      [UpdateProduct.rejected]: (state, { payload }) => {
         state.UpdateProductLoading = false
         state.UpdateProductMsg = null
         state.UpdateProductError = payload
      },
      [UpdateProductSaleStatus.pending]: (state) => {
         state.UpdateProductSaleLoading = true
         state.UpdateProductSaleMsg = null
      },
      [UpdateProductSaleStatus.fulfilled]: (state, { payload }) => {
         state.UpdateProductSaleLoading = false
         state.UpdateProductSaleMsg = payload
      },
      [UpdateProductSaleStatus.rejected]: (state, { payload }) => {
         state.UpdateProductSaleLoading = false
         state.UpdateProductSaleMsg = null
      },
      [AdminProductFilter.pending]: (state) => {
         state.filterProductLoading = true
         state.filterProduct = null
         state.filterProductError = null
      },
      [AdminProductFilter.fulfilled]: (state, { payload }) => {
         state.filterProductLoading = false
         state.filterProduct = payload
         state.filterProductError = null
      },
      [AdminProductFilter.rejected]: (state, { payload }) => {
         state.filterProductLoading = false
         state.filterProduct = null
         state.filterProductError = payload
      },
   }
})

export default ProductSlice.reducer;