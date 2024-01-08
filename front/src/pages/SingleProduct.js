import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { GetSingleProduct } from '../Store/ProductAction';
import { useParams, NavLink } from 'react-router-dom'
import { FiHeart } from "react-icons/fi"
import { ColorRing } from 'react-loader-spinner';
import { FaTruckFast, FaHeart } from "react-icons/fa6"
import { BsFillHandbagFill } from "react-icons/bs";
import { MdHighQuality } from "react-icons/md"
import { TbReplace } from "react-icons/tb";
import { GiClothes } from "react-icons/gi"
import { AiOutlinePlus } from "react-icons/ai"
import { GrFormSubtract } from "react-icons/gr"
import { AddToCart } from '../Store/CartAction';
import Swal from 'sweetalert2'
import { AddWishList, DeleteWishList } from '../Store/WishlistAction';
import { useNavigate } from 'react-router-dom';
const SingleProduct = () => {
    const navigate = useNavigate()
    const [quantityValue, setQuantityValue] = useState(1)
    const [sizequantity, setSizeQuantity] = useState("")
    const [show, setShow] = useState(false)
    const [sizeError, setSizeError] = useState(false)
    const { id } = useParams()
    const [singleProduct, setSingleProduct] = useState([])
    const [image, setImage] = useState(0)
    const { getSingleProductPLoading, getSingleProductMsg } = useSelector((state) => state.product)
    const { cartAddLoading, } = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetSingleProduct(id))
    }, [])
    useEffect(() => {
        if (getSingleProductMsg) {
            setSingleProduct(getSingleProductMsg)
        }
    }, [getSingleProductMsg])
    const addtocart = () => {
        if (!localStorage.getItem("Ecom_user")) {
            Swal.fire({
                title: 'You are not Login',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: ' btn-success',
                cancelButtonColor: 'btn btn-danger',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            })

        }
        else {
            if (sizequantity !== "") {
                const sizeQuantity = {}
                sizeQuantity[sizequantity] = 1
                const item = { "id": singleProduct.Id, sizeQuantity }
                dispatch(AddToCart(item))
                setSizeQuantity("")
                setShow(false)
            }
            else {
                setSizeError(true)
            }

        }
    }
    const wishBtn = (id) => {
        if (!localStorage.getItem("Ecom_user")) {
            Swal.fire({
                title: 'You are not Login',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: ' btn-success',
                cancelButtonColor: 'btn btn-danger',
                confirmButtonText: 'Login'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            })

        }
        else if (singleProduct.Wishlist_Status === 0 || singleProduct.Wishlist_Status === false) {

            const data = { "pId": id }
            dispatch(AddWishList(data))
            setSingleProduct({ ...singleProduct, Wishlist_Status: !singleProduct.Wishlist_Status, })
        }
        else {
            setSingleProduct({ ...singleProduct, Wishlist_Status: !singleProduct.Wishlist_Status, })
            dispatch(DeleteWishList(id))
        }
    }
    const AddSizeQuantity = (size, quantity) => {
        setSizeQuantity(size)
        setShow(true)
        setSizeError(false)
    }
    return (
        <>
            {
                getSingleProductPLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
                    <div className="container" >

                        <div className="row " style={{ padding: "40px 20px" }}>
                            {
                                Object.keys(singleProduct).length > 0
                                    ?
                                    <>
                                        <div className="col-lg-6 d-block m-auto">
                                            <div className="row gy-4  justify-content-center flex-column-reverse ">
                                                <div className='col-12 d-flex flex-wrap'>
                                                    {
                                                        singleProduct.Image.images.map((val, index) => {
                                                            return (
                                                                <>
                                                                    <div className=" me-lg-0 mx-2 mt-3 " style={{ cursor: "pointer" }} onClick={() => setImage(index)}>
                                                                        <img src={val} alt={val} style={{ maxWidth: "100px", height: "auto", maxHeight: "100px" }} />
                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <div className="col-12 d-flex align-items-center  mt-5 mt-lg-0 justify-content-center" >
                                                    <div >
                                                        <img src={singleProduct.Image.images[image]} alt="product" className='product_image' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                        <div className="col-lg-6 mt-4 mt-lg-0">
                                            <div className="brand">
                                                <h3 style={{ fontWeight: "bold", color: "black" }}>{singleProduct.Brand} </h3>
                                            </div>
                                            <h5 >{singleProduct.Name}</h5>
                                            <div className='d-flex align-items-center'>
                                                <span className="me-2" style={{ fontWeight: "bold", color: "rgba(29,29,29,0.8)", fontSize: "13px" }}>MRP: <del>{singleProduct.S_Price}</del></span>
                                                <p style={{ color: "black", fontWeight: "bold", fontSize: "17px", marginRight: "10px" }} className='mb-0'>Deal Of The Day : ₹ {singleProduct.Price}</p>

                                            </div>
                                            <hr />
                                            <div className="d-flex flex-wrap gy-2">
                                                {Object.keys(singleProduct).length > 0 ?
                                                    Object.entries(singleProduct.Size_Quantity
                                                    ).map(([size, quantity]) => (

                                                        <div className="icon_div mx-2">
                                                            <button className={sizequantity === size ? "mb-0 text-center size_icon btn-info" : "mb-0 text-center size_icon"} onClick={() => AddSizeQuantity(size, quantity)} disabled={quantity <= 0}> {quantity <= 0 ? <del>{size.split(" ")[0]}</del> : size.split(" ")[0]} </button>
                                                            {quantity >= 1 && quantity <= 5 ? <div class="alert alert-danger mt-2" role="alert" style={{
                                                                fontSize: "12px", padding: "4px", textAlign: "center",
                                                                fontWeight: "bold"
                                                            }} >{quantity} left</div> : ""}
                                                        </div>


                                                    ))

                                                    : ""}

                                                

                                            </div>
                                            {show && <div className="alert alert-success mt-3" role="alert" style={{
                                                fontSize: "17px",padding:"7px", textAlign: "center",
                                            }} >
                                                You have Selected  Size: <span style={{ fontWeight: "bold" }}>{sizequantity}</span>
                                            </div>}
                                            <hr />
                                            <div className="product_discription">
                                                <p style={{ fontSize: "15px", fontWeight: "bold" }}>PRODUCT DETAILS </p>
                                                <div>
                                                    {singleProduct.Description}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='d-flex justify-content-evenly'>
                                                <div className="icon_div ">
                                                    <p className='mb-0 text-center icon'> <FaTruckFast style={{ fontSize: "20px" }} /> </p>
                                                    <span> Fast Delivery </span>
                                                </div>
                                                <div className="icon_div">
                                                    <p className='mb-0 text-center icon'> <TbReplace style={{ fontSize: "20px" }} /> </p>
                                                    <span> 7 day return & exchange </span>
                                                </div>
                                                <div className="icon_div">
                                                    <p className='mb-0 text-center icon'> <MdHighQuality style={{ fontSize: "20px" }} /> </p>
                                                    <span> High Quality Clothes </span>
                                                </div>
                                                <div className="icon_div">
                                                    <p className='mb-0 text-center icon'> <GiClothes style={{ fontSize: "20px" }} /> </p>
                                                    <span> Branded Clothes </span>
                                                </div>
                                            </div>
                                            <hr />
                                            {Object.keys(singleProduct).length > 0 ?
                                                Object.entries(singleProduct.Attributes).map(([attri, key]) => {
                                                    if (attri !== "Size") {
                                                        return (
                                                            <div className=" d-flex">
                                                                <p className='me-2' style={{ fontWeight: "bold" }} > {attri}: </p> {attri === "Color" ? <span className='mt-1' style={{ background: `${key}`, width: "20px", height: "20px", borderRadius: "50%" }}></span> : <span>{key}</span>}
                                                            </div>
                                                        )
                                                    }
                                                })
                                                : ""}
                                            <hr />
                                            {sizeError && <div class="alert alert-danger" role="alert" style={{
                                                fontSize: "17px",padding:"7px", textAlign: "center",
                                            }}>
                                                Please Choose Size
                                            </div>}
                                            <div className="button mt-4 d-flex justify-content-between">
                                                <div className="add_to_cart" >
                                                    <button className='btn btn-info px-4 py-3' onClick={() => addtocart()} disabled={cartAddLoading}>{cartAddLoading ? <><ColorRing
                                                        visible={true}
                                                        height="30"
                                                        width="30"
                                                        ariaLabel="blocks-loading"
                                                        wrapperStyle={{}}
                                                        wrapperClass="blocks-wrapper"
                                                        colors={['#198754']}
                                                    />Loading</> : <><BsFillHandbagFill className='me-2' />Add To Cart</>}</button>
                                                </div>
                                                <div className='d-flex justify-content-center align-items-center' onClick={() => wishBtn(singleProduct.Id)} >

                                                    {singleProduct.Wishlist_Status ? <FaHeart style={{ color: "red", fontSize: "25px", cursor: "pointer" }} /> : <FiHeart style={{ fontSize: "25px", cursor: "pointer" }} />}
                                                </div>
                                            </div>

                                        </div>  </> : <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "90vh" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Product Available</p> <NavLink to="/"> <button className='btn btn-primary'>All Product</button></NavLink></div>
                            }
                        </div>
                    </div>


            }
        </>
    )
}

export default SingleProduct
