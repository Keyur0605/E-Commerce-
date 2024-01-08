import React from 'react'
import "../style/Login.css"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../Store/AuthAction';
import { useEffect } from 'react';
import {ColorRing} from "react-loader-spinner"
const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required().email("email not valid"),
    password: yup.string().required().min(6, "password must be at least 6 character"),
    cpassword: yup.string().required().oneOf([yup.ref('password')], "Confirm Password Must Be Match")

})
const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })


    const showHidePassword = () => {
        var x = document.getElementById("pass");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoading, error, isSuccess } = useSelector((state) => state.user)
    useEffect(() => {
        if (isSuccess ) {
            navigate("/")
        }
       
    }, [isLoading, error, isSuccess])

    const onSubmit = (data) => {
        const item = { name: data.name, email: data.email, password: data.password, cpassword:data.cpassword }
        dispatch(registerUser(item))
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {error && <div className="alert alert-danger" role="alert">
                <p className='mb-0' style={{fontWeight:"700",color:"red"}}>{error}</p>
            </div>}

            <div className="mb-3 form_input">
                <input type="text" className="form-control " placeholder='User Name'  {...register("name", { required: true, })}  />
                <p style={{ color: "red", fontSize: "14px" }}>{errors.name?.message}</p>
            </div>
            <div className="mb-3 form_input">
                <input type="email" className="form-control" placeholder='E-mail' {...register("email", { required: true })}  />
                <p style={{ color: "red", fontSize: "14px" }}>{errors.email?.message}</p>
            </div>
            <div className="mb-3 form_input">
                <input type="password" id='pass' className="form-control" placeholder="Password" {...register("password", { required: true, min: 6, max: 20 })}  />
                <p style={{ color: "red", fontSize: "14px" }}>{errors.password?.message}</p>
            </div>
            <div className="mb-3 form_input" >
                <input type="password" className="form-control " placeholder="Confirm Password" {...register("cpassword", { required: true, min: 6, max: 20 })}
                     />
                <p style={{ color: "red", fontSize: "14px" }}>{errors.cpassword?.message}</p>
            </div>
            <div className='d-flex h-25 align-items-center'>
                <input type="checkbox" onClick={showHidePassword} className='mt-3 me-2' /><span style={{ fontSize: "14px" }} className='mt-3'>Show Password</span>
            </div>
            <button type='submit' className="btn btn-block " style={{ backgroundColor: "#6c63ff", color: "#fff", fontSize: "14px" }} disabled={isLoading ? true : false}>{isLoading ? <><ColorRing
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#198754']}
                        />Loading</> : "Sign Up"}</button>
          

        </form>
    )
}

export default Register
