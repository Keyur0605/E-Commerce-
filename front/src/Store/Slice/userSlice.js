import { createSlice } from "@reduxjs/toolkit";
import { registerUser , loginUser,forgetPassword,forgetPasswordOtp,resetPass } from "../AuthAction";

const user = localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null

const UserSlice = createSlice({
    name:"userDetails",
    initialState:{
        isLoading:false,
        user,
        error:null,
        isSuccess:false,
        isemailLoding:false,
        isemailMsg:null,
        isemailError:null,
        isOtpLoading:false,
        isOtpMsg:null,
        isOtpError:null,
        isresetPassLoading:false,
        isresetPassMsg:null,
        isresetPassError:null,
    },
    reducer:{

    },
    extraReducers:{
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.user = null
            state.error = null
            state.isSuccess = false
          },
          [registerUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.user = payload
            state.error = false 
            state.isSuccess = true
          },
          [registerUser.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.user = null
            state.error = payload
            state.isSuccess = false
          },


          [loginUser.pending]: (state) => {
            state.isLoading = true
            state.user = null
            state.error = null
            state.isSuccess = false
          },
          [loginUser.fulfilled]: (state, { payload }) => {
            state.isLoading = false
            state.user = payload
            state.error = false 
            state.isSuccess = true
          },
          [loginUser.rejected]: (state, { payload }) => {
            state.isLoading = false
            state.user = null
            state.error = payload
            state.isSuccess = false
          },
          [forgetPassword.pending]: (state) => {
            state.isemailLoding = true
            state.isemailMsg = null
            state.isemailError = null
          },
          [forgetPassword.fulfilled]: (state, { payload }) => {
            state.isemailLoding = false
            state.isemailMsg = payload
            state.isemailError = false 
          },
          [forgetPassword.rejected]: (state, { payload }) => {
            state.isemailLoding = false
            state.isemailMsg = null
            state.isemailError = payload
          },
          [forgetPasswordOtp.pending]: (state) => {
            state.isOtpLoading = true
            state.isOtpMsg = null
            state.isOtpError = null
          },
          [forgetPasswordOtp.fulfilled]: (state, { payload }) => {
            state.isOtpLoading = false
            state.isOtpMsg = payload
            state.isOtpError = false 
          },
          [forgetPasswordOtp.rejected]: (state, { payload }) => {
            state.isOtpLoading = false
            state.isOtpMsg = null
            state.isOtpError = payload
          },
          [resetPass.pending]: (state) => {
            state.isresetPassLoading = true
            state.isresetPassMsg = null
            state.isresetPassError = null
          },
          [resetPass.fulfilled]: (state, { payload }) => {
            state.isresetPassLoading = false
            state.isresetPassMsg = payload
            state.isresetPassError = false 
          },
          [resetPass.rejected]: (state, { payload }) => {
            state.isresetPassLoading = false
            state.isresetPassMsg = null
            state.isresetPassError = payload
          },

    }
})

export default UserSlice.reducer