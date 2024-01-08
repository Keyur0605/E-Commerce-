import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { GetOrderItem } from '../Store/OrderAction'
import { ColorRing } from 'react-loader-spinner'
import { AiOutlinePlus } from "react-icons/ai";
import { GrFormSubtract } from "react-icons/gr"
import { UpdateOrderItemQuantity, DeleteOrderItem } from "../Store/OrderItemAction"
import "../Style/Order.css"
const OrderItem = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const [orderItemData, setOrderItemData] = useState([])
  const [quantityvalue, setQuantityValue] = useState("")
  const [updateBtn, setUpdateBtn] = useState(false)
  const [itemId, setItemId] = useState("")
  const [deleteId, setDeleteId] = useState("")
  const { getOrderItemListLoading, getOrderItemListMsg, } = useSelector((state) => state.order)
  const { updateOrderQuantityLoading, deleteOrderQuantityLoading,updateOrderQuantityMsg,deleteOrderQuantityMsg } = useSelector((state) => state.orderitem)
  useEffect(() => {
    dispatch(GetOrderItem(id))
  }, [deleteOrderQuantityMsg,updateOrderQuantityMsg])
  useEffect(() => {
    if (getOrderItemListMsg) {
      const update = getOrderItemListMsg.map((val) => {
        return { ...val, "isDefault": val.Quantity === 1 ? true : false }
      })
      setOrderItemData(update)
    }
  }, [getOrderItemListMsg])

  const cartIcrement = (id, inintialquantity) => {
    setUpdateBtn(true)
    setItemId(id)
    setOrderItemData((cart) =>
      cart.map((item) => {
        if (item.Id === id) {
          let update = { ...item, Quantity: (item.Quantity < (inintialquantity) ? item.Quantity + 1 : item.Quantity + 0) }
          return update
        }
        return item
      }
      )
    )
  }
  const cartDecrement = (id) => {
    setUpdateBtn(true)
    setItemId(id)
    setOrderItemData((cart) =>
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

  const UpdateQuantity = (itemid) => {
    setDeleteId(itemid)
    const item = { "oId": id, "id": itemid, "quantity": quantityvalue }
    dispatch(UpdateOrderItemQuantity(item))
  }

  const ReturnItem = (productid, isDefault) => {
    setDeleteId(productid)
    if (isDefault === true) {
      const item = { "oId": id, "id": productid, "quantity": 1 }
      dispatch(DeleteOrderItem(item))
    }
    else {
      const item = { "oId": id, "id": productid, "quantity": quantityvalue }
      dispatch(UpdateOrderItemQuantity(item))
    }
  }

  const CancelOrder = (productid) => {
    setDeleteId(productid)
    const item = { "oId": id, "id": productid }
    dispatch(DeleteOrderItem(item))
  }
  return (

    <>
      {getOrderItemListLoading || deleteOrderQuantityLoading || updateOrderQuantityLoading   ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
        <div className="container my-1 py-5">
          <div className='orderItem_back'>
            <div className="row  d-flex align-items-center mt-2 mx-auto">
              {
                orderItemData.length !== 0 ? orderItemData.map((val, index) => {
                  console.log(val);
                  return (
                    <>
                      <div className='row gy-4'>


                        <div className="col-md-5 d-block mt-0 ">
                          <div className="row ">
                            <div className="col-12 d-flex align-items-center mb-2 mb-md-0 justify-content-center" >
                              <div >
                                <img src={val.Image.images[0]} alt="product" className='product_image' />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-7">
                          <p>Name: {val.Name}</p>
                          <p>Brand: {val.Brand}</p>
                          {Object.entries(val.Size_Quantity).map(([size, quantity]) => {

                            return (
                              <>
                                <p>Size: {size}</p>
                                <p> Quantity:
                                  {val.isDefault === false   ? <>{ (val.Cancel_Status || val.Return_Status) &&<AiOutlinePlus onClick={() => {
                                    cartIcrement(val.Id, quantity)
                                    setQuantityValue(val.Quantity < (quantity) ? val.Quantity + 1 : val.Quantity + 0)
                                  }} style={{ cursor: "pointer", color: "black", fontSize: "17px" }} />} </>: ""}
                                  <span className='mx-2' style={{ fontWeight: "bold" }} >{val.Quantity}</span>
                                  {!val.isDefault  ? <>{ (val.Cancel_Status || val.Return_Status) &&<GrFormSubtract onClick={() => {
                                    cartDecrement(val.Id)
                                    setQuantityValue(val.Quantity > 1 ? val.Quantity - 1 : 1)
                                  }} style={{ cursor: "pointer", color: "black", fontSize: "22px" }} />} </>: ""}
                                </p>
                              </>
                            )
                          })}
                          <p>Total Price:{val.T_Price}</p>
                          {val.Cancel_Status === true && <div className='d-flex'>
                            {updateBtn && val.Id === itemId && <button className='btn btn-success me-3' disabled={val.Id === deleteId && updateOrderQuantityLoading} onClick={() => UpdateQuantity(val.Id)}>{val.Id === deleteId ? updateOrderQuantityLoading ? <><ColorRing
                              visible={true}
                              height="30"
                              width="30"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={['#198754']}
                            />Loading</> : "Update" : "Update"}</button>}
                            <button className='btn btn-danger' onClick={() => CancelOrder(val.Id)} disabled={val.Id === deleteId && deleteOrderQuantityLoading} >{val.Id === deleteId ? deleteOrderQuantityLoading ? <><ColorRing
                              visible={true}
                              height="30"
                              width="30"
                              ariaLabel="blocks-loading"
                              wrapperStyle={{}}
                              wrapperClass="blocks-wrapper"
                              colors={['#198754']}
                            />Loading</> : "Cancel" : "Cancel"}</button>
                          </div>}

                          {val.Return_Status &&
                            <div>
                              <button className='btn btn-success me-3' disabled={val.Id === deleteId ? deleteOrderQuantityLoading || updateOrderQuantityLoading : ""} onClick={() => ReturnItem(val.Id, val.isDefault)}>{val.Id === deleteId ? deleteOrderQuantityLoading || updateOrderQuantityLoading ? <><ColorRing
                                visible={true}
                                height="30"
                                width="30"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#198754']}
                              />Loading</> : "Return" : "Return"}</button>
                            </div>}

                        </div>
                      </div>
                    </>
                  )

                }) : <>
                  <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "calc(100vh - 180px)" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No data</p></div> </>
              }
            </div>
          </div>
        </div>

      }
    </>
  )
}

export default OrderItem
