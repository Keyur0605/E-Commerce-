import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {  toast } from 'react-toastify';
import Swal from "sweetalert2";

export const AddOrder=createAsyncThunk("AddOrder/OrderSlice", 
    async (data, { rejectWithValue }) => {
      
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': JSON.parse(localStorage.getItem("userToken"))
            },
          }
          const result = await axios.post(`${process.env.REACT_APP_PORT}/order/add`,data,config)
          if(result.status === 201){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: result.data.msg,
              showConfirmButton: false,
              timer: 2000
            })
          }
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


export const UserOrder = createAsyncThunk("UserOrder/OrderSlice",async(data,{rejectWithValue})=>{
  try {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': JSON.parse(localStorage.getItem("userToken"))
        },
      }
      const result = await axios.get(`${process.env.REACT_APP_PORT}/orderitem/list`,config)
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