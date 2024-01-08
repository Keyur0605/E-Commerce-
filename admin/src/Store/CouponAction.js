import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify"

export const AddCoupon = createAsyncThunk("AddCoupon/CouponSlice", async (data, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
          const result = await axios.post(`${process.env.REACT_APP_PORT}/coupon/add`, data, config)
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
})

export const GetCoupon = createAsyncThunk("GetCoupon/CouponSlice",async(data,{rejectWithValue})=>{
  try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }
      const result = await axios.get(`${process.env.REACT_APP_PORT}/coupon/list`, config)
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


export const DeleteCoupon = createAsyncThunk("DeleteCoupon/CouponSlice",async(data,{rejectWithValue})=>{
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
      },
    }

    const result = await axios.delete(`${process.env.REACT_APP_PORT}/coupon/delete/${data}`, config)
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
})