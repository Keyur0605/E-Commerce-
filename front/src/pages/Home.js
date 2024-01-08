
import React, { useEffect, useState } from 'react'
import "../style/Home.css"
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux';
import { GetBanner, GetMainCate } from '../Store/BannerAction';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ColorRing } from 'react-loader-spinner';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  var product = []
  const [heroBanner, setHeroBanner] = useState([])
  const [saleBanner, setSaleBanner] = useState([])
  const [mainCate, setMainCate] = useState([])
  const [productData, setProductData] = useState([])
  const { getBannerLoading, getBannerMsg, getMainCateLoading, getMainCate } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(GetBanner())
    dispatch(GetMainCate())
  }, [])

  useEffect(() => {

    if (getBannerMsg) {
      var hero = []
      var sale = []
      for (let i = 0; i < getBannerMsg.length; i++) {
        const element = getBannerMsg[i];

        if (element.Sale === true) {
          sale.push(element)
        }
        else {
          hero.push(element)
        }
      }
      setHeroBanner(hero)
      setSaleBanner(sale)
    }

  }, [getBannerMsg])
  useEffect(() => {
    if (getMainCate) {
      setMainCate(getMainCate)
      getMainCate.map(async (item, index) => {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${localStorage.getItem("userToken") ? JSON.parse(localStorage.getItem("userToken")) : "nToken"}`
            },
          }
          const result = await axios.get(`${process.env.REACT_APP_PORT}/product/list/${item.Id}/1`, config)
          let obj = {}
          obj[item.Name] = result.data.listToSend
          product.push(obj)
          if (product.length === getMainCate.length) {
            setProductData(product)
          }
        }
        catch (error) {
          console.log(error, "errror");
        }
      })
    }

  }, [getMainCate])

  return (
    <>
      {/* <Header/> */}
      {
        getBannerLoading || getMainCateLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
          <div className='mt-4 '>
           {heroBanner.length > 0 && <Carousel className='m-0' autoPlay={true} interval={3000} transitionTime={3} showArrows={false} showIndicators={true} showStatus={false} emulateTouch={true} showThumbs={false} infiniteLoop={true}>
              {heroBanner.length > 0 &&
                heroBanner.map((val, index) => {
                  return (
                    <>
                      <div className="container">
                        <div className="row">
                          <img src={val.Image} alt="hero banne" />
                        </div>
                      </div>
                    </>
                  )
                }) 
              }
            </Carousel>}
            <div className="container my-3">
              <div className="row justify-content-center">

                {
                  mainCate.length > 0 ? mainCate.map((val, index) => {
                    return (
                      <>
                        <div className="col-lg-2 col-md-3 col-6 d-flex justify-content-center" style={{ cursor: "pointer" }}>
                          <NavLink to={`/product?pid=${val.Id}`}>
                            <div className="Category">
                              <img src={val.Image} alt="category" />
                              <p className='mb-0 mt-2 text-center text-capitalize' style={{ fontWeight: "bold", color: "black" }}>{val.Name}</p>

                            </div>
                          </NavLink>
                        </div>
                      </>
                    )
                  }) : <div className='text-center'>Please Set Category </div>
                }


              </div>
            </div>
            {saleBanner.length > 0 &&<Carousel className='m-0' autoPlay={true} interval={3000} transitionTime={3} showArrows={false} showIndicators={true} showStatus={false} showThumbs={false} infiniteLoop={true}>
              {saleBanner.length > 0 &&
                saleBanner.map((val, index) => {
                  return (
                    <>
                      <div className="container">
                        <div className="row">
                          <img src={val.Image} alt="hero banne" />
                        </div>
                      </div>
                    </>
                  )
                }) 
              }
            </Carousel>}
            <div className="container mb-4">
              {
                productData.length > 0 ? productData.map((item, index) => {
                  return (
                    Object.keys(item).map((key, index) => {
                      return (
                        <>
                          <div className="row gy-3 d-flex justify-content-center" >
                          <h4 className=' pt-1 mt-5 mb-0' style={{fontSize:"20px",fontWeight:"700"}}>{key} </h4>
                            {
                              item[key].slice(0,4).map((val) => {
                                return (
                                  <>
                                      <div className="col-lg-3 col-md-4  col-sm-6 ">
                                                                <div className="card p-3" >
                                                                    <NavLink to={`/singleproduct/${val.Id}`}>
                                                                        {val.Image.images.slice(0,1).map((image) => {
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
                                                                            
                                                                        </div>

                                                                    </NavLink>
                                                                    <div className=' new_arrival position-absolute' >
                                                                        <div >New Arrival</div>
                                                                    </div>
                                                                    {val.Sale ? <div className=' wishlist_div2 position-absolute' >
                                                                        <div className='btn btn-info'>Sale</div>
                                                                    </div> : ""}
                                                                </div>
                                                            </div>
                                  </>
                                )
                              })
                            }
                          
                            </div>
                        </>
                      )
                    })
                  )
                }) : ""
              }
            </div>
          </div>

      }



    </>
  )
}

export default Home