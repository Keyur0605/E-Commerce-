import React, { useState, useEffect } from 'react'
import "../Style/Category.css"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import { ColorRing } from 'react-loader-spinner';
import { AddLogo, GetLogo, DeleteLogo } from '../Store/LogoAction';
const Logo = () => {
    const dispatch = useDispatch();
    const { addLogoLoading, addLogoMsg, getLogoLoading, getLogoMsg, DeleteLogoMsg } = useSelector((state) => state.logo)
    const [image, setImage] = useState("")
    const [getLogo, setGetLogo] = useState([])
    const ImageBuffer = (e) => {
        const render = new FileReader()
        render.readAsDataURL(e.target.files[0]);
        render.onload = () => {
            setImage(render.result)
        };
        render.onerror = (error) => {
            console.log(error);
        }
    }
    const deleteLogo = () => {
        setImage([])
        setGetLogo([])
        dispatch(DeleteLogo())
    }

    useEffect(() => {
        dispatch(GetLogo())
    }, [DeleteLogoMsg, addLogoMsg])
    const onSubmit = () => {
        const item = { "logo": image }
        dispatch(AddLogo(item))
    }
    useEffect(() => {
        if (getLogoMsg) {
            setGetLogo(getLogoMsg)
        }
    }, [getLogoMsg])
    return (
        <div>
            {getLogoLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
                <div className="container-fluid mt-5 " >
                    <div className="row">
                        {Object.keys(getLogo).length > 0 ? "" : <div className="col-md-10 col-lg-10 col-sm-10 mx-auto col-12 my-3 d-flex justify-content-end" >
                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Logo
                            </button>
                        </div>}
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <form >
                                            <div className="col-10 mx-auto">
                                                <div className="form-floating mb-3">
                                                    <div className="upload-container">
                                                        <input type="file" id="file-input" className="hidden" onChange={ImageBuffer} />
                                                        <label for="file-input" className=" btn btn-primary">Choose Logo</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <img src={image} alt="logos" width={300} height={100} />
                                            <div className="d-flex  justify-content-between col-10 mx-auto">
                                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => onSubmit()} disabled={addLogoLoading ? true : false}>{addLogoLoading ? <><ColorRing
                                                    visible={true}
                                                    height="30"
                                                    width="30"
                                                    ariaLabel="blocks-loading"
                                                    wrapperStyle={{}}
                                                    wrapperClass="blocks-wrapper"
                                                    colors={['#198754']}
                                                />Loading</> : "Add"}</button>
                                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="   col-md-10 col-lg-10 col-sm-10 mx-auto col-12  mt-lg-0 mt-3  " >
                            <div className="row gy-3">
                                <div className="col-md-4 mx-auto">
                                    {
                                        Object.keys(getLogo).length > 0 ?

                                            <div className="card" >
                                                <img src={getLogo.Logo} className="card-img-top" alt="..." />
                                                <div className="card-body d-flex justify-content-center">
                                                    <RiDeleteBin6Line onClick={() => deleteLogo()} style={{ fontSize: "22px", color: "red", fontWeight: "700", cursor: "pointer" }} />
                                                </div>
                                            </div>
                                            : <div className="card p-4" >
                                                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Logo</p></div>

                                            </div>

                                    }

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            }
        </div>
    )
}

export default Logo
