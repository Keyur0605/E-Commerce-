import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {toast } from 'react-toastify';


export const AddWishList = createAsyncThunk("AddWishList/WishListSlice",async(data,{ rejectWithValue })=>{
     try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
            },
          }
          const result = await axios.post(`${process.env.REACT_APP_PORT}/wishlist/add`,data,config);
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

export const DeleteWishList = createAsyncThunk("DeleteWishList/WishListSlice",async(data,{ rejectWithValue })=>{
  try {
     const config = {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
         },
       }
       const result = await axios.delete(`${process.env.REACT_APP_PORT}/wishlist/delete/${data}`,config)
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


export const GetWishList = createAsyncThunk("GetWishList/WishListSlice",async(data,{ rejectWithValue })=>{
  try {
     const config = {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
         },
       }
       const result = await axios.get(`${process.env.REACT_APP_PORT}/wishlist/list`,config);
       console.log(result.data,"api call for wishlist data");
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
