import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios"
import {toast} from "react-toastify"


export const AddPolicy = createAsyncThunk("AddPolicy/PolicySlice",async(data,{rejectWithValue})=>{
    try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
          },
        }
  
        const result = await axios.post(`${process.env.REACT_APP_PORT}/policy/add`, data, config)
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

export const UpdatePolicy = createAsyncThunk("UpdatePolicy/PolicySlice",async(data,{rejectWithValue})=>{
  try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }

      const result = await axios.patch(`${process.env.REACT_APP_PORT}/policy/update`, data, config)
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

export const GetPolicy = createAsyncThunk("GetPolicy/PolicySlice",async(data,{rejectWithValue})=>{
    try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
          },
        }
  
        const result = await axios.get(`${process.env.REACT_APP_PORT}/policy/list`, config)
        
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


export const DeletePolicy = createAsyncThunk("DeletePolicy/PolicySlice",async(data,{rejectWithValue})=>{
  try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }

      const result = await axios.delete(`${process.env.REACT_APP_PORT}/policy/delete/${data}`, config)
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