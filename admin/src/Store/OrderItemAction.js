import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify"


export const UpdateOrderItemQuantity = createAsyncThunk("UpdateOrderItemQuantity/OrderItemSlice",async(data,{rejectWithValue})=>{
    try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
          },
        }
  
        const result = await axios.patch(`${process.env.REACT_APP_PORT}/orderitem/update`,data, config)
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

export const DeleteOrderItem = createAsyncThunk("DeleteOrderItem/OrderItemSlice",async(data,{rejectWithValue})=>{
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
      },
    }

    const result = await axios.delete(`${process.env.REACT_APP_PORT}/orderitem/delete/${data.oId}/${data.id}`, config)
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
  