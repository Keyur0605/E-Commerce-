import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"
import Multiselect from 'multiselect-react-dropdown';
import { useSelector, useDispatch } from "react-redux"
import { DeleteProduct, GetProducts, UpdateProductStatus, UpdateProductSaleStatus, AdminProductFilter } from '../Store/ProductAction'
import "../Style/Product.css"
import { ColorRing } from 'react-loader-spinner';
import { FaLessThan, FaGreaterThan } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { BiEdit } from "react-icons/bi";
import "../Style/AddProduct.css"
const ProductList = () => {
  const dispatch = useDispatch();
  const [getProduct, setGetProduct] = useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1)
  const [productStatus, setProductStatus] = useState(1)
  const [productOnSale, setProductOnSale] = useState(0)
  const [brandList, setBrandList] = useState([])
  const [filterBrand, setFilterBrand] = useState([])
  const { GetProductLoading, GetProduct, GetBrand,filterProductLoading,filterProduct } = useSelector((state) => state.product)
  useEffect(() => {
    dispatch(GetProducts(page))
  }, [page])


  useEffect(() => {
    if (GetProduct || filterProduct) {
      setGetProduct(GetProduct|| filterProduct)
    }

  }, [GetProduct,filterProduct])
  useEffect(() => {
    if ( filterProduct) {
      setGetProduct(filterProduct)
    }

  }, [filterProduct])
  useEffect(() => {
    if (GetBrand) {
      setBrandList(GetBrand)
    }

  }, [GetBrand])

  const activeBtn = (id, active) => {
    const update = getProduct.map((val) => {
      if (val.Id === id) {
        if (val.Active === true) {

          return { ...val, Active: false }
        }
        else {

          return { ...val, Active: true }
        }
      }
      return val
    })
    setGetProduct(update)
    const item = { "id": id, "active": !active }
    dispatch(UpdateProductStatus(item))
  }
  const SaleBtn = (id, active) => {
    const update = getProduct.map((val) => {
      if (val.Id === id) {
        if (val.Sale === true) {

          return { ...val, Sale: false }
        }
        else {

          return { ...val, Sale: true }
        }
      }
      return val
    })
    setGetProduct(update)
    const item = { "id": id, "sale": !active }
    dispatch(UpdateProductSaleStatus(item))
  }

  const Delete = (id) => {
    const update = getProduct.filter((val) => val.Id !== id)
    setGetProduct(update)
    dispatch(DeleteProduct(id))
  }

  const FilterProduct = () => {
    const obj={"brand":filterBrand}
    let string = ''
    if (!filterBrand.length > 0) {
      string += `?active=${productStatus}&sale=${productOnSale}`
    }
    else {
      Object.keys(obj).map(key => {
        if (string === '') {
          string += `?${key}=${obj[key].toString()}&active=${productStatus}&sale=${productOnSale}`
        }
        else {
          string += `&${key}=${obj[key].toString()}&active=${productStatus}&sale=${productOnSale}`
        }
      })
    }
    if(string.length >0 ){
      const item ={page,string}
      dispatch(AdminProductFilter(item))
    }
  }
  
  const ClearFilter =()=>{
    dispatch(GetProducts(page))
    setProductOnSale(0)
    setProductStatus(1)
    setFilterBrand([])
  }
  return (
    <div>
      {GetProductLoading || filterProductLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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

          <div className="container-fluid my-1">
            <div className="row gy-3 d-flex align-items-center mt-2">
              <div className="col-lg-3 ">
                <input type="search" className=' w-100 px-2 py-1' onChange={(e) => setSearchQuery(e.target.value)} placeholder='Filter Product By Name' />
              </div>
              <div className="col-lg-4">
                <div className='d-flex justify-content-evenly'>
                  <div>
                    <div className="form-check">
                      <input className
                      ="form-check-input" type="checkbox" value="1" onClick={() => setProductStatus(1)} id="flexCheckDefault" checked={productStatus} />
                      <label className="form-check-label" for="flexCheckDefault">
                        Active
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="0" onClick={() => setProductStatus(0)} id="flexCheckChecked" checked={productStatus !== 1} />
                      <label className="form-check-label" for="flexCheckChecked">
                        Not Active
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="1" onClick={() => setProductOnSale(1)} id="flexCheckDefault" checked={productOnSale} />
                      <label className="form-check-label" for="flexCheckDefault">
                        On Sale
                      </label>
                    </div>
                    <div className ="form-check">
                      <input className="form-check-input" type="checkbox" value="0" onClick={() => setProductOnSale(0)} id="flexCheckChecked" checked={productOnSale !== 1} />
                      <label className="form-check-label" for="flexCheckChecked">
                        Not On Sale
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <Multiselect
                  isObject={false}
                  onRemove={(event) => setFilterBrand(event)}
                  onSearch={(event) => event}
                  options={brandList}
                  selectedValues={filterBrand}
                  onSelect={(event) => setFilterBrand(event)}
                />
              </div>
              <div className="col-lg-2 d-flex justify-content-between">
                <button className='btn btn-sm btn-primary' onClick={() => FilterProduct()}>Filter</button>
                <button className='btn btn-sm btn-danger' onClick={()=>ClearFilter()}>Clear</button>
              </div>

              <div className='col-12 product_scroll product_list' >
                <div className="table-responsive">
                  <table className="table table-hover bg-white text-center" id="table_attribute" style={{
                    borderCollapse: "collapse",
                    borderRadius: "8px",
                    overflow: "hidden"
                  }}>
                    <thead >
                      <tr>

                        <th className=" py-3 fontSizeHeader">Name</th>
                        <th className=" py-3 fontSizeHeader">Image</th>
                        <th className=" py-3 fontSizeHeader">Brand </th>
                        <th className=" py-3 fontSizeHeader">Price</th>
                        <th className=" py-3 fontSizeHeader">Active</th>
                        <th className=" py-3 fontSizeHeader">On Sale</th>
                        <th className=" py-3 fontSizeHeader">Action</th>
                      </tr>
                    </thead>
                    <tbody >
                      {
                        getProduct.length !== 0 ? getProduct.filter((item) => {
                          return searchQuery.toLowerCase() === "" ? item : item.Name.toLowerCase().includes(searchQuery.toLowerCase())
                        }).map((val, index) => {
                          return (
                            <>
                              <tr >
                                <td className='text-capitalize table_name  fontSize align-middle'>{val.Name}</td>
                                <td>
                                  {
                                    val.Image.images.map((val, index) => {

                                      return (
                                        <>
                                          {index === 0 && <img src={val} alt="product" style={{ maxWidth: "50px", height: "50px" }} />}
                                        </>
                                      )
                                    })
                                  }


                                </td>
                                <td className='text-capitalize  fontSize align-middle'>{val.Brand}</td>
                                <td className='text-capitalize  fontSize align-middle'>{val.Price}</td>
                                <td className='text-capitalize align-middle '> <div className="form-check form-switch d-flex justify-content-center">

                                  <input className="form-check-input" type="checkbox" role="switch" value={val.Active} checked={val.Active} onChange={(e) => { activeBtn(val.Id, val.Active, e.target.value) }}
                                  />
                                </div></td>
                                <td className='text-capitalize align-middle '> <div className="form-check form-switch d-flex justify-content-center">

                                  <input className="form-check-input" type="checkbox" role="switch" value={val.Sale} checked={val.Sale} onChange={(e) => { SaleBtn(val.Id, val.Sale, e.target.value) }}
                                  />
                                </div></td>
                                <td className='align-middle '>
                                  {
                                    <NavLink to={`/product/${val.Id}`}><BiEdit className='me-2' style={{ color: "#6F94EF", fontSize: "18px", cursor: "pointer" }} /></NavLink>} {<RiDeleteBin6Line style={{ cursor: "pointer", color: "red", fontSize: "18px" }} onClick={() => Delete(val.Id)} />}
                                </td>
                              </tr>
                            </>
                          )

                        }) : <> <tr> <td colSpan={7}>
                          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No data</p></div> </td></tr></>
                      }
                    </tbody>
                  </table>
                </div>
              </div>

              {getProduct.length > 0 &&
                <div className="col-12 mt-3 d-flex justify-content-end">
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='pagination_arrow' onClick={() => {
                      if (page > 1) {
                        setPage(page - 1)
                      }
                    }}>
                      <FaLessThan />
                    </div>
                    <span className="mx-2 align-items-center" style={{ fontWeight: "bold", fontSize: "18px" }}>{page}</span>
                    <button disabled={getProduct.length < 15} onClick={() => {
                      setPage(page + 1)
                    }} className='pagination_arrow'>
                      <FaGreaterThan />
                    </button>

                  </div>
                </div>}
            </div>


          </div>
        </>}
    </div>
  )
}

export default ProductList
