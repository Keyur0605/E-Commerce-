import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import "../Style/Category.css"
// import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiEdit } from "react-icons/bi"
import { useSelector, useDispatch } from "react-redux"
import { AddMainCate, GetMainCate, DeleteMainCate, UpdateMainCate } from '../Store/CategoryAction';
import { ColorRing } from 'react-loader-spinner';
const schema = yup.object({
  name: yup.string().required("Main Category name is required"),


})

const AddMainCategory = () => {
  const dispatch = useDispatch();
  const [getCategory, setGetCategory] = useState([])
  const [update, setUpdate] = useState("")
  const [updateInput, setUpdateInput] = useState(false)
  const [image, setImage] = useState([])
  const { isLoading, getLoading, getMainCate, MainCategory, updatemainLoading, updatemainMsg } = useSelector((state) => state.main_category)
  const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => {
    reset()
    if (updateInput) {
      if (image !== undefined) {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("id", update.Id)
        formData.append("image", image)
        dispatch(UpdateMainCate(formData))
        setUpdate(null)
      }
      else {
        alert("please select one image")
      }
    }
    else {
      if (image !== undefined) {
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("image", image)
        dispatch(AddMainCate(formData))
        setImage()
      }
      else {
        alert("please select one image")
      }

    }
  }

  const toggleModal = (val) => {
    setUpdateInput(val)
  }

  useEffect(() => {
    dispatch(GetMainCate())
    setUpdate("")
  }, [MainCategory, updatemainMsg])


  useEffect(() => {
    if (getMainCate) {
      setGetCategory(getMainCate)
    }
  }, [getMainCate])

  const ImageBuffer = (e) => {
    setImage(e.target.files[0])
  }
  const deleteMainCategory = (ele) => {
    dispatch(DeleteMainCate(ele))
    const update = getCategory.filter((current) => {
      return current.Id !== ele
    })
    setGetCategory(update)
  }

  const Cancel = () => {
    reset()
    setUpdate("")
  }
  console.log(typeof (image));
  return (
    <>

      {getLoading || updatemainLoading || isLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
              <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => toggleModal(false)}>
                Add Main Category
              </button>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop='static' aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="col-10 mx-auto">
                        <h3>{updateInput ? "Update" : "Add"} Main Category</h3>
                      </div>
                      <div className="col-10 mx-auto">
                        <div className="form-floating mb-3">
                          {updateInput ?
                            <input type="text" className="form-control text-capitalize" placeholder="Main Category Name" {...register("name", { required: true })} /> :
                            <input type="text" className="form-control " placeholder="Attribute Name" {...register("name", { required: true })} />}
                          <label htmlFor="floatingInput">{updateInput ? "Update" : "Add"} Main Category Name</label>
                          <p style={{ color: "red", fontSize: "14px" }}>{errors.name?.message}</p>
                        </div>
                        <div className="form-floating mb-3">
                          <input type="file" accept="image/jpeg, image/png" onChange={ImageBuffer} />
                        </div>
                      </div>
                      <div className="d-flex  justify-content-between col-10 mx-auto">
                        <button type="submit" className="btn btn-success" data-bs-dismiss={errors.name ? "" : "modal"} disabled={isLoading ? true : false}>{isLoading ? <><ColorRing
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
            <div className="   col-md-10 col-lg-8 col-sm-10 mx-auto col-12  mt-lg-0 mt-3 category_scroll" style={{ maxHeight: "90vh", overflow: "auto" }} >
              <div className="row">
                <table className="table table-hover bg-white text-center align-items-center" id="table_attribute" style={{
                  borderCollapse: "collapse",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <thead >
                    <tr>

                      <th className=" col-4 py-3">Main Category</th>
                      <th className=" col-4 py-3">Image</th>
                      <th className=" col-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody >

                    {
                      getCategory.length > 0
                        ?
                        getCategory.map((val, index) => {

                          return (
                            <>
                              <tr key={index}>
                                <td className="py-3 text-capitalize align-middle">{val.Name}</td>
                                <td className="py-3 "><img src={val.Image} alt="main category" style={{ maxWidth: "70px", height: "70px" }} /></td>
                                <td className="py-3 align-middle" >{<span data-bs-toggle="modal" style={{ cursor: "pointer" }} data-bs-target="#exampleModal" onClick={() => setValue("name", val.Name)} >
                                  <BiEdit className='me-2' style={{ color: "#6F94EF", fontSize: "20px" }} onClick={() => {
                                    toggleModal(true)
                                    setUpdate(val)
                                  }} />
                                </span>} {<RiDeleteBin6Line onClick={() => deleteMainCategory(val.Id)} style={{ cursor: "pointer", color: "red", fontSize: "20px" }} />} </td>
                              </tr>
                            </>
                          )
                        }
                        )
                        :
                        <> <tr> <td colSpan={3}>
                          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No data</p></div> </td></tr></>

                    }

                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* <ToastContainer /> */}
        </div>
      }

    </>


  )
}

export default AddMainCategory
