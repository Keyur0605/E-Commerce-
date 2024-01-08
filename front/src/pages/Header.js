import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import axios from "axios"
import { FaUser } from "react-icons/fa"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { FiUser } from "react-icons/fi"
import { BsFillBagFill } from "react-icons/bs"
import { IoIosLogOut } from "react-icons/io"
import { ThreeDots } from 'react-loader-spinner';
import { useSelector,useDispatch } from "react-redux"
import { FaHeart } from "react-icons/fa6"
import { GetCart } from '../Store/CartAction'
import { GetLogo } from '../Store/LogoAction'
const Header = () => {
const dispatch = useDispatch();
const { getLogoLoading,getLogoMsg}=useSelector((state)=>state.logo)
  const [mainCategory, setMainCategory] = useState([])
  const [subCate, setSubCate] = useState([])
  const [loader, setLoader] = useState(true)
  const [logoImage,setLogoImage]=useState("")
  const { isLoading } = useSelector((state) => state.user)
  const {cartGetMsg,cartMsg}=useSelector((state)=>state.cart)
  if (localStorage.getItem("Ecom_user")) {
    var data = JSON.parse(localStorage.getItem("Ecom_user"))
    var users = data.name
    
  }
  useEffect(()=>{
  dispatch(GetLogo())
  },[])

  var HeaderName = []
  const NavbarMainData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
        },
      }
      const result = await axios.get(`${process.env.REACT_APP_PORT}/category/main/list`, config)
      setMainCategory(result.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(localStorage.getItem("userToken")){
      dispatch(GetCart())
    }
  },[cartMsg])

  const logout = () => {
    localStorage.removeItem("Ecom_user");
    localStorage.removeItem("userToken");
    localStorage.removeItem("_grecaptcha");
    localStorage.removeItem("rzp_checkout_user_id")
    localStorage.removeItem("rzp_device_id")
    localStorage.removeItem("rzp_checkout_anon_id")
    window.location.reload(true);
  }
  useEffect(() => {
    NavbarMainData()
  }, [])
 
  const subCategory = () => {
    if (mainCategory) {
      mainCategory.map(async (val, index) => {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
          },
        }
        const result = await axios.get(`${process.env.REACT_APP_PORT}/category/${val.Id}`, config)
        let obj = {}
        obj[val.Name] = result.data
        HeaderName.push(obj)
        if (HeaderName.length === mainCategory.length) {
          setSubCate(HeaderName)
          setLoader(false)
        }
      })
    }
  }
  useEffect(() => {
    subCategory()
  }, [mainCategory])

  useEffect(()=>{
    if(getLogoMsg){
      setLogoImage(getLogoMsg)
    }
  },[getLogoMsg])
  return (
    <>
      {isLoading || getLogoLoading ? <div style={{ height: "7vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div> :
        <div >
          <nav className="navbar navbar-expand-lg bg-light ">
            <div className="container ">
              <NavLink to="/" > <img src={logoImage} alt="logo" style={{ maxWidth: "140px" }} /> </NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ textAlign: "center" }}>
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

                  {
                    subCate.length !== 0 ?
                      subCate.map((item, val) => {
                        return (
                          Object.keys(item).map(key => {
                            return (
                              <>
                                <li className="nav-item dropdown mx-2 ">
                                  <a className={item[key].length !== 0 ? "nav-link dropdown-toggle" : "nav-link"} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">{key}</a>

                                  <ul class="dropdown-menu">
                                    {
                                      item[key].map((val, index) => {
                                        return (
                                          <>
                                            <li className='dropdown-item' style={{ color: "maroon", background: "rgba(219,210,224,0.5)" }}>{val.Name}</li>
                                            <hr className='m-0' />
                                            {
                                              val.SubCategory.map((val, index) => {
                                                return (
                                                  <>
                                                    <NavLink to={`/product?sid=${val.Id}`}> <li className='dropdown-item'>{val.Name}</li></NavLink>
                                                  </>
                                                )
                                              })
                                            }
                                          </>
                                        )
                                      })
                                    }
                                  </ul>

                                </li>
                              </>
                            )

                          }))
                      })
                      : 'No data'
                  }
                </ul>
                {localStorage.getItem("Ecom_user") ? <div className='d-flex justify-content-center align-items-center'>
                  <div>
                    <div className="dropdown">
                      <span className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <FaUser style={{ fontSize: "16px" }} />
                      </span>
                      <ul className="dropdown-menu ">
                        <li className='dropdown-item'>
                          <div className='d-flex align-items-center'>
                            <FiUser style={{ fontSize: "18px" }} />
                            <div className='ms-3'>
                              <span style={{ fontSize: "17px", fontWeight: "bold" }}>{users}</span>
                            </div>
                          </div>
                        </li>
                        <hr className='m-0' />
                        <li className='dropdown-item py-2'>
                          <NavLink to="/myorder"><div className='d-flex align-items-center'>
                            <BsFillBagFill />
                            <div className='ms-3'>
                              <span style={{ fontSize: "15px" }}>My Order</span>
                            </div>
                          </div>
                          </NavLink>
                        </li>
                        <hr className='m-0' />
                        <li className='dropdown-item py-2'>
                          <div className='d-flex align-items-center'>
                            <IoIosLogOut />
                            <div className='ms-3'>
                              <span type="button" style={{ fontSize: "15px" }} onClick={() => logout()}>Logout</span>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <NavLink to="/cart">
                    <div className='ms-4 position-relative'>
                      <AiOutlineShoppingCart style={{ fontSize: "25px", cursor: "pointer" }} />
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                       {cartGetMsg !== null ? cartGetMsg.length >0 ?cartGetMsg.length:0 :0}
                        <span class="visually-hidden">unread messages</span>
                      </span>
                    </div>
                  </NavLink>
                  <NavLink to="/wishlist">
                    <div className='ms-4 '>
                    <FaHeart style={{ fontSize: "20px", cursor: "pointer",color:"red" }}  />
                  </div>
                  </NavLink>
                </div> : <NavLink to="/login"> <button className='btn btn-primary'>Login</button></NavLink>}
              </div>
            </div>
          </nav>
        </div>}
    </>
  )
}

export default Header
