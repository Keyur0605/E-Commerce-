import React, { useState, useEffect } from 'react'
import "../Style/Category.css"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"
import { AddBanner, GetBanner, DeleteBanner } from '../Store/BannerAction'
import { ColorRing } from 'react-loader-spinner';
const Banner = () => {
    const dispatch = useDispatch();
    var imageValue = []
    const [images, setImages] = useState([])
    const [isChecked, setIsChecked] = useState(false);
    const [imagesArray, setImagesArray] = useState([])
    const { bannerLoading, GetbannerLoading, GetbannerMsg, bannerMsg } = useSelector((state) => state.banner)

    useEffect(() => {
        dispatch(GetBanner())
    }, [bannerMsg])
    useEffect(() => {
        if (GetbannerMsg) {
            setImagesArray(GetbannerMsg)
        }

    }, [GetbannerMsg])
    const ImageBuffer = (e) => {
        if (e.target.files.length > 1) {
            for (let i = 0; i < e.target.files.length; i++) {
                const element = e.target.files[i];
                imageValue.push(element)
            }
            setImages(imageValue)
        }
        else {
            alert("please select 2 image")
        }
    }

    const onSubmit = () => {
        console.log(images, "image value");
        const item = new FormData()
        Array.from(images).forEach((image, index) => {
            item.append("image", image)
        })
        item.append("sale", isChecked)
        dispatch(AddBanner(item))
    }

    const deleteBanner = (id) => {
        const update = imagesArray.filter(val => val.Id !== id)
        setImagesArray(update)
        dispatch(DeleteBanner(id))
    }
    return (
        <div>
            {GetbannerLoading || bannerLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
                        <div className="col-md-10 col-lg-10 col-sm-10 mx-auto col-12 my-3 d-flex justify-content-end" >
                            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Add Banner
                            </button>
                        </div>
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <form >
                                            <div className="col-10 mx-auto">
                                                <div className="form-floating mb-3">
                                                    <div className="upload-container">
                                                        <input type="file" id="file-input" className="hidden" multiple accept="image/jpeg, image/png" onChange={ImageBuffer} />
                                                        <label for="file-input" className=" btn btn-primary">Choose File</label> *Minimum 2 image required.
                                                    </div>
                                                </div>
                                                <div className="form-check form-switch mt-3">
                                                    <label className="form-check-label" >Sale Banner</label>
                                                    <input className="form-check-input" type="checkbox" role="switch" onChange={() => setIsChecked(!isChecked)} checked={isChecked} />
                                                </div>
                                            </div>
                                            <div className="d-flex  justify-content-between col-10 mx-auto">
                                                <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => onSubmit()} disabled={bannerLoading ? true : false}>{bannerLoading ? <><ColorRing
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

                        <div className="   col-md-10 col-lg-10 col-sm-10 mx-auto col-12  mt-lg-0 mt-3 " >
                            <div className="row gy-3">
                                {
                                    imagesArray.length > 0
                                        ?
                                        imagesArray.map((val, index) => {
                                            return (
                                                <>
                                                    <div className="col-md-4 position-relative">
                                                        <div className="card  " style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
                                                            <img src={val.Image} className="card-img-top" alt="..." />
                                                            {val.Sale === true &&<div className="position-absolute  " style={{top:"20px",right:"20px",color:"white",padding:"5px 10PX",borderRadius:"5px",background:"rgb(25,140,111)"}} >
                                                                Sale
                                                            </div>}
                                                            <div className="card-body text-center">
                                                                <RiDeleteBin6Line style={{ color: "red", fontSize: "20px", cursor: "pointer" }} onClick={() => deleteBanner(val.Id)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        })
                                        :

                                        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Banner Image</p></div>

                                }
                            </div>
                        </div>

                    </div>

                </div>
            }
        </div>
    )
}

export default Banner
