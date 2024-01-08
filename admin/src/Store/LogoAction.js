import {createAsyncThunk} from "@reduxjs/toolkit"
import {toast} from "react-toastify"
import axios from "axios"

export const AddLogo = createAsyncThunk("AddLogo/LogoSlice",async(data,{rejectWithValue})=>{
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    
          const result = await axios.post(`${process.env.REACT_APP_PORT}/logo/add`,data, config)
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

export const GetLogo = createAsyncThunk("GetLogo/LogoSlice",async(data,{rejectWithValue})=>{
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    
          const result = await axios.get(`${process.env.REACT_APP_PORT}/logo/image`, config)
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

export const DeleteLogo = createAsyncThunk("DeleteLogo/LogoSlice",async(data,{rejectWithValue})=>{
  try {
      const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
          },
        }
  
        const result = await axios.delete(`${process.env.REACT_APP_PORT}/logo/delete`, config)
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