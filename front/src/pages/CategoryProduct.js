import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetProduct, GetCategory, FilterProduct } from '../Store/ProductAction'
import { GetAttrbute } from '../Store/AttributeAction'
import { ColorRing } from 'react-loader-spinner'
import "../style/Product.css"
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { AddWishList, DeleteWishList } from '../Store/WishlistAction'
import { AddToCart } from "../Store/CartAction"
import "react-multi-carousel/lib/styles.css";
import { FiHeart } from "react-icons/fi"
import { FaHeart, FaLessThan, FaGreaterThan } from "react-icons/fa6"
import Slider from "react-slick";
import Swal from 'sweetalert2';
import ReactSlider from 'react-slider'
import "../style/SliderPrice.css"
const CategoryProduct = () => {
    var settings = {
        dots: false,
        arrows: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 3000,
        autoplaySpeed: 3000,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,

                }
            },
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    infinite: true
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },

        ]
    };

    const navigate = useNavigate()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const pid = queryParams.get('pid');
    const sid = queryParams.get('sid');
    const dispatch = useDispatch();
    const [attributeObject, setAttributeObject] = useState([])
    const [search, setSearch] = useState("")
    const [product, setProduct] = useState([])
    // const [attribute, setAttribute] = useState([])
    // const [filter, setFilter] = useState([])
    // const [loader, setLoader] = useState(true)
    const [subCate, setSubCate] = useState([])
    const [page, setPage] = useState(1)
    const [filterProduct, setFilterProduct] = useState([])
    const [values, setValues] = useState([200, 10000])
    const handleChange = (newValues) => setValues(newValues);
    const { getProductLoading, getProductMsg, getCategoryMsg, getCategoryLoading, getFilterProductLoading, getFilterProduct, getAttribute } = useSelector((state) => state.product)
    // const { getAttributeLoading, getAttributeMsg } = useSelector((state) => state.attribute)

    useEffect(() => {
        if (queryParams.get('pid')) {
            const data = { "id": pid, page, "token": localStorage.getItem("userToken") ? localStorage.getItem("userToken") : "nToken" }
            dispatch(GetProduct(data))
        }
        else {
            const data = { "id": sid, page, "token": localStorage.getItem("userToken") ? localStorage.getItem("userToken") : "nToken" }
            dispatch(GetProduct(data))
        }
        dispatch(GetCategory(pid))
        // dispatch(GetAttrbute())

    }, [page, pid, sid])

    useEffect(() => {
        if (getProductMsg) {
            setProduct(getProductMsg)
        }
    }, [getProductMsg])

    useEffect(() => {
        if (getAttribute) {
            setAttributeObject(getAttribute)
        }
    }, [getAttribute])

    
    // useEffect(() => {

    //     if (getAttributeMsg) {
    //         let a = [...new Set(getAttributeMsg.map((val) => {
    //             return val.G_Name
    //         }))]
    //         setAttribute(a)
    //     }

    // }, [getAttributeMsg])
    // useEffect(() => {
    //     if (attribute.length > 0) {
    //         var attriName = []
    //         attribute.map(async (item) => {
    //             try {
    //                 const config = {
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Authorization': `${JSON.parse(localStorage.getItem("userToken"))}`
    //                     },
    //                 }
    //                 const result = await axios.get(`${process.env.REACT_APP_PORT}/attribute/list/${item}`, config)
    //                 let obj = {}
    //                 obj[item] = result.data
    //                 attriName.push(obj)
    //                 if (attriName.length === attribute.length) {
    //                     setFilter(attriName)
    //                     setLoader(false)
    //                 }
    //             }
    //             catch (error) {
    //                 console.log(error, "errror");
    //             }
    //         })
    //     }
    // }, [attribute])

    useEffect(() => {
        if (getCategoryMsg) {
            setSubCate(getCategoryMsg)
        }
    }, [getCategoryMsg])

    useEffect(() => {
        if (getFilterProduct) {
            setProduct(getFilterProduct)
        }
    }, [getFilterProduct])

    const wishBtn = (id) => {
        if (localStorage.getItem("Ecom_user")) {
            const update = product.map((val, index) => {
                if (val.Id === id) {
                    if (val.Wishlist_Status === 0 || val.Wishlist_Status === false) {
                        const data = { "pId": id }
                        dispatch(AddWishList(data))

                        return { ...val, Wishlist_Status: 1 };
                    }
                    else {
                        dispatch(DeleteWishList(id))
                        return { ...val, Wishlist_Status: 0 };
                    }
                }
                return val
            })
            setProduct(update)
        }
        else {

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

    }

    const FilterProducts = (item, data) => {
        let obj = {
            item: item,
            value: data
        }
        setFilterProduct((prev) => [...prev, obj])
        for (let i = 0; i < filterProduct.length; i++) {
            const element = filterProduct[i];
            if (element.value === data) {
                const update = filterProduct.filter((val) => val.value !== data)
                setFilterProduct(update)
            }

        }


    }

    const ApplyFilter = (data) => {
        const temArray = data.reduce(function (rv, x) {
            (rv[x.item] = rv[x.item] || []).push(x.value);
            return rv;
        }, {});
        let string = ''
        
            if( Object.keys(temArray).length >0){
            Object.keys(temArray).map(key => {
                if (string === '') {
                    string += `?${key}=${temArray[key].toString()}&Min=${values[0]}&Max=${values[1]}`
    
                }
                else {
                    string += `&${key}=${temArray[key].toString()}`
                }
            })
            }
            else{
                string += `?Min=${values[0]}&Max=${values[1]}`
            }
        
        
        if (queryParams.get('pid')) {
            const filters = { "id": pid, page, string }
            dispatch(FilterProduct(filters))
        }
        else {
            const filters = { "id": sid, page, string }
            dispatch(FilterProduct(filters))
        }


        console.log(string, "string");
    }

    const clearFilter = () => {
        setFilterProduct([])

        if (queryParams.get('pid')) {
            const data = { "id": pid, page, "token": localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null }
            dispatch(GetProduct(data))
        }
        else {
            const data = { "id": sid, page, "token": localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null }
            dispatch(GetProduct(data))
        }
        setValues([200, 10000])
    }

    const allProduct=()=>{
        if (queryParams.get('pid')) {
            const data = { "id": pid, page, "token": localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null }
            dispatch(GetProduct(data))
        }
        else {
            const data = { "id": sid, page, "token": localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null }
            dispatch(GetProduct(data))
        }
    }
    
   
    return (
        <>

            {
                getProductLoading   || getCategoryLoading || getFilterProductLoading
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
                    :
                    <>
                        <div className='mb-5'>
                            {product.length > 0 &&
                                queryParams.get('pid') && <div className="container mt-5 ">
                                    <Slider {...settings}>
                                        {
                                            subCate.length > 0 ? subCate.map((val, index) => {
                                                return (
                                                    val.SubCategory.map((sub, index) => {
                                                        return (
                                                            <>
                                                                <div className="card_subCategory" key={index} >
                                                                    <div style={{ cursor: "pointer" }} className="card" onClick={() => {
                                                                        const data = { "id": sub.Id, page, "token": localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null }
                                                                        dispatch(GetProduct(data))
                                                                    }}>
                                                                        <div style={{ height: "100px", width: "150px" }} className='pt-3'>
                                                                            <img src={sub.Image} class="card-img-top" alt="Product" style={{ height: "100px", width: "100%", objectFit: "contain" }} />
                                                                        </div>
                                                                        <div className="card-body p-0 ">
                                                                            <p className="text-center mb-0 mt-3">{sub.Name}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    })
                                                )
                                            }) : ""
                                        }
                                    </Slider>
                                </div>}

                            <div className="container mt-4">
                                <div className="row">
                                    {product.length > 0 ? <div className="col-lg-3 px-3">
                                        <div style={{ background: "white", overflow: "auto", borderRadius: "10px", padding: "20px" }}   >
                                            
                                            {Object.keys(attributeObject).length > 0 ?
                                                <><ReactSlider
                                                    className="slider_range"
                                                    value={values}
                                                    onChange={handleChange}
                                                    min={200}
                                                    max={10000}
                                                />
                                                    <div style={{ display: 'flex', justifyContent: 'space-between' }} className='mt-3 text-center mb-4'>
                                                        <div>
                                                            <label htmlFor="minPrice" className='me-lg-0 me-2'>Min Price:</label>
                                                            <input
                                                                type="number"
                                                                id="minPrice"
                                                                style={{ maxWidth: "80px", outline: "none", border: "none" }}
                                                                value={values[0]}
                                                                onChange={(e) => handleChange([+e.target.value, values[1]])}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label htmlFor="maxPrice" className='me-lg-0 me-2'>Max Price:</label>
                                                            <input
                                                                type="number"
                                                                style={{ maxWidth: "80px", outline: "none", border: "none" }}
                                                                id="maxPrice"
                                                                value={values[1]}
                                                                onChange={(e) => handleChange([values[0], +e.target.value])}
                                                            />
                                                        </div>
                                                    </div>
                                                    {Object.keys(attributeObject).map((item, index) => {
                                                        return (
                                                            <>
                                                                <p className='filter_title' >{item}</p>
                                                                <div className="row">
                                                                    {
                                                                        attributeObject[item].map((val, index) => {
                                                                            return (
                                                                                <>

                                                                                    <div className='col-lg-6  col-md-4 col-sm-4 col-6'>
                                                                                        <input type="checkbox" className='me-2' onChange={(e) => FilterProducts(item, e.target.value)} value={val} style={{ cursor: "pointer" }} />
                                                                                        <span>{val}</span>
                                                                                    </div>
                                                                                </>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                                <hr />
                                                            </>
                                                        )
                                                    })}
                                                </>
                                                : ""
                                            }
                                            <div className='d-flex justify-content-between'>
                                                <button className='btn btn-outline-primary mt-3 mx-auto d-block' onClick={() => ApplyFilter(filterProduct)}>Apply</button>
                                                <button className='btn btn-outline-danger mt-3 mx-auto d-block' onClick={clearFilter}>Clear Filter</button>
                                            </div>
                                        </div>
                                    </div> : ""}

                                    <div className={product.length ? "col-lg-9 product_scroll mt-lg-0 mt-4" : "col-lg-12 product_scroll mt-lg-0 mt-4"} >
                                        <div className="row   gy-4">
                                            {product.length > 0 && <div className='col-12 '>
                                                <div className="col-12">
                                                    <input type="search" className="form-control" onChange={(e) => setSearch(e.target.value)} placeholder='Search Product Here' style={{ maxWidth: "100%", padding: "10px 6px" }} />
                                                </div>
                                            </div>}
                                            {
                                                product.length > 0 ? product.filter((item) => {
                                                    return search.toLowerCase() === "" ? item : item.Name.toLowerCase().includes(search.toLowerCase())
                                                }).map((val, index) => {

                                                    return (
                                                        <>
                                                            <div className="col-lg-4 col-md-6 col-sm-6 position-relative">
                                                                <div className="card p-3" >
                                                                    <NavLink to={`/singleproduct/${val.Id}`}>
                                                                        {val.Image.images.slice(0, 1).map((image) => {
                                                                            return (
                                                                                <div style={{ height: "200px", width: "100%" }}>
                                                                                    <img src={image} className="card-img-top img-fluid" alt="Product" style={{ height: "200px", width: "100%", objectFit: "contain" }} />
                                                                                </div>
                                                                            )
                                                                        })}

                                                                        <div className="card-body px-1  pb-0 text-center">
                                                                            <p className="product_name">{val.Name}</p>
                                                                            <p className="product_brand mb-0">{val.Brand}</p>
                                                                            <p className="product_price d-inline ">₹{val.Price}</p> <span style={{ color: "rgb(139, 139, 163)", fontSize: "13px" }}>MRP: <del>{val.S_Price}</del></span>
                                                                            <p style={{ color: "#000", fontWeight: "400", fontSize: "13px" }}>FREE Delivery in Surat</p>
                                                                        </div>

                                                                    </NavLink>
                                                                    <div className=' wishlist_div' onClick={() => wishBtn(val.Id)}>
                                                                        <div> {val.Wishlist_Status ? <FaHeart style={{ color: "red", fontSize: "20px" }} /> : <FiHeart style={{ fontSize: "20px" }} />}</div>
                                                                    </div>
                                                                    {val.Sale ? <div className=' wishlist_div2 position-absolute' >
                                                                        <div className='btn btn-info'>Sale</div>
                                                                    </div> : ""}
                                                                </div>
                                                            </div>

                                                        </>
                                                    )
                                                }) : <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", height: "90vh" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Product Available</p>  <button className='btn btn-primary' onClick={()=>allProduct()}>All Product</button></div>
                                            }
                                            {product.length !== 0 &&
                                                <div className="col-12 d-flex justify-content-end">
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <button className='pagination_arrow'>
                                                            <FaLessThan onClick={() => {
                                                                if (page > 1) {
                                                                    setPage(page - 1)
                                                                }
                                                            }} />
                                                        </button>

                                                        <span className="mx-2 align-items-center" style={{ fontWeight: "bold", fontSize: "18px" }}>{page}</span>
                                                        <button className='pagination_arrow' disabled={product.length < 15}>
                                                            <FaGreaterThan onClick={() => {
                                                                setPage(page + 1)
                                                            }} />
                                                        </button>
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }

        </>
    )
}

export default CategoryProduct
