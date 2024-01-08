import React, { useEffect, useState, useCallback } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import "../Style/Category.css"
import { RiDeleteBin6Line } from "react-icons/ri"
import {FaLessThan,FaGreaterThan} from "react-icons/fa"
import { BiEdit } from "react-icons/bi"
import { GetMainCate } from '../Store/CategoryAction'
import { useSelector, useDispatch } from "react-redux"
import { AddSubCate, GetSubCate, DeleteSubCate, UpdateSubCate, GetCateId } from '../Store/CategoryAction'
import { ColorRing } from 'react-loader-spinner';

const schema = yup.object({
  name: yup.string().required("Category Name is Required"),
  mId: yup.string().required("Select Main Category is Required"),
  cId: yup.string().required("Select  Category is Required")
})
const AddSubCategory = () => {
  const [update, setUpdate] = useState('')
  const [updateInput, setUpdateInput] = useState(false)
  const dispatch = useDispatch();
  const [SubCategory, setSubCategory] = useState([])
  const [image, setImage] = useState([])
  const [page, setPage] = useState(1)
  const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  const { getMainCate, getLoading } = useSelector((state) => state.main_category)
  const { getIdCate, getCateIdLoading } = useSelector((state) => state.category)
  const { isLoading, getSubLoading, getSubCate, SubCate, updateSubMsg, updateSubLoading } = useSelector((state) => state.sub_category)

  const onSubmit = (data) => {
    if (updateInput) {
      if (image !== undefined) {
        // const item = { "name": data.name, "id": update.Id,"image":image  }
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("id", update.Id)
        formData.append("image", image)
        dispatch(UpdateSubCate(formData))
        setUpdate("")
      }
      else {
        alert("Please select one image")
      }

    }
    else {
      if (image !== undefined) {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("cId", data.cId)
        formData.append("mId", data.mId)
        formData.append("image", image)
        dispatch(AddSubCate(formData))
      }
      else {
        alert("please select one image")
      }
    }
    reset()
  }
  useEffect(() => {
    dispatch(GetMainCate())
  }, [])

  const datas = useCallback(() => {

    dispatch(GetSubCate(page))
  }, [SubCate, updateSubMsg,page])
  useEffect(() => {
    datas()
  }, [SubCate, updateSubMsg,page])

  useEffect(() => {
    if (getSubCate) {
      setSubCategory(getSubCate)
    }
  }, [getSubCate])



  const deleteSubCategory = (id) => {
    dispatch(DeleteSubCate(id))
    const update = SubCategory.filter((val, index) => {
      return val.Id !== id
    })
    setSubCategory(update)
  }
  const ImageBuffer = (e) => {

    setImage(e.target.files[0])
  }
  const Cancel = () => {
    reset()
    setUpdate("")
  }


  return (
    <>
      {getSubLoading || getLoading || updateSubLoading || isLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
            <div className="col-md-10 col-lg-8 col-sm-10 mx-auto col-12 my-3 d-flex justify-content-end" >
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setUpdateInput(false)}>
                Add Sub Category
              </button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop='static' aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-10 mx-auto">
                        <h3>{updateInput ? "Update" : "Add"} Sub Category</h3>
                      </div>
                      <div className="col-10 mx-auto">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control text-capitalize" placeholder="Sub Category Name" {...register("name", { required: true })} />
                          <label htmlFor="floatingInput">{updateInput ? "Update" : "Add"} Sub Category Name</label>
                          <p style={{ color: "red", fontSize: "14px" }}>{errors.name?.message}</p>
                        </div>
                        <div className="form-floating mb-3">
                          <input type="file" accept="image/jpeg, image/png" onChange={ImageBuffer} />
                        </div>
                        <div className="form-floating">
                          <select className="form-select" id="floatingSelect"  {...register("mId", {
                            required: true, onChange: (e) => {
                              const m_id = e.target.value
                              dispatch(GetCateId(m_id))
                            }
                          })}>
                            <option selected value="" disabled >Select Main Category</option>
                            {
                              getMainCate.length > 0
                                ?
                                getMainCate.map((val, index) => {
                                  return (
                                    <>
                                      <option selected={val.Name === update.M_Name ? update.M_Name : ""} key={index} defaultValue={update.M_Name} value={val.Id}>{val.Name}</option>
                                    </>
                                  )
                                }) : <option selected value="" disabled style={{ color: "red" }} >Please Set Main Category </option>
                            }

                          </select>
                          <label htmlFor="floatingSelect">Main Category</label>
                          <p style={{ color: "red", fontSize: "14px" }}>{errors.mId?.message}</p>
                        </div>

                        {getCateIdLoading ? <div style={{ height: "15vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
                          <ColorRing
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#32cd32', '#138808', '#228c22', '#abbd81', '#849b87']}
                          />

                        </div> : <div className="form-floating">
                          <select className="form-select" id="floatingSelect"{...register("cId", { required: true })}>
                            <option selected value="" disabled>Select  Category</option>
                            {
                              getIdCate.length > 0
                                ?
                                getIdCate.map((val, index) => {

                                  return (
                                    <>
                                      <option selected={val.Name === update.C_Name ? update.C_Name : ""} key={index} defaultValue={update.C_Name} value={val.Id}>{val.Name}</option>
                                    </>
                                  )
                                }) : <option selected value="" disabled style={{ color: "red" }} > Please Set Category </option>
                            }

                          </select>
                          <label htmlFor="floatingSelect"> Category</label>
                          <p style={{ color: "red", fontSize: "14px" }}>{errors.cId?.message}</p>
                        </div>}

                      </div>

                      <div className="d-flex  justify-content-between col-10 mx-auto">

                        <button type="submit" className="btn btn-success" data-bs-dismiss={errors.name || errors.mId || errors.cId ? "" : "modal"} disabled={isLoading ? true : false}>{isLoading ? <><ColorRing
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#198754']}
                        />Loading</> : "Save"}</button>

                        <button type="button" className="btn btn-danger" onClick={() => Cancel()} data-bs-dismiss="modal">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="   col-md-10 col-lg-8 col-sm-10 mx-auto col-12  mt-lg-0 mt-3 table_scroll" style={{maxHeight:"calc(100vh - 155px)",overflow:"auto"}}>
              <div className="row">
              <div className="table-responsive">
                <table className="table table-hover bg-white text-center" id="table_attribute" style={{
                  borderCollapse: "collapse",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <thead >
                    <tr>

                      <th className="py-3">Sub Category</th>
                      <th className="py-3">Image</th>
                      <th className="py-3">Category</th>
                      <th className="py-3">Main Category</th>
                      <th className="py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody >

                    {
                      SubCategory.length > 0
                        ?
                        SubCategory.map((val, index) => {
                          return (
                            <>
                              <tr>
                                <td className="py-3 text-capitalize align-middle ">{val.Name}</td>
                                <td className="py-3 text-capitalize"> <img src={val.Image} style={{ maxWidth: "70px", height: "70px" }} alt="sub-categoey" /></td>
                                <td className="py-3 text-capitalize align-middle">{val.C_Name}</td>
                                <td className="py-3 text-capitalize align-middle">{val.M_Name}</td>
                                <td className="py-3 align-middle " >{
                                  <span data-bs-toggle="modal" style={{ cursor: "pointer" }} data-bs-target="#exampleModal" onClick={() => setValue("name", val.Name)} >
                                    <BiEdit className='me-2' style={{ color: "#6F94EF", fontSize: "20px" }} onClick={() => {
                                      setUpdateInput(true)
                                      setUpdate(val)
                                    }} />
                                  </span>} {<RiDeleteBin6Line onClick={() => deleteSubCategory(val.Id)} style={{ cursor: "pointer", color: "red", fontSize: "20px" }} />} </td>
                              </tr>
                            </>
                          )
                        }
                        )
                        :
                        <> <tr> <td colSpan={5}>
                          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No data</p></div> </td></tr></>

                    }

                  </tbody>
                </table>
              </div>
              </div>
            </div>
            {SubCategory.length > 0 &&
              <div className="col-md-10 mt-3 d-flex justify-content-end">
                <div className='d-flex justify-content-between align-items-center'>
                  <button className='pagination_arrow'onClick={() => {
                    if (page > 1) {
                      setPage(page - 1)
                    }
                  }}>
                  <FaLessThan  />
                  </button>
                  <span className="mx-2 align-items-center" style={{ fontWeight: "bold", fontSize: "18px" }}>{page}</span>
                  <button  disabled={SubCategory.length < 10} onClick={() => {
                    setPage(page + 1)
                  }} className='pagination_arrow'>
                  <FaGreaterThan  />
                  </button>
                  
                </div>
              </div>}
          </div>
        </div>
      }
    </>
  )
}

export default AddSubCategory
