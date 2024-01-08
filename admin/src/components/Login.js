import React, { useState, useEffect, useRef } from 'react'
import "../Style/Login.css"
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, forgetPassword, forgetPasswordOtp, resetPass } from '../Store/userAuthAction';
import ReCAPTCHA from "react-google-recaptcha";
import { ColorRing } from "react-loader-spinner"

const schema = yup.object({
    email: yup.string().required().email("email not valid"),
    password: yup.string().required().min(6, "password must be at least 6 character"),
})
const UserLRSyatem = () => {
    const [admin, setAdmin] = useState(false)
    const [forgetpass, setForgetPass] = useState(true)
    const [forgetpassotp, setForgetPassOtp] = useState(false)
    const [forgetpassField, setForgetPassField] = useState(false)
    const capRef = useRef()
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [pass, setPass] = useState("")
    const [conformPass, setConformPass] = useState("")
    const [passwordError, setPassWordError] = useState("")
    const [password, setPassWord] = useState("")
    const [captcha, setCaptcha] = useState(null)
    const navigate = useNavigate()
    const { register, reset, handleSubmit, formState: { errors } } = useForm({
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
    const dispatch = useDispatch();
    const onSubmit = (data) => {
        const item = { "email": data.email, "password": data.password, "reCaptcha": captcha }
        dispatch(loginUser(item))
        reset()
        capRef.current.reset()
        setCaptcha(null)
    }


    const { isLoading, user, isemailLoding, isemailMsg, isemailError, isOtpLoading, isOtpMsg, isOtpError, isresetPassError, isresetPassMsg, isresetPassLoading } = useSelector((state) => state.userAuth)

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (localStorage.getItem("token") && user) {

                navigate("/")
                window.location.reload(true);
            }
            else {
                if (user !== null) {
                    setAdmin(true)
                }
            }
        }


    }, [user])

    useEffect(() => {
        if (localStorage.getItem("isAdmin")) {
            var isadmin = JSON.parse(localStorage.getItem("isAdmin"))
            var isToken = JSON.parse(localStorage.getItem("token"))

        }
        if (isadmin && isToken) {
            navigate("/")
        }
    }, [])

    const sendEmail = (e) => {
        const item = { email }
        dispatch(forgetPassword(item))


    }
    const verifyotp = () => {
        const item = { otp }
        dispatch(forgetPasswordOtp(item))
    }

    const resetPassotp = () => {
        if (pass === conformPass) {
            const item = { "newpass": pass }
            dispatch(resetPass(item))
        }
        else if (pass.length > 6) {

            setPassWord("Password Must be Greater Than 6 charater")
        }
        else {
            setPassWordError("Please enter Same Confirm Password")

        }
    }
    useEffect(() => {
        if (isemailMsg === 200) {
            setForgetPassOtp(true)

        }
        if (isOtpMsg === 200) {
            setForgetPassField(true)
        }
        if (isresetPassMsg === 200) {
            setForgetPass(true)
            setForgetPassOtp(false)
            setForgetPassField(false)

        }

    }, [isemailMsg, isOtpMsg, isresetPassMsg])

    return (
        <div>
            <div className="content">
                <div className="container ">
                    <div className="row justify-content-center p-lg-0 py-4  " >
                        <div className="col-md-6 order-md-1 order-2 justify-content-center">
                            <img src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" alt="svg" className="img-fluid" />
                        </div>
                        <div className="col-md-6 order-md-2 order-1 contents  center-div">
                            <div className="row justify-content-center" style={{ width: "100%" }}>
                                <div className="col-md-8">
                                    {forgetpass ? <form onSubmit={handleSubmit(onSubmit)}>
                                        {admin && <div className="alert alert-danger" role="alert">
                                            <p className='mb-0' style={{ fontWeight: "700", color: "red" }}>You are not admin</p>
                                        </div>}
                                        <div className="mb-3 form_input">
                                            <input type="email" className="form-control" placeholder='E-mail' {...register("email", { required: true })} />
                                            <p style={{ color: "red", fontSize: "14px" }}>{errors.email?.message}</p>
                                        </div>
                                        <div className="mb-3 form_input" >
                                            <input type="password" id='pass' className="form-control " placeholder='Password' {...register("password", { required: true, min: 6, max: 20 })} />
                                            <p style={{ color: "red", fontSize: "14px" }}>{errors.password?.message}</p>
                                            <div className='d-flex h-25 justify-content-between align-items-center '>
                                                <div>
                                                    <input type="checkbox" onClick={showHidePassword} className='mt-3 me-2' /><span style={{ fontSize: "14px" }} className='mt-3'>Show Password</span></div>
                                                <span className="ml-auto" onClick={() => setForgetPass(false)} style={{ cursor: "pointer" }}><a className="forgot-pass">Forgot Password?</a></span>
                                            </div>
                                        </div>

                                        <ReCAPTCHA
                                            sitekey='6Lew_F0oAAAAAMepW2Me070PN-yJd1crr_44sVto'
                                            onChange={(val) => setCaptcha(val)}
                                            ref={capRef}
                                        />

                                        <button type="submit" className="btn btn-block w-100 mt-3 " disabled={isLoading || !captcha ? true : false} style={{ backgroundColor: "#6c63ff", color: "#fff", fontSize: "14px" }}>{isLoading ? <><ColorRing
                                            visible={true}
                                            height="30"
                                            width="30"
                                            ariaLabel="blocks-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="blocks-wrapper"
                                            colors={['#198754']}
                                        />Loading</> : "Sign In"}</button>
                                    </form>
                                        :
                                        <div>
                                            {isemailError && <div className="alert alert-danger" role="alert">
                                                <p className='mb-0' style={{ fontWeight: "700", color: "red" }}>{isemailError}</p>
                                            </div>}
                                            <div className="mb-3 form_input">
                                                <input type="email" className="form-control" placeholder='Enter Register E-mail' onChange={(e) => setEmail(e.target.value)} />
                                            </div>
                                            {!forgetpassotp && <button type="button" onClick={() => sendEmail()} className="btn btn-block w-100 mt-3" disabled={email === "" || isemailLoding} style={{ backgroundColor: "#6c63ff", color: "#fff", fontSize: "14px" }}>{isemailLoding ? <><ColorRing
                                                visible={true}
                                                height="30"
                                                width="30"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="blocks-wrapper"
                                                colors={['#198754']}
                                            />Loading</> : "Send Otp"}</button>}
                                        </div>
                                    }
                                    {
                                        forgetpassotp && <div className='mt-3'>
                                            {isOtpError && <div className="alert alert-danger" role="alert">
                                                <p className='mb-0' style={{ fontWeight: "700", color: "red" }}>{isOtpError}</p>
                                            </div>}
                                            <div className="mb-3 form_input">
                                                <input type="text" className="form-control" placeholder='Enter OTP' onChange={(e) => setOtp(e.target.value)} />
                                            </div>
                                            {!forgetpassField && <button type="button" onClick={() => verifyotp()} className="btn btn-block w-100 mt-3" disabled={otp === "" || isOtpLoading} style={{ backgroundColor: "#6c63ff", color: "#fff", fontSize: "14px" }}>{isOtpLoading ? <><ColorRing
                                                visible={true}
                                                height="30"
                                                width="30"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="blocks-wrapper"
                                                colors={['#198754']}
                                            />Loading</> : "Verify Otp"}</button>}
                                        </div>
                                    }
                                    {
                                        forgetpassField && <div className='mt-3'>
                                            {(isresetPassError || passwordError || password) && <div className="alert alert-danger" role="alert">
                                                <p className='mb-0' style={{ fontWeight: "700", color: "red" }}>{isresetPassError || passwordError || password}</p>
                                            </div>}
                                            <div className="mb-3 form_input">
                                                <input type="text" className="form-control" placeholder='Enter Password' onChange={(e) => setPass(e.target.value)} />
                                            </div>
                                            <div className="mb-3 form_input">
                                                <input type="text" className="form-control" placeholder='Enter Confirm Password' onChange={(e) => setConformPass(e.target.value)} />
                                            </div>
                                            <button type="button" onClick={() => resetPassotp()} className="btn btn-block w-100 mt-3" disabled={pass === "" || conformPass === "" || isresetPassLoading} style={{ backgroundColor: "#6c63ff", color: "#fff", fontSize: "14px" }}>{isresetPassLoading ? <><ColorRing
                                                visible={true}
                                                height="30"
                                                width="30"
                                                ariaLabel="blocks-loading"
                                                wrapperStyle={{}}
                                                wrapperClass="blocks-wrapper"
                                                colors={['#198754']}
                                            />Loading</> : "Reset Password"}</button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default UserLRSyatem
