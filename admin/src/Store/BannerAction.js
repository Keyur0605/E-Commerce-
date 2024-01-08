import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {  toast } from 'react-toastify';


export const AddBanner = createAsyncThunk(
    'AddBanner/BannerSlice',
    async ( data,{ rejectWithValue }) => {
      try {
          const config = {
              headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
              },
            }
      const result  =  await axios.post( `${process.env.REACT_APP_PORT}/banner/add`,data , config)
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

  export const GetBanner = createAsyncThunk(
    'GetBanner/BannerSlice',
    async ( data,{ rejectWithValue }) => {
      try {
          const config = {
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
              },
            }
      const result  =  await axios.get( `${process.env.REACT_APP_PORT}/banner/list`,config)
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

  
  export const DeleteBanner = createAsyncThunk(
    'DeleteBanner/BannerSlice',
    async ( data,{ rejectWithValue }) => {
      try {
          const config = {
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
              },
            }
      const result  =  await axios.delete( `${process.env.REACT_APP_PORT}/banner/delete/${data}` , config)
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