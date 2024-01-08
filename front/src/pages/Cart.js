import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri"
import { AddAddress, DeleteAddress, GetAddress } from '../Store/AddressAction';
import { GetCart, DeleteCart, UpdateCart } from '../Store/CartAction';
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai"
import { GrFormSubtract } from "react-icons/gr"
import { BiSolidCoupon } from "react-icons/bi"
import "../style/Cart.css"
import "../style/Coupon.css"
import { AddOrder } from '../Store/OrderAction';
import { GetCoupon } from '../Store/CouponAction';
import { toast } from "react-toastify"
import axios from "axios"
import Swal from "sweetalert2";

const Cart = () => {
  const navigate = useNavigate()
  var StateList = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar	", "Chhattisgarh", "Goa", "	Gujarat", "Haryana", "Himachal Pradesh", "	Jharkhand", "Karnataka", "Kerala", "	Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
  const [cartData, setCartData] = useState([])
  const [cartTotalValue, setCartTotalValue] = useState("")
  const [couponId, setCouponId] = useState("")
  const [paymentAddressError, setPaymentAddressError] = useState(false)
  const [showRozarpay, setShowRozarPay] = useState(false)
  const [productId, setProductId] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [couponData, setCouponData] = useState([])
  const [price, setPrice] = useState("")
  const [couponShow, setCouponShow] = useState(false)
  const [couponValue, setCouponValue] = useState("")
  const [cartPrice, setCartPrice] = useState("")
  const [getAddressData, setGetAddressData] = useState([])
  const [newAddress, setNewAddress] = useState(false)
  const [addressData, setAddressData] = useState({
    name: "",
    number: "",
    address: "",
    area: "",
    pincode: "",
    city: "",
    state: ""
  })

  const [paymentMethod, setPaymentMethod] = useState("")
  const [addressId, setAddressId] = useState("")
  const [sendAddress, setSendAddress] = useState("")
 
  const { cartGetLoading, cartGetMsg, cartUpdateMsg } = useSelector((state) => state.cart)
  const { getCouponLoading, getCouponMsg } = useSelector((state) => state.coupon)
  const { addAddressLoading, addAddressMsg, getAddressLoading, getAddressMsg, cartDeleteMsg } = useSelector((state) => state.address)
  const { addOrderLoading, addOrderMsg } = useSelector((state) => state.order)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetCart())
    dispatch(GetAddress())
  }, [])

  useEffect(() => {
    dispatch(GetAddress())
  }, [addAddressMsg])

  useEffect(() => {
    if (cartGetMsg) {
      setCartData(cartGetMsg)
    }
  }, [cartGetMsg])

  useEffect(() => {
    if (getAddressMsg) {
      setGetAddressData(getAddressMsg)
    }
  }, [getAddressMsg])

  const DeletetFromCart = (id) => {
    dispatch(DeleteCart(id))
    const update = cartData.filter((val) => val.Id !== id)
    setCartData(update)
    setCouponShow(false)
    setCouponValue(0)

  }

  const cartIcrement = (id, totalquantity, inintialquantity) => {
    setProductId(id)
    setCartData((cart) =>
      cart.map((item) => {
        if (item.Id === id) {
          let update = { ...item, Quantity: (item.Quantity < (inintialquantity + totalquantity) ? item.Quantity + 1 : item.Quantity + 0) }
          return update
        }
        return item
      }
      )
    )
  }

  const cartDecrement = (id) => {
    setProductId(id)
    // setShow(true)
    setCartData((cart) =>
      cart.map((item) => {
        if (item.Id === id) {
          let update = { ...item, Quantity: item.Quantity - (item.Quantity > 1 ? 1 : 0) }
          return update
        }
        return item
      }
      )
    )
  }

  const Update = (id, size) => {
    const sizeQuantity = {}
    sizeQuantity[size] = quantity
    const item = { "id": id, sizeQuantity }
    dispatch(UpdateCart(item))
    // setShow(false)
    setCouponShow(false)
    setProductId("")
  }
  useEffect(() => {
    TotalPrice()
    if (price && couponValue) {
      setCartTotalValue(price.totalPrice - (couponValue))
    }
    else {
      setCartTotalValue(price.totalPrice)
    }
  }, [cartData, cartUpdateMsg, couponValue, cartDeleteMsg, price.totalPrice])

  const TotalPrice = () => {
    let { totalPrice } = cartData.reduce((total, item) => {
      const { Price, Quantity } = item
      const itemTotal = Price * Quantity;
      total.totalPrice += itemTotal;
      setCartPrice(total)
      setPrice(total)

      return total
    },
      {
        totalPrice: 0,
      }
    );
  }

  const showCouponList = (price) => {
    dispatch(GetCoupon(price))
    setCouponShow(true)

  }

  useEffect(() => {
    if (getCouponMsg) {
      setCouponData(getCouponMsg)
    }
  }, [getCouponMsg])

  const SendAddress = (e) => {
    e.preventDefault()
    dispatch(AddAddress(addressData))
    setAddressData({
      name: "",
      number: "",
      address: "",
      area: "",
      pincode: "",
      city: "",
      state: ""
    })
    setNewAddress(false)
  }
  const AddressOnchange = (e) => {
    const { name, value } = e.target;

    setAddressData({
      ...addressData,
      [name]: value,
    });
  }

  const deleteAddress = (id) => {
    dispatch(DeleteAddress(id))
    const update = getAddressData.filter((val) => val.Id !== id)
    setGetAddressData(update)
  }

  const PlaceOrder = async (amount) => {

    if (addressId === "" || paymentMethod === "") {
      setPaymentAddressError(true)
    }
    else {
      setPaymentAddressError(false)
      var orderProduct = []
      for (let i = 0; i < cartData.length; i++) {
        const element = cartData[i];

        const sizeQuantity = {}
        sizeQuantity[Object.keys(element.Size_Quantity)] = element.Quantity
        const obj = { "pId": element.P_Id, sizeQuantity }
        orderProduct.push(obj)
      }
      const item = { "cId": (couponId ? couponId : "noCoupon"), "shippingDetails": sendAddress, "items": orderProduct, "pMode": paymentMethod }

      dispatch(AddOrder(item))
      setTimeout(() => {
        navigate("/myorder")
      }, 5000)


    }
  }


  const Payment = async () => {
    if (addressId === "" || paymentMethod === "") {
      setPaymentAddressError(true)
    }
    else {
      setShowRozarPay(true)
      setPaymentAddressError(false)
      var orderProduct = []
      for (let i = 0; i < cartData.length; i++) {
        const element = cartData[i];

        const sizeQuantity = {}
        sizeQuantity[Object.keys(element.Size_Quantity)] = element.Quantity
        const obj = { "pId": element.P_Id, sizeQuantity }
        orderProduct.push(obj)
      }
      const item = { "cId": (couponId ? couponId : "noCoupon"), "shippingDetails": sendAddress, "items": orderProduct, "pMode": paymentMethod }
      dispatch(AddOrder(item))
    }
  }
  const RozarPayBox = async (data) => {
   
    if (showRozarpay === true) {
      const options = {
        key: process.env.REACT_APP_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Urban Style",
        description: "Test Transaction",
        image: "https://i.pinimg.com/736x/54/80/a9/5480a93a7a3dc77e074cb49eb7781bad.jpg",
        order_id: data.order.id,
        handler: async (response) => {
          try {
            
            const config = {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
              },
            }
            const item = { "oId": data.oId, "razorpay_order_id": response.razorpay_order_id, "razorpay_payment_id": response.razorpay_payment_id, "razorpay_signature": response.razorpay_signature }
            const result = await axios.post(`http://localhost:8000/payment/verify`, item, config)
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: result.data.msg,
              showConfirmButton: false,
              timer: 2000
            })
            if (result.status === 200) {
              navigate("/myorder")
         
            }
            return result.data
          } catch (error) {
            toast.error(error, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }

        },
        theme: {
          color: "#3399cc"
        },
        config: {
          display: {
            blocks: {
              banks: {
                name: 'All payment methods',
                instruments: [
                  {
                    method: 'upi'
                  },
                  {
                    method: 'card'
                  },
                  {
                    method: 'wallet'
                  },
                  {
                    method: 'netbanking'
                  }
                ],
              },
            },
            sequence: ['block.banks'],
            preferences: {
              show_default_blocks: false,
            },
          },
        },
      }

      const rozar = new window.Razorpay(options);
      rozar.open();
    }
  }
  useEffect(() => {

    if (addOrderMsg) {
      RozarPayBox(addOrderMsg)
    }
  }, [addOrderMsg])

  return (
    <>
      {
        cartGetLoading
          ?
          <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
            <ColorRing
              visible={true}
              height="100"
              width="100"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#32cd32', '#138808', '#228c22', '#abbd81', '#849b87']}
            />
          </div>
          :

          <div className="container mt-5">
            {/* Cart Product Table Start */}
            <div className="row gy-3">
              <div className="table-responsive">
                <table className="table table-hover bg-white text-center" id="table_attribute" style={{
                  borderCollapse: "collapse",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}><thead >
                    <tr>

                      <th className=" py-3 fontSizeHeader">Name</th>
                      <th className=" py-3 fontSizeHeader">Image</th>
                      <th className=" py-3 fontSizeHeader">Brand </th>
                      <th className=" py-3 fontSizeHeader">Price</th>
                      <th className=" py-3 fontSizeHeader">Size Quantity</th>
                      <th className=" py-3 fontSizeHeader">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      cartData.length > 0 ? cartData.map((val, index) => {

                        return (
                          <>
                            <tr key={index}>
                              <td className='text-capitalize table_name  fontSize align-middle'>{val.Name}</td>
                              <td>
                                <NavLink to={`/singleproduct/${val.P_Id}`}><img src={val.Image.images[0]} alt="product" style={{ maxWidth: "50px", height: "50px" }} /></NavLink></td>
                              <td className='text-capitalize  fontSize align-middle'>{val.Brand}</td>
                              <td className='text-capitalize  fontSize align-middle'>{val.Price}</td>
                              <td className='text-capitalize  fontSize align-middle'>
                                <div className='d-flex justify-content-evenly align-items-center'>
                                  <span> {Object.keys(val.Size_Quantity)[0]}</span>
                                  <div>
                                    {
                                      Object.keys(val.Size_Quantity).map((item) => {
                                        return <div>
                                          {
                                            Object.entries(val.Total_Size_Quantity).map(([size, quantity]) => {
                                              if (size === Object.keys(val.Size_Quantity)[0]) {
                                                return (
                                                  <>

                                                    <AiOutlinePlus onClick={() => {
                                                      cartIcrement(val.Id, quantity, Object.values(val.Size_Quantity)[0])
                                                      setQuantity(val.Quantity < (quantity + Object.values(val.Size_Quantity)[0]) ? val.Quantity + 1 : val.Quantity + 0)
                                                    }} style={{ cursor: "pointer", color: "black", fontSize: "17px" }} />
                                                    <span className='mx-2' style={{ fontWeight: "bold" }} >{val.Quantity}</span>
                                                    <GrFormSubtract onClick={() => {
                                                      cartDecrement(val.Id)
                                                      setQuantity(val.Quantity > 1 ? val.Quantity - 1 : 1)
                                                    }} style={{ cursor: "pointer", color: "black", fontSize: "22px" }} />

                                                  </>
                                                )
                                              }
                                            })
                                          }
                                        </div>
                                      })
                                    }
                                  </div>
                                </div>
                              </td>

                              <td className='text-capitalize  fontSize align-middle'>
                                {val.Id === productId ? <button onClick={() => Update(val.Id, Object.keys(val.Size_Quantity)[0])} className='btn btn-outline-info p-1'>Update</button> :
                                  <RiDeleteBin6Line onClick={() => DeletetFromCart(val.Id)} style={{ cursor: "pointer", fontSize: "20px", color: "red" }} />}</td>
                            </tr>
                          </>
                        )
                      })
                        : <tr> <td colSpan={7}> <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "76vh" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Product Available</p>
                          <NavLink to="/"> <button className='btn btn-primary'>Shop Now</button> </NavLink>
                        </div>
                        </td>
                        </tr>
                    }
                    {cartData.length > 0 && <tr>
                      <td colSpan={6}>

                        <div className='d-flex justify-content-end'>
                          <div>
                            <div className='d-flex justify-content-between'> <h6 className>Price : </h6> <span style={{ fontSize: "16px" }}> {cartPrice.totalPrice}</span></div>
                            <div className='d-flex justify-content-between'> <h6 className>Discount : </h6> <span style={{ fontSize: "16px" }}> {couponValue ? couponValue : 0}</span></div>
                            <hr className='mt-0' />
                            <h4>Total Price : {price && price.totalPrice - (couponValue ? couponValue : 0)} </h4>
                          </div>
                        </div>
                      </td>
                    </tr>}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Cart Product Table End */}


            {/* Coupon & Address Button Start */}
            {cartData.length > 0 && <div className='d-flex justify-content-between'>
              {!couponShow ? <button className='btn btn-warning ' onClick={() => showCouponList(price && price.totalPrice)}>Add Coupon</button> : ""}
            </div>}
            {/* Coupon & Address Button End */}


            {/* Coupon Card Start */}
            {couponShow && cartData.length > 0 &&
              <div className="container mt-4 p-0 position-relative">
                <div className='wishlist_div' onClick={() => {
                  setCouponShow(false)
                  setCouponValue(0)
                  setCouponId("")
                }
                }>
                  <AiOutlineClose className='Close_btn' />
                </div>
                <div className="coupon_back coupon_scroll ">
                  {getCouponLoading ? <div style={{ height: "20vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <ColorRing
                      visible={true}
                      height="100"
                      width="100"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#32cd32', '#138808', '#228c22', '#abbd81', '#849b87']}
                    />
                  </div> : <div className="row gy-4">
                    {
                      couponData.length > 0 ? couponData.map((val, index) => {

                        return (
                          <>
                            <div className="col-md-4 col-sm-6 col-lg-3 d-flex justify-content-center">
                              <div className="card w-100">
                                <div className="card-body coupon_card ">
                                  <p className="card-title" style={{ fontSize: "18px", fontWeight: "bold" }}><BiSolidCoupon />:-{val.Coupon_Code}</p>
                                  <div>
                                    <p className="card-text coupon_scroll" style={{ fontSize: "14px", maxHeight: "110px", overflow: "auto" }}>{val.Discription}</p>
                                  </div>
                                  <button className={val.Id === couponId ? "btn btn-success" : 'btn btn-primary'} onClick={() => {
                                    setCouponValue(val.Discount)
                                    setCouponId(val.Id)
                                  }}>{val.Id === couponId ? "Applied" : "Apply"}</button>
                                </div>
                              </div>

                            </div>
                          </>
                        )
                      }) : <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "10px 0px", background: "white", borderRadius: "8px" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Coupon Available</p>
                      </div>
                    }

                  </div>}
                </div>
              </div>
            }
            {/* Coupon Card End */}


            {/* Address start */}
            {cartData.length > 0 && <div className="container p-0 my-4">

              <div className="row">

                <div className=" col-12 mx-auto position-relative">

                  <div className="Address_back coupon_scroll  position-relative">
                    {!newAddress && <button className='btn btn-outline-primary mb-3' onClick={() => setNewAddress(true)}>New Address</button>}
                    {newAddress && <form class="row g-3 mb-3" onSubmit={SendAddress}>
                      <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Name</label>
                        <input type="text" class="form-control" id="inputEmail4" name='name' value={addressData.name} onChange={AddressOnchange} required />
                      </div>
                      <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">Number</label>
                        <input type="number" class="form-control" id="inputPassword4" name='number' value={addressData.number} onChange={AddressOnchange} required />
                      </div>
                      <div class="col-12">
                        <label for="inputAddress" class="form-label">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" name='address' value={addressData.address} onChange={AddressOnchange} required />
                      </div>
                      <div class="col-12">
                        <label for="inputAddress2" class="form-label">Area</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" name='area' value={addressData.area} onChange={AddressOnchange} required />
                      </div>
                      <div class="col-md-4">
                        <label for="inputCity" class="form-label">City</label>
                        <input type="text" class="form-control" id="inputCity" name='city' value={addressData.city} onChange={AddressOnchange} required />
                      </div>
                      <div class="col-md-4">
                        <label for="inputState" class="form-label">State</label>
                        <select id="inputState" class="form-select" name='state' value={addressData.state} onChange={AddressOnchange}>
                          <option selected value="" disabled>Select State</option>
                          {
                            StateList.map((val, index) => {
                              return (
                                <>
                                  <option value={val} >{val}</option>
                                </>
                              )
                            })
                          }
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label for="inputZip" class="form-label">Zip</label>
                        <input type="text" class="form-control" id="inputZip" name='pincode' value={addressData.pincode} onChange={AddressOnchange} required />
                      </div>
                      <div class="col-12 ">
                        <button type="submit" class="btn btn-primary me-3" disabled={addAddressLoading}  >{addAddressLoading ? <><ColorRing
                          visible={true}
                          height="15"
                          width="15"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#198754']}
                        />Loading</> : "Save"}</button>
                        <button type="reset" class="btn btn-danger" onClick={() => {
                          setAddressData({
                            name: "",
                            number: "",
                            address: "",
                            area: "",
                            pincode: "",
                            city: "",
                            state: ""
                          })
                        }}>Reset</button>
                      </div>
                    </form>}
                    <div className="row gy-5">
                      {
                        getAddressLoading ? <div style={{ height: "20vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
                          <ColorRing
                            visible={true}
                            height="100"
                            width="100"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#32cd32', '#138808', '#228c22', '#abbd81', '#849b87']}
                          />
                        </div> : getAddressData.length > 0 &&
                        getAddressData.map((val, index) => {
                          return (
                            <>

                              <div className="col-md-4">
                                <div className={val.Id === addressId ? "card card_back" : "card"} >
                                  <div className="card-body coupon_scroll" style={{ maxHeight: "295px", overflow: "auto" }}>
                                    <div onClick={() => {
                                      setAddressId(val.Id)
                                      setSendAddress(val)

                                    }} style={{cursor:"pointer"}}>
                                      <h5 className="card-title">{val.Name}</h5>
                                      <p className="card-text">{val.Number}</p>
                                      <h6 className="card-subtitle mb-2 ">{val.Address}</h6>
                                      <p className="card-text">{val.Area}</p>
                                      <div className='d-flex '>
                                        <p >{val.City}</p>,
                                        <p className='ms-2'>{val.State}</p>
                                      </div>
                                      <p className="card-text">{val.Pincode}</p>
                                    </div>
                                    <div className='d-flex justify-content-end align-items-center'>

                                      {/* <AiFillHome style={{ cursor: "pointer", fontSize: "20px", color: "#3b71ca" }} /> */}
                                      <RiDeleteBin6Line style={{ cursor: "pointer", fontSize: "20px", color: "red" }} onClick={() => deleteAddress(val.Id)} />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>

              </div>
            </div>}
            {/* Address End */}

            {paymentAddressError && <div className="alert alert-danger p-4" role="alert" >
              Please Select Address Or Payment Method
            </div>}

            {/* Payment Button Start */}
            {cartData.length > 0 &&
              <div className="container my-4 p-0">
                <div className="Address_back">
                  <div className="row">
                    <h4>Payment Method</h4>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="payment" value="PREPAID" onChange={(e) => {
                        setPaymentMethod(e.target.value)

                      }} />
                      <label class="form-check-label" for="flexRadioDefault1">
                        Pay now
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="payment" value="COD" onChange={(e) => {
                        setPaymentMethod(e.target.value)

                      }} />
                      <label class="form-check-label" for="flexRadioDefault2">
                        Cash On Delivery
                      </label>
                    </div>
                    {paymentMethod === "COD" ? <div className="col-12 d-flex justify-content-end">
                      <button className='btn btn-primary' disabled={addOrderLoading} onClick={() => PlaceOrder(cartTotalValue)}>{addOrderLoading ? <><ColorRing
                        visible={true}
                        height="15"
                        width="15"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#198754']}
                      />Loading</> : "Place Order"}</button>
                    </div> : <div className="col-12 d-flex justify-content-end">
                      <button className='btn btn-primary' disabled={addOrderLoading } onClick={() => Payment()}>{addOrderLoading  ? <><ColorRing
                        visible={true}
                        height="15"
                        width="15"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                        colors={['#198754']}
                      />Loading</> : "Pay now"}</button>
                    </div>}
                  </div>
                </div>
              </div>
            }
            {/* Payment Button End */}

          </div>

      }

    </>
  )
}

export default Cart
