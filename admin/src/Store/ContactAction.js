import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import {toast} from "react-toastify"


export const AddContact = createAsyncThunk("AddContact/ContactSlice",async(data , {rejectWithValue})=>{
  try {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }
      const result = await axios.post(`${process.env.REACT_APP_PORT}/contact/add`,data,config);
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

export const GetContact = createAsyncThunk("GetContact/ContactSlice",async(data , {rejectWithValue})=>{
    try {
      const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
          },
        }
        const result = await axios.get(`${process.env.REACT_APP_PORT}/contact/list`,config);
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

export const UpdateContact = createAsyncThunk("UpdateContact/ContactSlice",async(data , {rejectWithValue})=>{
    try {
      const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
          },
        }
        const result = await axios.put(`${process.env.REACT_APP_PORT}/contact/update`,data,config);
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
  