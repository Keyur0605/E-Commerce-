import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"

export const AddProducts = createAsyncThunk('AddProductS/ProductSlice',
  async (data, { rejectWithValue }) => {

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }

      const result = await axios.post(`${process.env.REACT_APP_PORT}/product/add`, data, config)
      toast.success(result.data.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      return result
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const GetProducts = createAsyncThunk('GetProductList/ProductSlice',
  async (data, { rejectWithValue }) => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const result = await axios.get(`${process.env.REACT_APP_PORT}/product/list/${data}`, config)
      return result.data
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const UpdateProductStatus = createAsyncThunk('UpdateProductStatus/ProductSlice',
  async (data, { rejectWithValue }) => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }
      const result = await axios.patch(`${process.env.REACT_APP_PORT}/product/active`, data, config)
      toast.success(result.data.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return result.data.msg
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const UpdateProductSaleStatus = createAsyncThunk('UpdateProductSaleStatus/ProductSlice',
  async (data, { rejectWithValue }) => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }
      const result = await axios.patch(`${process.env.REACT_APP_PORT}/product/sale`, data, config)
      toast.success(result.data.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return result.data.msg
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const DeleteProduct = createAsyncThunk('DeleteProduct/ProductSlice',
  async (data, { rejectWithValue }) => {
    try {

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }
      const result = await axios.delete(`${process.env.REACT_APP_PORT}/product/delete/${data}`, config)
      toast.success(result.data.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return result.data.msg
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const UpdateProduct = createAsyncThunk('UpdateProduct/ProductSlice',
async (data, { rejectWithValue }) => {
   
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }

      const result = await axios.put(`${process.env.REACT_APP_PORT}/product/update`,data, config)
      toast.success(result.data.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      
      
      return result
    } catch (error) {
      if (error.response.data.msg) {
        toast.error(error.response.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const AdminProductFilter = createAsyncThunk('AdminProductFilter/ProductSlice', async (data, { rejectWithValue }) => {
  try {

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
      },
    }
    const result = await axios.get(`${process.env.REACT_APP_PORT}/product/filter/${data.page}${data.string}`, config)
    return result.data
  } catch (error) {
    if (error.response.data.msg) {
      toast.error(error.response.data.msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return rejectWithValue(error.response.data.msg)
    } else {
      return rejectWithValue(error.message)
    }
  }
})