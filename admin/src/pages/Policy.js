import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { AddPolicy, GetPolicy, UpdatePolicy, DeletePolicy } from '../Store/PolicyAction'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup";
import "../Style/Policy.css"
import { ColorRing } from 'react-loader-spinner';
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiEdit } from "react-icons/bi"
const schema = yup.object({
    policy: yup.string().required("Policy is required"),
})
const Policy = () => {
    const dispatch = useDispatch();
    const [policy, setPolicy] = useState([])
    const [updateId, setUpdateId] = useState("")
    const [updateInput, setUpdateInput] = useState(false)
    const { register, reset, handleSubmit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(schema),
    })
    const { addPolicyLoader, addPolicyMsg, getPolicyLoader, getPolicyMsg, updatePolicyLoading, updatePolicyMsg } = useSelector((state) => state.policy)
    const onSubmit = (data) => {
        reset()
        if (updateInput) {
            const item = { "id": updateId, "policy": data.policy }
            dispatch(UpdatePolicy(item))
            setUpdateInput("null")
        }
        else {
            dispatch(AddPolicy(data))
        }
    }
    useEffect(() => {
        dispatch(GetPolicy())
    }, [addPolicyMsg, updatePolicyMsg])
    useEffect(() => {
        if (getPolicyMsg) {
            setPolicy(getPolicyMsg)
        }
    }, [getPolicyMsg])
    const toggleModal = (val) => {
        setUpdateInput(val)
    }

    const deletePolicy = (id) => {
        dispatch(DeletePolicy(id))
        const update = policy.filter((val) => val.Id !== id)
        setPolicy(update)
       
    }
    return (
        <>
            {getPolicyLoader ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
                                Add Policy
                            </button>
                        </div>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop='static' aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="col-10 mx-auto">
                                                <h3>{updateInput ? "Update" : "Add"} Policy</h3>
                                            </div>
                                            <div className="col-10 mx-auto">
                                                <div className="form-floating mb-3">
                                                    <textarea className="form-control text-capitalize" placeholder="Leave a comment here"{...register("policy", { required: true })} id="floatingTextarea2" style={{height:"100px"}}></textarea>
                                                    {/* <input type="text" className="form-control text-capitalize" placeholder="Main Category Name" {...register("policy", { required: true })} />
                                                    <label htmlFor="floatingInput">{updateInput ? "Update" : "Add"} Policy</label> */}
                                                    <p style={{ color: "red", fontSize: "14px" }}>{errors.policy?.message}</p>
                                                </div>

                                            </div>
                                            <div className="d-flex  justify-content-between col-10 mx-auto">
                                                <button type="submit" className="btn btn-success" data-bs-dismiss={errors.policy ? "" : "modal"} disabled={addPolicyLoader || updatePolicyLoading ? true : false}>{addPolicyLoader || updatePolicyLoading ? <><ColorRing
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
                                                    setUpdateInput("")
                                                }} data-bs-dismiss="modal">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="   col-md-10 col-lg-8 col-sm-10 mx-auto col-12  mt-lg-0 mt-3 "  >
                            <div className="back_policy policy_scroll">
                                <div className="row">
                                    {
                                        policy.length > 0 ? policy.map((val) => {
                                            return (
                                                <>


                                                    <div className="col-md-10 ">
                                                        <p className='policy_text mb-0'>{val.Policy_Statement}</p>
                                                    </div>

                                                    <div className='col-md-2     d-flex justify-content-end align-items-center my-2 my-md-0'>
                                                        {<span data-bs-toggle="modal" style={{ cursor: "pointer" }} data-bs-target="#exampleModal" onClick={() => setValue("policy", val.Policy_Statement)} >
                                                            <BiEdit className='me-2' style={{ color: "#6F94EF", fontSize: "20px" }} onClick={() => {
                                                                toggleModal(true)
                                                                setUpdateId(val.Id)

                                                            }} />
                                                        </span>}
                                                        <RiDeleteBin6Line onClick={() => deletePolicy(val.Id)} style={{ cursor: "pointer", color: "red", fontSize: "20px" }} />
                                                    </div>

                                                    <hr className='margin-top' />
                                                </>
                                            )
                                        }) : <div style={{ display: "flex", height: "calc(100vh - 150px)", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Policy</p></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }

        </>
    )
}

export default Policy
