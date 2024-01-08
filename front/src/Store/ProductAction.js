import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {  toast } from 'react-toastify';

export const GetProduct = createAsyncThunk(
    "GetProduct/ProductSlice", 
    async (data, { rejectWithValue }) => {
      
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem("userToken")?JSON.parse(localStorage.getItem("userToken")):"nToken"}`
            },
          }
          const result = await axios.get(`${process.env.REACT_APP_PORT}/product/list/${data.id}/${data.page}`,config)
          return result.data
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
})


export const GetCategory = createAsyncThunk(
  "GetCategory/ProductSlice", 
  async (data, { rejectWithValue }) => {
  try {
      const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const result = await axios.get(`${process.env.REACT_APP_PORT}/category/${data}`,config)
        console.log();
        return result.data
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
})


export const GetSingleProduct = createAsyncThunk(
  "GetSingleProduct/ProductSlice", 
  async (data, { rejectWithValue }) => {
  try {
      const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem("userToken")?JSON.parse(localStorage.getItem("userToken")):"nToken"}`
          },
        }
        // let token = data.token ?data.token.replace(/"/g, ''):"nToken"
        const result = await axios.get(`${process.env.REACT_APP_PORT}/product/${data}`,config)
        return result.data
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
})


export const FilterProduct = createAsyncThunk(
  "FilterProduct/ProductSlice", 
  async (data, { rejectWithValue }) => {
   
  try {
      const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem("userToken")?JSON.parse(localStorage.getItem("userToken")):"nToken"}`
          },
        }
        const result = await axios.get(`${process.env.REACT_APP_PORT}/product/filter/${data.id}/${data.page}${data.string}`,config)
        return result.data
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
})
