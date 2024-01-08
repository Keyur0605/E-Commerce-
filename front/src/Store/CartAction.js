import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast} from "react-toastify"
import Swal from "sweetalert2";

export const AddToCart = createAsyncThunk("AddToCart/CartSlice",async(data,{ rejectWithValue })=>{
    try {
       const config = {
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
           },
         }
         const result = await axios.post(`${process.env.REACT_APP_PORT}/cart/add`,data,config)
         if(result.status === 200){
          toast.error(result.data.msg, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
         }
         else{
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: result.data.msg,
            showConfirmButton: false,
            timer: 2000
          })
         }
         
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
})

export const GetCart = createAsyncThunk("GetCart/CartSlice",async(data,{ rejectWithValue })=>{
  try {
     const config = {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
         },
       }
       const result = await axios.get(`${process.env.REACT_APP_PORT}/cart/list`,config);
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

export const DeleteCart = createAsyncThunk("DeleteCart/CartSlice",async(data,{ rejectWithValue })=>{
  try {
     const config = {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
         },
       }
       const result = await axios.delete(`${process.env.REACT_APP_PORT}/cart/delete/${data}`,config);
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
})

export const UpdateCart = createAsyncThunk("UpdateCart/CartSlice",async(data,{rejectWithValue})=>{
  try {
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
        },
      }
      const result = await axios.patch(`${process.env.REACT_APP_PORT}/cart/update`,data,config)
       Swal.fire({
         position: 'top-end',
         icon: 'success',
         title: result.data.msg,
         showConfirmButton: false,
         timer: 2000
       })
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
})