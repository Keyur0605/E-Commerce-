import React, { useState } from 'react'
import "../style/Login.css"
import Register from './Register';
import Login from './Login';


const UserLRSyatem = ({setShow}) => {
       
    const [formSignIn, setFormSignIn] = useState(true)
    
   
  
    return (
        <div>
            <div className="content">
                <div className="container ">
                    <div className="row justify-content-center p-lg-0 py-4" >

                        <div className="col-md-6 order-md-1 order-2 justify-content-center h-100 align-item-center">
                            <img src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg" alt="svg" className="img-fluid" />
                        </div>
                        <div className="col-md-6 order-md-2 order-1 contents">
                            <div className="row justify-content-center">
                                <div className="col-md-8">
                                    <div className='d-flex justify-content-around mb-4'>
                                        <button className='registerloginbtn' onClick={() => setFormSignIn(false)}>Register</button>
                                        <button className='registerloginbtn' onClick={() => setFormSignIn(true)}>Login</button>
                                    </div>



                                    {formSignIn ?
                                        <Login />
                                        :
                                        <Register />
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
