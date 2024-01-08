import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
const Protected = ({Cmp}) => {
    const navigate  = useNavigate()
    // const[admin,setAdmin]=useState()
    // const[adminToken,setAdminTokem]=useState()
  
  useEffect(()=>{
    if(localStorage.getItem("isAdmin")){
      var isadmin = JSON.parse(localStorage.getItem("isAdmin"))
      navigate("/")
    }
    
    if(!isadmin){
      navigate("/login")
  }
  
  
  
  },[])
  
  return (
    <div>
      <Cmp/>
    </div>
  )
}

export default Protected
