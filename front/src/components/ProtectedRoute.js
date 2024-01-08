
import React, { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2'
const ProtectedRoute = ({Cmp}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("Ecom_user")) {
          Swal.fire({
            title: 'You are not Login',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: ' btn-success',
            cancelButtonColor: 'btn btn-danger',
            confirmButtonText: 'Login'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/login')
            }
        })
  navigate("/")
        }
      }, [])



        
  return (
    <div>
      <Cmp/>
    </div>
  )
}

export default ProtectedRoute

