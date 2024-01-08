import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import { AddCoupon, GetCoupon ,DeleteCoupon } from '../Store/CouponAction';
import * as yup from "yup";
import { ColorRing } from 'react-loader-spinner';
import { RiDeleteBin6Line } from "react-icons/ri"
const schema = yup.object({
  couponCode: yup.string().required("Coupon Code is required"),
  discription: yup.string().required("Discription is required"),
  discount: yup.number().required("Discount Amount is required")
    .typeError("Please enter number value only")
    .nullable()
    .moreThan(-1, "Negative values not accepted"),
  minCartValue: yup.number().
    required("Minimum CartValue is required")
    .typeError("Please enter number value only")
    .nullable()
    .moreThan(-1, "Negative values not accepted"),
})
const Coupon = () => {
  const dispatch = useDispatch();
  const [couponData, setCouponData] = useState([])
  const { register, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })
  const { addCouponLoading, addCouponMsg, getCouponLoading, getCouponMsg, getCouponError } = useSelector((state) => state.coupon)

  useEffect(() => {
    dispatch(GetCoupon())
  }, [addCouponMsg])
  useEffect(() => {
    if (getCouponMsg) {
      setCouponData(getCouponMsg)
    }
  }, [getCouponMsg])
  const onSubmit = (data) => {
    dispatch(AddCoupon(data))
    reset()
  }

  const deleteCoupon = (id) => {
    console.log(id, "id");
    const update = couponData.filter((val)=>val.Id !== id)
    setCouponData(update)
    dispatch(DeleteCoupon(id))
  }
 
  return (
    <>
      {getCouponLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
        <div className="container-fluid my-1" >
          <div className="row">
            <div className="col-md-12 col-lg-11 col-xl-9 col-sm-10 mx-auto col-12 my-3 d-flex justify-content-end" >
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                Add Coupon
              </button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop='static' aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-10 mx-auto">
                        <h3>Add Coupon</h3>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" {...register("couponCode", { required: true })} />
                        <label for="floatingInput">Coupon Code</label>
                        <p style={{ color: "red", fontSize: "14px" }}>{errors.couponCode?.message}</p>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" {...register("discription", { required: true })} />
                        <label for="floatingInput">Description</label>
                        <p style={{ color: "red", fontSize: "14px" }}>{errors.discription?.message}</p>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" {...register("discount", { required: true })} />
                        <label for="floatingInput">Discount Value</label>
                        <p style={{ color: "red", fontSize: "14px" }}>{errors.discount?.message}</p>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="text" className="form-control" {...register("minCartValue", { required: true })} />
                        <label for="floatingInput">Minimum Cart Value</label>
                        <p style={{ color: "red", fontSize: "14px" }}>{errors.minCartValue?.message}</p>
                      </div>
                      <div className="d-flex  justify-content-between col-10 mx-auto">
                        <button type="submit" className="btn btn-success" data-bs-dismiss={errors.couponCode || errors.discription || errors.minCartValue || errors.discount ? "" : "modal"} disabled={addCouponLoading}>{addCouponLoading ? <><ColorRing
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#198754']}
                        />Loading</> : "Save"}</button>
                        <button type="button" className="btn btn-danger" onClick={() => {
                          reset()
                        }} data-bs-dismiss="modal">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="   col-md-12 col-lg-11 col-xl-9 col-sm-10 mx-auto col-12  mt-lg-0 mt-3 "  >
              <div className="back_policy policy_scroll">
                <div className="row">
                  <div className="table-responsive-lg">
                    <table className="table table-hover bg-white text-center" id="table_attribute" style={{
                      borderCollapse: "collapse",
                      borderRadius: "8px",
                      overflow: "hidden"
                    }}>
                      <thead >
                        <tr>
                          <th className="py-3">Coupon Code</th>
                          <th className="py-3">Discription</th>
                          <th className="py-3">Discount</th>
                          <th className="py-3">Minimum Cart Value</th>
                          <th className="py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody >
                        {
                          couponData.length > 0 ? couponData.map((val) => {

                            return (
                              <>
                                <tr>
                                  <td className="py-3 text-capitalize align-middle ">{val.Coupon_Code}</td>
                                  <td className="py-3 text-capitalize table_discription"> {val.Discription}</td>
                                  <td className="py-3 text-capitalize align-middle">{val.Discount}</td>
                                  <td className="py-3 text-capitalize align-middle">{val.Min_Cart_Value}</td>
                                  <td className="py-3 align-middle " >
                                    <RiDeleteBin6Line onClick={() => deleteCoupon(val.Id)} style={{ cursor: "pointer", color: "red", fontSize: "20px" }} /> </td>
                                </tr>
                              </>
                            )
                          }) :<tr> <td colSpan={5}> <div style={{ display: "flex", height: "calc(100vh - 222px)", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Coupon Availabel</p></div></td></tr> 
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      }
    </>
  )
}

export default Coupon
