import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {  toast } from 'react-toastify';


export const AddMainCate = createAsyncThunk(
  'AddMainCategory/MainCategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    const result  =  await axios.post( `${process.env.REACT_APP_PORT}/category/main/add`,data,config)
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
  }
)

export const GetMainCate = createAsyncThunk(
  'GetMainCategory/MainCategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
    const result  =  await axios.get( `${process.env.REACT_APP_PORT}/category/main/list`,config)
    return result.data
    } catch (error) { 
      if ( error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const DeleteMainCate = createAsyncThunk(
  'DeleteMainCategory/MainCategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    const result  =  await axios.delete( `${process.env.REACT_APP_PORT}/category/main/delete/${data}` , config)
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
  }
)

export const UpdateMainCate = createAsyncThunk(
  'UpdateMainCategory/MainCategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    const result  =  await axios.patch( `${process.env.REACT_APP_PORT}/category/main/update`,data,config)
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
  }
)



export const AddCate = createAsyncThunk(
  'AddCategory/CategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    const result  =  await axios.post( `${process.env.REACT_APP_PORT}/category/add`,data,config)
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
  }
)

export const GetCate = createAsyncThunk(
  'GetCategory/CategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
    const result  =  await axios.get( `${process.env.REACT_APP_PORT}/category/list`,config)
    return result.data
    } catch (error) { 
      if ( error.response.data.msg) {
        
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const GetCateId = createAsyncThunk(
  'GetidCategory/CategorySlice',
  async ( data,{ rejectWithValue }) => {
    console.log(data,"from action file");
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
    const result  =  await axios.get( `${process.env.REACT_APP_PORT}/category/list/${data}`,config)
    return result.data
    } catch (error) { 
      if ( error.response.data.msg) {
        
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const DeleteCate = createAsyncThunk(
  'DeleteCategory/CategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    const result  =  await axios.delete( `${process.env.REACT_APP_PORT}/category/delete/${data}` , config)
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
  }
)

export const UpdateCate = createAsyncThunk(
  'UpdateCategory/CategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    const result  =  await axios.patch( `${process.env.REACT_APP_PORT}/category/update`,data,config)
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
  }
)



export const GetSubCate = createAsyncThunk(
  'GetSubCategory/SubCategorySlice',
  async ( data,{ rejectWithValue }) => {
    console.log(data);
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
    const result  =  await axios.get( `${process.env.REACT_APP_PORT}/category/sub/list/${data}`,config)
    return result.data
    } catch (error) { 
      if ( error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const AddSubCate = createAsyncThunk(
  'AddSubCategory/SubCategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    const result  =  await axios.post( `${process.env.REACT_APP_PORT}/category/sub/add`,data,config)
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
  }
)

export const DeleteSubCate = createAsyncThunk(
  'DeleteSubCategory/SubCategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    const result  =  await axios.delete( `${process.env.REACT_APP_PORT}/category/sub/delete/${data}` , config)
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
  }
)

export const UpdateSubCate = createAsyncThunk(
  'UpdateSubCategory/SubCategorySlice',
  async ( data,{ rejectWithValue }) => {
    try {
        const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization' : `${JSON.parse(localStorage.getItem("token"))}`
            },
          }
    const result  =  await axios.patch( `${process.env.REACT_APP_PORT}/category/sub/update`,data,config)
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
  }
)

export const GetSubCateId = createAsyncThunk(
  'GetIdSubCategory/SubCategorySlice',
  async ( data,{ rejectWithValue }) => {
    
    try {
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
          }
    const result  =  await axios.get( `${process.env.REACT_APP_PORT}/category/sub/list/${data.mainId}/${data.c_id}`,config)
    return result.data
    } catch (error) { 
      if ( error.response.data.msg) {
        return rejectWithValue(error.response.data.msg)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)
