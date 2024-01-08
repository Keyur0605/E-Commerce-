import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {  toast } from 'react-toastify';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const result  =await axios.post(
        `${process.env.REACT_APP_PORT}/login`,data, config
      )
      
      localStorage.setItem('adminName', JSON.stringify(result.data.name))
      localStorage.setItem('isAdmin', JSON.stringify(result.data.admin))
      localStorage.setItem('token', JSON.stringify(result.data.token))
      
      return result.data.admin
    } catch (error) {
      if ( error.response.data.msg) {
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
 
export const forgetPassword = createAsyncThunk("forgetPassword/userDetails",async(data,{rejectWithValue})=>{
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const result  =await axios.post(`${process.env.REACT_APP_PORT}/forgetpassword/email`,data, config) 
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
    localStorage.setItem('token', JSON.stringify(result.data.token))   
    return result.status
  } catch (error) {
    if ( error.response.data.msg) {
      return rejectWithValue(error.response.data.msg)
    } else {
      return rejectWithValue(error.message)
    }
  }
})


export const forgetPasswordOtp = createAsyncThunk("forgetPasswordOtp/userDetails",async(data,{rejectWithValue})=>{
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
      },
    }
    const result  =await axios.post(`${process.env.REACT_APP_PORT}/forgetpassword/otp`,data, config) 
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
    return result.status
  } catch (error) {
    if ( error.response.data.msg) {
      return rejectWithValue(error.response.data.msg)
    } else {
      return rejectWithValue(error.message)
    }
  }
})


export const resetPass = createAsyncThunk("forgetpass/userDetails",async(data,{rejectWithValue})=>{
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
      },
    }
    const result  =await axios.patch(`${process.env.REACT_APP_PORT}/forgetpassword/password`,data, config) 
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
    return result.status
  } catch (error) {
    if ( error.response.data.msg) {
      return rejectWithValue(error.response.data.msg)
    } else {
      return rejectWithValue(error.message)
    }
  }
})