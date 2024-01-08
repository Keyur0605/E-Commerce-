import React, { useState, useEffect } from "react";
import "../Style/Attribute.css"
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux"
import { AddAttribute, GetAttributeGroup, GetAttributeList, DeleteAttribute } from "../Store/AttributeAction"
import { ColorRing } from "react-loader-spinner"
import { RiDeleteBin6Line } from "react-icons/ri"


const schema = yup.object({
  name: yup.string().required("Attribute name is required"),
  g_name: yup.string().required("Attribute Group is required"),
})
const Attribute = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const { attribute, isLoading, isError, attributeGroup, delMsg, isLoadingAttribute, loading, AddAttri } = useSelector((state) => state.attribute)
  const [attriName, setAttriName] = useState(true)
  const [attri, setAttri] = useState([])

  const { register, reset, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema)
  })


  useEffect(() => {
    if (attributeGroup) {
      setAttri(attributeGroup)
    }
  }, [attributeGroup])

  const onSubmit = (data) => {
    reset()
    dispatch(AddAttribute(data))

  }
  useEffect(() => {
    dispatch(GetAttributeList())
    dispatch(GetAttributeGroup())

  }, [AddAttri])

  const deleteAttribute = (id) => {
    dispatch(DeleteAttribute(id))
    const update = attri.filter((current) => {
      return current.Id !== id
    })
    setAttri(update)
  }
  const changeBtn = () => {
    setAttriName(!attriName)
  }

  return (
    <>
      {
        isLoadingAttribute || isLoading
          ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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

          <>
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-10 col-lg-8 col-sm-10 mx-auto col-12 my-3 d-flex justify-content-between" >
                    <input type="search" className="form-control" onChange={(e) => setSearchQuery(e.target.value)} placeholder='Filter Product'  style={{maxWidth:"50%"}}/>
                  <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add Attribute
                  </button>
                </div>

                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="col-10 mx-auto">
                            <h3>Attribute</h3>
                          </div>
                          <div className="col-10 mx-auto">
                            <div className="form-floating mb-3">
                              <input type="text" className="form-control" placeholder="Attribute Name" {...register("name", { required: true })} />
                              <label htmlFor="floatingInput">Attribute Name</label>
                              <p style={{ color: "red", fontSize: "14px" }}>{errors.name?.message}</p>
                            </div>
                          </div>

                          <div className="col-10 mx-auto">
                            {
                              attriName ? <>
                                <Controller
                                  name="g_name"
                                  control={control}
                                  render={({ filed }) => (
                                    <select {...filed} className="form-select py-3"  {...register("g_name", { required: true })}>
                                      <option selected={true} disabled="disabled" value="">Choose Attribute Group</option>
                                      {attribute.length !== 0 ? attribute.map((val, index) => {
                                        return (
                                          <>
                                            <option key={index} value={val}>{val}</option>
                                          </>
                                        )
                                      }) : <option selected value="" disabled style={{ color: "red" }} >No Data Found Please Set Attribute Group </option>}
                                    </select>

                                  )}
                                />
                                <p style={{ color: "red", fontSize: "14px" }}>{errors.g_name?.message}</p>


                              </> :
                                <> <div className="form-floating mt-3">
                                  <input type="text" className="form-control" placeholder="Attribute Name"  {...register("g_name", { required: true })} />
                                  <label htmlFor="floatingInput">Attribute Group</label>
                                </div>
                                  <p style={{ color: "red", fontSize: "14px" }}>{errors.g_name?.message}</p>
                                </>
                            }
                            <button type='button' className="btn btn-outline-success my-3" onClick={changeBtn}>{attriName ? "Add New Attribute Group" : "Select  Attribute Group"}</button>
                          </div>
                          <div className="d-flex  justify-content-between col-10 mx-auto">
                            <button type="submit" className="btn btn-success" disabled={loading ? loading : ""} data-bs-dismiss={errors.name || errors.g_name ? "" : "modal"}>Save</button>
                            <button type="button" className="btn btn-danger" onClick={() => reset()} data-bs-dismiss="modal">Cancel</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="   col-md-10 col-lg-8 col-sm-10 mx-auto col-12  mt-lg-0 mt-3 attribute_scroll" style={{ maxHeight: "90vh", overflow: "auto" }}>
                  <div className="row">
                    <table className="table table-hover bg-white text-center " id="table_attribute" style={{
                      borderCollapse: "collapse",
                      borderRadius: "8px",
                      overflow: "hidden"
                    }}>
                      <thead style={{ position: "sticky", top: "0px", zIndex: "120", background: "white" }}>
                        <tr>
                          <th className="py-3 col-4">Name</th>
                          <th className="py-3 col-4">Group Name</th>
                          <th className="py-3 col-4">Action</th>
                        </tr>
                      </thead>
                      <tbody >

                        {
                          attri.length !== 0
                            ?
                            attri.filter((item) => {
                              return searchQuery.toLowerCase() === "" ? item : item.Name.toLowerCase().includes(searchQuery.toLowerCase())
                            }).map((val, index) => {
                              return (
                                <>
                                  <tr>
                                    <td className="py-3 text-capitalize">{val.Name}</td>
                                    <td className="py-3 text-capitalize">{val.G_Name}</td>
                                    <td className="py-3 " style={{ color: "red" }}> {<RiDeleteBin6Line onClick={() => deleteAttribute(val.Id)} style={{ cursor: "pointer" }} />} </td>
                                  </tr>
                                </>
                              )
                            }
                            )
                            :
                            <> <tr> <td colSpan={3}>
                              <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fill-rule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No data</p></div> </td></tr></>

                        }

                      </tbody>
                    </table>
                  </div>

                </div>
              </div>
            </div>

          </>
      }

    </>
  )
};

export default Attribute;
