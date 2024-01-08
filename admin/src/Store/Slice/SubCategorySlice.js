import { createSlice } from "@reduxjs/toolkit";
import { GetSubCate, AddSubCate, DeleteSubCate, UpdateSubCate, GetSubCateId } from "../CategoryAction";

const SubCategorySlice = createSlice({
  name: "SubCategory",
  initialState: {
    isLoading: false,
    isError: null,
    SubCate: null,
    getSubLoading: false,
    getSubError: null,
    getSubCate: [],
    delLoading: false,
    delMsg: null,
    delError: null,
    updateSubLoading: false,
    updateSubMsg: null,
    updateSubError: null,
    getSubCateIdLoading: false,
    getSubIdCate: [],
    getSubCateIdError: null,
  },
  extraReducers: {
    [AddSubCate.pending]: (state) => {
      state.isLoading = true
      state.isError = null
      state.SubCate = null
    },
    [AddSubCate.fulfilled]: (state, { payload }) => {
      state.isLoading = false
      state.isError = null
      state.SubCate = payload
    },
    [AddSubCate.rejected]: (state, { payload }) => {
      state.isLoading = false
      state.isError = payload
      state.SubCate = null
    },

    [GetSubCate.pending]: (state) => {
      state.getSubLoading = true
      state.getSubError = null
      state.getSubCate = null
    },
    [GetSubCate.fulfilled]: (state, { payload }) => {
      state.getSubLoading = false
      state.getSubError = null
      state.getSubCate = payload
    },
    [GetSubCate.rejected]: (state, { payload }) => {
      state.getSubLoading = false
      state.getSubError = payload
      state.getSubCate = null
    },


    [DeleteSubCate.pending]: (state) => {
      state.delLoading = true
      state.delMsg = null
      state.delError = null
    },
    [DeleteSubCate.fulfilled]: (state, { payload }) => {
      state.delLoading = false
      state.delMsg = payload
      state.delError = null
    },
    [DeleteSubCate.rejected]: (state, { payload }) => {
      state.delLoading = false
      state.delMsg = null
      state.delError = payload
    },
    [UpdateSubCate.pending]: (state) => {
      state.updateSubLoading = true
      state.updateSubMsg = null
      state.updateSubError = null
    },
    [UpdateSubCate.fulfilled]: (state, { payload }) => {
      state.updateSubLoading = false
      state.updateSubMsg = payload
      state.updateSubError = null
    },
    [UpdateSubCate.rejected]: (state, { payload }) => {
      state.updateSubLoading = false
      state.updateSubMsg = null
      state.updateSubError = payload
    },
    [GetSubCateId.pending]: (state) => {
      state.getSubCateIdLoading = true
      state.getSubIdCate = []
      state.getSubCateIdError = null
    },
    [GetSubCateId.fulfilled]: (state, { payload }) => {
      state.getSubCateIdLoading = false
      state.getSubIdCate = payload
      state.getSubCateIdError = null
    },
    [GetSubCateId.rejected]: (state, { payload }) => {
      state.getSubCateIdLoading = false
      state.getSubIdCate = []
      state.getSubCateIdError = payload
    },
  }
})

export default SubCategorySlice.reducer