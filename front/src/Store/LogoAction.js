import {createAsyncThunk} from "@reduxjs/toolkit"
import {toast} from "react-toastify"
import axios from "axios"


export const GetLogo = createAsyncThunk("GetLogo/LogoSlice",async(data,{rejectWithValue})=>{
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
            },
          }
    
          const result = await axios.get(`${process.env.REACT_APP_PORT}/logo/image`, config)
          return result.data.Logo
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

