import React, { useState, useEffect } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { UserOrder } from "../Store/OrderAction"
import "../style/MyOrder.css"
const MyOrder = () => {
  const dispatch = useDispatch();
  const { userOrderLoading, userOrderMsg } = useSelector((state) => state.order)
  const [orderData, setOrderData] = useState([])

  useEffect(() => {
    dispatch(UserOrder())
  }, [])
  useEffect(() => {
    if (userOrderMsg) {
      setOrderData(userOrderMsg)
    }
  }, [userOrderMsg])
  return (
    <>
      {
        userOrderLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
          <ColorRing
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#32cd32', '#138808', '#228c22', '#abbd81', '#849b87']}
          />
        </div> :
          <div className="container mt-3 mb-3" style={{    height: "calc(100vh - 330px)",overflow: "auto"}}>
            <div className="myorder_back ">
              <div className="row gy-3">
                {
                  orderData.length > 0 ? orderData.map((val, index) => {
                    console.log(val);
                    return (
                      <>
                        <div className="col-lg-4 d-block " key={index}>
                          <NavLink to={`/singleproduct/${val.P_Id}`}>
                            <div className="row ">
                              <div className="col-12 d-flex align-items-center mb-2 mb-md-0 justify-content-center" >
                                <div >
                                  <img src={val.Image.images[0]} alt="product" className='order_image' />
                                </div>
                              </div>
                            </div>
                          </NavLink>
                        </div>
                        <div className="col-lg-8 " key={index}>
                          <div className="row">
                            <div className="col-7 d-flex flex-column justify-content-center" >
                              <h5 style={{fontWeight:"bolder"}}>Order No: #{val.OrderNumber}</h5>
                              <p>Name: {val.Name}</p>
                              <p>Brand: {val.Brand}</p>
                              {Object.entries(val.Size_Quantity).map(([size, quantity]) => {
                                return (
                                  <>
                                    <p>Size: {size}</p>
                                    <p> Quantity:<span className='mx-2' style={{ fontWeight: "bold" }} >{quantity}</span></p>
                                  </>
                                )
                              })}
                              <p>Total Price:{val.T_Price}</p>
                            </div>
                            <div className="col-5 order_status d-flex justify-content-center align-items-center" >
                             {val.Delivery_Date === "None" ? <div className="col-md-12 col-lg-12">
                                <div id="tracking-pre"></div>
                                <div id="tracking">
                                  <div className="tracking-list">
                                    <div className={val.Status === "Pending"||val.Status === "Accepted"||val.Status === "Packed"||val.Status === "Shipped"||val.Status === "Delivered"?"tracking-item" :"tracking-item-pending"}>
                                      <div className="tracking-icon status-intransit">
                                        <svg className="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                          <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                                        </svg>
                                      </div>
                                      <div className="tracking-date"></div>
                                      <div className="tracking-content">Order Placed</div>
                                    </div>
                                    <div className={val.Status === "Accepted"||val.Status === "Packed"||val.Status === "Shipped"||val.Status === "Delivered"?"tracking-item" :"tracking-item-pending"}>
                                      <div className="tracking-icon status-intransit">
                                        <svg className="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                          <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                                        </svg>
                                      </div>
                                      <div className="tracking-date"></div>
                                      <div className="tracking-content">Order Confirmed</div>
                                    </div>
                                    <div className={val.Status === "Packed"||val.Status === "Shipped"||val.Status === "Delivered"?"tracking-item" :"tracking-item-pending"}>
                                      <div className="tracking-icon status-intransit">
                                        <svg className="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                          <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                                        </svg>
                                      </div>
                                      <div className="tracking-date"></div>
                                      <div className="tracking-content">Packed the product</div>
                                    </div>
                                    <div className={val.Status === "Shipped"||val.Status === "Delivered"?"tracking-item" :"tracking-item-pending"}>
                                      <div className="tracking-icon status-intransit">
                                        <svg className="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                          <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                                        </svg>
                                      </div>
                                      <div className="tracking-date"></div>
                                      <div className="tracking-content">Shipped the order</div>
                                    </div>
                                    <div className={val.Status === "Delivered"?"tracking-item" :"tracking-item-pending"}>
                                      <div className="tracking-icon status-intransit">
                                        <svg className="svg-inline--fa fa-circle fa-w-16" aria-hidden="true" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                                          <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
                                        </svg>
                                      </div>
                                      <div className="tracking-date"></div>
                                      <div className="tracking-content">Delivered</div>
                                    </div>
                                  </div>
                                </div>
                              </div>: <div ><span style={{fontWeight:"bold"}}>Delivery Date:</span> {val.Delivery_Date.split("-").reverse().join("-")}</div>}
                            </div>



                          </div>
                        </div>

                      </>
                    )
                  }) :
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "90vh" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Product Available</p>
                      <NavLink to="/">  <button className='btn btn-primary'>Shop Now</button> </NavLink>
                    </div>
                }
              </div>
            </div>
          </div>

      }

    </>
  )
}

export default MyOrder
