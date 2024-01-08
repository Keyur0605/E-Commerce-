import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  toast } from 'react-toastify';

export const AddAddress = createAsyncThunk(
    'AddAddress/AddressSlice',
    async ( data,{ rejectWithValue }) => {
      try {
          const config = {
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${JSON.parse(localStorage.getItem("userToken"))}`
              },
            }
      const result  =  await axios.post( `${process.env.REACT_APP_PORT}/address/add`,data , config)
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

export const GetAddress = createAsyncThunk(
    'GetAddress/AddressSlice',
    async ( data,{ rejectWithValue }) => {
      try {
          const config = {
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${JSON.parse(localStorage.getItem("userToken"))}`
              },
            }
      const result  =  await axios.get( `${process.env.REACT_APP_PORT}/address/list`,config)
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

  export const DeleteAddress = createAsyncThunk(
    'DeleteAddress/AddressSlice',
    async ( data,{ rejectWithValue }) => {
      try {
          const config = {
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `${JSON.parse(localStorage.getItem("userToken"))}`
              },
            }
      const result  =  await axios.delete( `${process.env.REACT_APP_PORT}/address/delete/${data}` , config)
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
