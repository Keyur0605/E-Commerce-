import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {  toast } from 'react-toastify';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    const result  =  await axios.post(
        `${process.env.REACT_APP_PORT}/register`,data, config)
      localStorage.setItem('Ecom_user', JSON.stringify(result.data))
      localStorage.setItem('userToken', JSON.stringify(result.data.token))
      return result.data
    } catch (error) {
      console.log();
      if ( error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
 


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
      localStorage.setItem('Ecom_user', JSON.stringify(result.data))
      localStorage.setItem('userToken', JSON.stringify(result.data.token))
      return result.data
    } catch (error) {
      if ( error.response.data.msg) {
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