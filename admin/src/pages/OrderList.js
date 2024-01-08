import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { ColorRing } from 'react-loader-spinner';
import { FaLessThan, FaGreaterThan } from "react-icons/fa"
import { FcCancel } from "react-icons/fc"
import { DeleteOrder, GetOrder, UpdateOrderStatus, UpdateRefundStatus, SerachOrder } from "../Store/OrderAction";
const OrderList = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1)
  const [orderData, setOrderData] = useState([])
  const [search, setSerach] = useState("")
  const { getOrderListLoading, getOrderListMsg, deleteOrderMsg, updateOrderStatusMsg, updateOrderStatusLoading, deleteorderLoading, updateRefundStatusMsg, updateRefundStatusLoading, searchOrderLoading, searchOrderMsg } = useSelector((state) => state.order)

  useEffect(() => {
    dispatch(GetOrder(page))
  }, [page, deleteOrderMsg, updateOrderStatusMsg, updateRefundStatusMsg])

  useEffect(() => {
    if (getOrderListMsg) {
      setOrderData(getOrderListMsg)
    }
  }, [getOrderListMsg])
  const OrderStatusChange = (value, id,uId) => {
    const item = { id, "status": value ,"uId":uId }
    dispatch(UpdateOrderStatus(item))

    const update = orderData.map((val) => {
      if (val.Id === id) {
        if (val.Order_Status === "Pending") {
          return { ...val, Order_Status: "Accepted" }
        }
        else if (val.Order_Status === "Accepted") {
          return { ...val, Order_Status: "Packed" }
        }
        else if (val.Order_Status === "Packed") {
          return { ...val, Order_Status: "Shipped" }
        }
        else if (val.Order_Status === "Shipped") {
          return { ...val, Order_Status: "Delivered" }
        }
        else if (val.Order_Status === "Delivered") {
          return { ...val, Order_Status: "Delivered" }
        }


      }
      return val
    })
    setOrderData(update)
  }
  const RefundStatusChange = (value, id) => {
    const item = { id, "status": value }
    dispatch(UpdateRefundStatus(item))
  }
  const CancelOrder = (id) => {
    dispatch(DeleteOrder(id))
  }
  const SerachOrderNo = () => {
    dispatch(SerachOrder(search))
    setSerach("")
  }

  useEffect(() => {
    if (searchOrderMsg) {
      setOrderData(searchOrderMsg)
    }
  }, [searchOrderMsg])
  
  return (
    <>
      {getOrderListLoading || updateRefundStatusLoading || deleteorderLoading || updateOrderStatusLoading  ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
        <div className="container-fluid my-1">
          <div className="row gy-3 d-flex align-items-center mt-2">
            <div className="col-4 mx-auto">
              <div className="d-flex justify-content-around">
                <input type="text" className="w-75 serach_orderN0" placeholder="Search by Order No." value={search} onChange={(e) => setSerach(e.target.value)} />
                <button type="button" className="btn btn-primary btn-sm" onClick={() => SerachOrderNo()} disabled={searchOrderLoading}>{searchOrderLoading ? <><ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={['#198754']}
                />Loading</> : "Search"}</button>
              </div>
            </div>
            <div className='col-12 product_scroll product_list1' >
              <div className="table-responsive">
                <table className="table table-hover bg-white " id="table_attribute" style={{
                  borderCollapse: "collapse",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <thead >
                    <tr>

                      <th className=" py-3 fontSizeHeader">Order No.</th>
                      <th className=" py-3 fontSizeHeader">Name</th>
                      <th className=" py-3 fontSizeHeader">Shipping Details</th>
                      <th className=" py-3 fontSizeHeader">Coupon </th>
                      <th className=" py-3 fontSizeHeader">Total Price</th>
                      <th className=" py-3 fontSizeHeader">Order Status </th>
                      <th className=" py-3 fontSizeHeader">Delivery Date</th>
                      <th className=" py-3 fontSizeHeader">Payment Status</th>
                      <th className=" py-3 fontSizeHeader">Due Refund</th>
                      <th className=" py-3 fontSizeHeader">Total Refund </th>
                      <th className=" py-3 fontSizeHeader">Refund Status </th>
                      <th className=" py-3 fontSizeHeader">Cancel Order</th>
                    </tr>
                  </thead>
                  <tbody >
                    {
                      orderData.length !== 0 ? orderData.map((val, index) => {
                        console.log(val);
                        return (
                          <>
                            <tr key={index}>
                              <td className='text-capitalize fontSize align-middle text-center'><NavLink to={`/order/${val.Id}`} style={{ fontWeight: "bold", textDecoration: "none" }}>#{val.O_Number}</NavLink></td>
                              <td className='text-capitalize fontSize align-middle text-center'>{val.Name}</td>
                              <td className='text-capitalize fontSize align-middle '><div className="px-4 product_scroll" style={{
                                maxHeight: "95px",
                                overflow: "auto"
                              }}>
                                <p className="admin_order_Address_details">Name :-  <span>{val.Shipping_Details.Name}</span></p>
                                <p className="admin_order_Address_details">Mobile No:-<span>{val.Shipping_Details.Number}</span></p>
                                <p className="admin_order_Address_details">Address:-<span>{val.Shipping_Details.Address}</span></p>
                                <p className="admin_order_Address_details">Area:-<span>{val.Shipping_Details.Area}</span></p>
                                <p className="admin_order_Address_details">State:-<span>{val.Shipping_Details.State}</span></p>
                                <p className="admin_order_Address_details">City:-<span>{val.Shipping_Details.City}</span></p>
                                <p className="admin_order_Address_details">Pincode:-<span>{val.Shipping_Details.Pincode}</span></p>
                              </div>
                              </td>
                              <td className='text-capitalize fontSize align-middle text-center'>{val.Discount_Coupon === "None" ? "---" : val.Discount_Coupon}</td>
                              <td className='text-capitalize fontSize align-middle text-center'>{val.T_Price}</td>
                              <td className='text-capitalize fontSize align-middle text-center'>
                                <div className="d-flex justify-content-center">
                                  {val.Order_Status === "Delivered" || val.Order_Status === "Canceled" ? null :
                                    <select className="form-select form-select py-2 px-1" aria-label=".form-select-lg example" onChange={(e) => {
                                      OrderStatusChange(e.target.value, val.Id,val.U_Id)
                                    }}>
                                      {val.Order_Status === "Pending" &&
                                        <>
                                          <option value="Pending" >Pending</option>
                                          <option value="Accepted">Accepted</option>
                                        </>
                                      }
                                      {val.Order_Status === "Accepted" &&
                                        <>
                                          <option value="Accepted" >Accepted</option>
                                          <option value="Packed">Packed</option>
                                        </>
                                      }{val.Order_Status === "Packed" &&
                                        <>
                                          <option value="Packed" >Packed</option>
                                          <option value="Shipped">Shipped</option>
                                        </>
                                      }{val.Order_Status === "Shipped" &&
                                        <>
                                          <option value="Shipped" >Shipped</option>
                                          <option value="Delivered">Delivered</option>
                                        </>
                                      }
                                    </select>}
                                  {val.Order_Status === "Delivered" && <div className="d-flex justify-content-center">
                                    <div className="alert alert-success p-2 mb-0" style={{ width: "100px" }} role="alert">
                                      {val.Order_Status}
                                    </div>
                                  </div>}
                                  {val.Order_Status === "Canceled" && <div className="d-flex justify-content-center ">
                                    <div className="alert alert-danger p-2 mb-0" style={{ width: "100px" }} role="alert">
                                      {val.Order_Status}
                                    </div>
                                  </div>}
                                </div>
                              </td>
                              <td className='text-capitalize fontSize align-middle text-center'>
                                <p className="mb-0">{val.Delivery_Date === "None"?"---":val.Delivery_Date.split("-").reverse().join("-")}</p>
                              </td>
                              <td className='text-capitalize fontSize align-middle text-center'>
                                <div className="d-flex justify-content-center">
                                  <div className="alert alert-warning p-2 mb-0" style={{ width: "100px" }} role="alert">
                                    {val.Payment_Status}
                                  </div>
                                </div>
                              </td>
                              <td className='text-capitalize fontSize align-middle text-center'>{val.Due_Refund_Amount}</td>
                              <td className='text-capitalize fontSize align-middle text-center'>{val.Total_Refund_Amount}</td>
                              <td className='text-capitalize fontSize align-middle text-center'>
                                {val.Refund_Status === "None" && <>---</>}
                                {val.Refund_Status === "Paid" && <div className="d-flex justify-content-center">
                                  <div className="alert alert-success p-2 mb-0" style={{ width: "100px" }} role="alert">
                                    {val.Refund_Status}
                                  </div>
                                </div>}
                                {val.Refund_Status === "Unpaid" &&
                                  <select className="form-select form-select py-2 px-1" aria-label=".form-select-lg example" onChange={(e) => RefundStatusChange(e.target.value, val.Id)}>
                                    <option value="Unpaid">Unpaid</option>
                                    <option value="Paid">Paid</option>
                                  </select>
                                }
                              </td>
                              <td className='text-capitalize fontSize align-middle text-center'> {val.Cancel_Status === true ? <button style={{ background: "transparent", border: "1px solid red", padding: "3px" }} disabled={deleteorderLoading}> <FcCancel style={{ fontSize: "20px", color: "red", cursor: "pointer" }} onClick={() => CancelOrder(val.Id)} /></button> : "---"} </td>
                            </tr>

                          </>
                        )

                      }) : <> <tr> <td colSpan={13}>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No data</p></div> </td></tr></>
                    }
                  </tbody>
                </table>
              </div>
            </div>

            {orderData.length > 0 &&
              <div className="col-12 mt-3 d-flex justify-content-end">
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='pagination_arrow' onClick={() => {
                    if (page > 1) {
                      setPage(page - 1)
                    }
                  }}>
                    <FaLessThan />
                  </div>
                  <span className="mx-2 align-items-center" style={{ fontWeight: "bold", fontSize: "18px" }}>{page}</span>
                  <button disabled={orderData.length < 15} onClick={() => {
                    setPage(page + 1)
                  }} className='pagination_arrow'>
                    <FaGreaterThan />
                  </button>

                </div>
              </div>}
          </div>


        </div>
      }
    </>
  )
};

export default OrderList;
