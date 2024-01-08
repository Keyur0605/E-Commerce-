import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { GetWishList, DeleteWishList } from '../Store/WishlistAction';
import { ColorRing } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri"
const Wishlist = () => {
    const dispatch = useDispatch();
    const [wishList, setWishList] = useState([])
    const { getWishlistLoading, getWishListMsg } = useSelector((state) => state.wish)
    useEffect(() => {
        dispatch(GetWishList())
    }, [])
    useEffect(() => {
        if (getWishListMsg) {
            setWishList(getWishListMsg)
        }
    }, [getWishListMsg])
    const wishlistRemove = (id) => {
        dispatch(DeleteWishList(id))
        const update = wishList.filter((val) => val.Id !== id)
        setWishList(update)
    }
   
    return (
        <>
            {
                getWishlistLoading
                    ?
                    <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
                    : <div className="container mt-5" style={{height:"69.6vh"}}>
                        <div className="row gy-3">
                            {
                                wishList.length > 0 ? wishList.map((val, index) => {
                                    return (
                                        <>
                                            <div className="col-xl-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center position-relative" key={index}>
                                                <div className="card p-3 w-100" >
                                                <NavLink to={val.Id && `/singleproduct/${val.Id}`}>
                                                    {val.Image.images.slice(0, 1).map((image) => {
                                                        return (
                                                            <div style={{ height: "200px", width: "100%" }}>
                                                                <img src={image} class="card-img-top img-fluid" alt="Product" style={{ height: "200px", width: "100%", objectFit: "contain" }} />
                                                            </div>
                                                        )
                                                    })}
                                                    <div className="card-body px-1  pb-0 text-center">
                                                        <p className="product_name">{val.Name}</p>
                                                        <p className="product_brand mb-0">{val.Brand}</p>
                                                        <p className="product_price d-inline ">₹{val.Price}</p> <span style={{ color: "rgb(139, 139, 163)", fontSize: "13px" }}>MRP: <del>{val.Price + 200}</del></span>
                                                        
                                                    </div>
                                                    </NavLink>
                                                    <div className='text-center my-2'>
                                                            <button className='btn btn-primary'>Add to Cart</button>
                                                        </div>
                                                <div className=' wishlist_div' onClick={() => wishlistRemove(val.Id)}>
                                                    <RiDeleteBin6Line style={{ cursor: "pointer", color: "red", fontSize: "20px" }} />
                                                </div>
                                                </div>
                                                
                                            </div>
                                        </>
                                    )
                                }) : <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "90vh" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Product Available</p>
                                    <NavLink to="/">  <button className='btn btn-primary'>Shop Now</button> </NavLink>
                                </div>
                            }
                        </div>
                    </div>

            }
        </>
    )
}

export default Wishlist
