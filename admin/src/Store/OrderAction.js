import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import {toast} from "react-toastify"

export const GetOrder=createAsyncThunk("GetOrder/OrderSlice",async(data , { rejectWithValue })=>{
    try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
          },
        }
        const result = await axios.get(`${process.env.REACT_APP_PORT}/order/list/${data}`, config)
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

export const GetOrderItem=createAsyncThunk("GetOrderItem/OrderSlice",async(data , { rejectWithValue })=>{
  try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }
      const result = await axios.get(`${process.env.REACT_APP_PORT}/orderitem/list/admin/${data}`, config)
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

export const DeleteOrder = createAsyncThunk("DeleteOrder/OrderSlice",async(data,{rejectWithValue})=>{
  try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }

      const result = await axios.delete(`${process.env.REACT_APP_PORT}/order/delete/${data}`, config)
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


export const UpdateOrderStatus = createAsyncThunk("UpdateOrderStatus/OrderSlice",async(data,{rejectWithValue})=>{
  try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }

      const result = await axios.patch(`${process.env.REACT_APP_PORT}/order/update`,data, config)
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

export const UpdateRefundStatus = createAsyncThunk("UpdateRefundStatus/OrderSlice",async(data,{rejectWithValue})=>{
  try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }

      const result = await axios.patch(`${process.env.REACT_APP_PORT}/order/update/refund`,data, config)
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

export const SerachOrder = createAsyncThunk("SerachOrder/OrderSlice",async(data,{rejectWithValue})=>{
  try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
        },
      }

      const result = await axios.get(`${process.env.REACT_APP_PORT}/order/${data}`, config)
      return result.data.orderDetails
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

