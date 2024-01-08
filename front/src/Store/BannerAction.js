import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {  toast } from 'react-toastify';


export const GetBanner = createAsyncThunk( 'GetBanner/BannerSlice',
async (data, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
    const result  =  await axios.get( `${process.env.REACT_APP_PORT}/banner/list`,config)
    return result.data
    } catch (error) { 
      if ( error.response.data.msg) {
        toast.success(error.response.data.msg, {
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

export const GetMainCate = createAsyncThunk(
  'GetMainCate/BannerSlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
    const result  =  await axios.get( `${process.env.REACT_APP_PORT}/category/main/list`,config)
    return result.data
    } catch (error) { 
      if ( error.response.data.msg) {
        toast.success(error.response.data.msg, {
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
