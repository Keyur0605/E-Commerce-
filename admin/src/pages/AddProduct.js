import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { AiOutlineArrowDown } from "react-icons/ai"
import { useSelector, useDispatch } from "react-redux"
import { AddProducts } from "../Store/ProductAction";
import { GetMainCate, GetCateId, GetSubCateId } from '../Store/CategoryAction';
import { GetAttributeGroup } from "../Store/AttributeAction"
import { ColorRing } from 'react-loader-spinner';
import "../Style/AddProduct.css"
import { RiDeleteBin6Line } from "react-icons/ri"
import axios from "axios";
import { toast } from 'react-toastify';

const schema = yup.object({
  name: yup.string().required("Product Name is Required"),
  mId: yup.string().required("Main Category is Required"),
  cId: yup.string().required(" Category is Required"),
  sId: yup.string().required("Sub Category is Required"),
  price: yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required("Please Enter Product Price")
    .moreThan(-1, "Negative values not accepted"),
  Brand: yup.string().required("Attribute is Required"),
  Color: yup.string().required("Attribute is Required"),
  Material: yup.string().required("Attribute is Required"),
  description: yup.string().required(" Product Description is Required"),
  sPrice: yup.number()
    .typeError("Please enter number value only")
    .nullable()
    .required("Please Enter Product Price")
    .moreThan(-1, "Negative values not accepted")

})
const AddProduct = () => {
  const dispatch = useDispatch();
  var attriName = []
  var sizeArrays = []
  const [imageSize, setImageSize] = useState("")
  const [loader, setLoader] = useState(true)
  const [mainId, setMainId] = useState('')
  const [attributeName, setAttributeName] = useState([])
  const [attribute, setAttribute] = useState([])
  const [isChecked, setIsChecked] = useState(true);
  const [images, setImages] = useState([]);
  const [imageDataList, setImageDataList] = useState([]);
  const { getMainCate, getLoading } = useSelector((state) => state.main_category)
  const { getIdCate, getCateIdLoading } = useSelector((state) => state.category)
  const { getSubIdCate, getSubCateIdLoading } = useSelector((state) => state.sub_category)
  const { attributeGroup, isLoadingAttribute, } = useSelector((state) => state.attribute)
  const { AddProductLoading } = useSelector((state) => state.product)
  const [close, setClose] = useState(false)
  const [sizeArray, setSizeArray] = useState([])
  const [sizeQuantity, setSizeQuantity] = useState([])
  const [sizeQuantityArray, setSizeQuantityArray] = useState([])
  const [sale,setSale]=useState(false)
  const { register, reset, handleSubmit, formState: { errors }, clearErrors } = useForm({
    resolver: yupResolver(schema),
  })


  useEffect(() => {
    dispatch(GetMainCate())
    dispatch(GetAttributeGroup())

  }, [])

  useEffect(() => {
    if (attributeGroup) {
      let a = [...new Set(attributeGroup.map((val) => {
        return val.G_Name
      }))]
      setAttributeName(a)
    }

    attributeName.map(async (item, index) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
          },
        }
        const result = await axios.get(`${process.env.REACT_APP_PORT}/attribute/list/${item}`, config)
        let obj = {}
        obj[item] = result.data
        attriName.push(obj)
        if (attriName.length === attributeName.length) {
          setAttribute(attriName)
          setLoader(false)
        }
      }
      catch (error) {
        console.log(error, "errror");
      }
    })

  }, [attributeGroup])

  var imageValue = []
  const ImageBuffer = (e) => {
    if (e.target.files.length > 1) {
      for (let i = 0; i < e.target.files.length; i++) {
        const element = e.target.files[i];
        imageValue.push(element)
      }
      setImages(imageValue)
      const files = e.target.files;
      const imagePromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file) {
          const reader = new FileReader();
          imagePromises.push(
            new Promise((resolve) => {
              reader.onload = (e) => {
                resolve(e.target.result);
              };
              reader.readAsDataURL(file);
            })
          );
        }
      }

      Promise.all(imagePromises).then((results) => {
        setImageDataList(results);
      });
    }
    else {
      alert("please select 2 image")
    }

  }



  const deleteimg = (id) => {

    images.splice(id, 1)
    const update = imageDataList.filter((ele, index) => ele !== id)
    setImageDataList(update)
  }

  const sizes = (e) => {
    setSizeArray((prev) => [...prev, e.target.value])
    for (let i = 0; i < sizeArray.length; i++) {
      const element = sizeArray[i];
      if (element === e.target.value) {
        const update = sizeArray.filter((val) => val !== e.target.value)
        setSizeArray(update)
      }
    }
  }
  const AddSize = () => {
    setClose(false)
  }
  const deleteSize = (value, index) => {
    sizeQuantity.splice(index, 1)
    const update = sizeArray.filter((val) => val !== value)
    setSizeArray(update)
  }
  const SizeInputValue = (e) => {
    const value = e.target.value;
    setSizeQuantity((prev) => [...prev, value])
  }
  const AddSizeQunatity = () => {
    for (let j = 0; j < sizeQuantity.length; j++) {
      const value = sizeQuantity[j];
      let obj = {}
      obj[sizeArray[j]] = value
      sizeArrays.push(obj)
    }
    setSizeQuantityArray(sizeArrays)
  }
  
  const onSubmit = async (data) => {
    const attri = {"Material":data.Material,"Color":data.Color,"Brand":data.Brand,"Size":sizeArray}

    if (data.sPrice <= data.price) {
      toast.error("Plaese enter price less then Strike price", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
    else {
      setImageSize("")
      setSizeArray([])
      setImageDataList([])
      setSizeQuantity([])
      setSizeQuantityArray([])
      const item = new FormData()
      item.append("name", data.name)
      item.append("mId", data.mId)
      item.append("sId", data.sId)
      item.append("cId", data.cId)
      item.append("active", isChecked)
      item.append("sale", sale)
      Array.from(images).forEach((image, index) => {
        item.append("image", image)
      })
      item.append("sizeQuantity", JSON.stringify(sizeQuantityArray))
      item.append("description", data.description)
      item.append("brand", data.Brand)
      item.append("price", data.price)
      item.append("sPrice", data.sPrice)
      item.append("attributes", JSON.stringify(attri))
      dispatch(AddProducts(item))
      setSale(false)
      reset()
      clearErrors()

    }



  }
 

  return (
    <>

      {getLoading || isLoadingAttribute || loader ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#32cd32', '#138808', '#228c22', '#abbd81', '#849b87']}
        />
      </div> : <> <div className="container">
        <div className="addProduct">
        <div className="row w-100" style={{ background: "white", padding: "20px 0px", borderRadius: "8px" }}>
          <div className="col-lg-11  mx-auto Product">
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="row">
                <div className="col-md-4">
                  <div className="form-floating">
                    <select className="form-select" id="floatingSelect"  {...register("mId", {
                      required: true, onChange: (e) => {
                        const m_id = e.target.value
                        setMainId(m_id)
                        dispatch(GetCateId(m_id))
                      }
                    })}>
                      <option selected={true} disabled value=""  >Select Main Category</option>
                      {
                        getMainCate.length > 0
                          ?
                          getMainCate.map((val, index) => {

                            return (
                              <>
                                <option key={index} value={val.Id}>{val.Name}</option>


                              </>
                            )
                          }) : <option selected value="" disabled style={{ color: "red" }} >No Data Found Please Set Main Category </option>
                      }

                    </select>
                    <label htmlFor="floatingSelect">Main Category</label>
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.mId?.message}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  {getCateIdLoading ? <div style={{ height: "5vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#32cd32', '#138808', '#228c22', '#abbd81', '#849b87']}
                    />

                  </div> : <div className="form-floating">
                    <select className="form-select" id="floatingSelect"{...register("cId", {
                      required: true, onChange: (e) => {
                        const c_id = e.target.value
                        const data = { mainId, c_id }
                        dispatch(GetSubCateId(data))

                      }
                    })}>
                      <option selected value="" disabled>Select  Category</option>
                      {
                        getIdCate.length > 0
                          ?
                          getIdCate.map((val, index) => {

                            return (
                              <>
                                <option key={index} value={val.Id}>{val.Name}</option>
                              </>
                            )
                          }) : <option value="" disabled style={{ color: "red" }} > Please Set Main Category </option>
                      }

                    </select>
                    <label htmlFor="floatingSelect"> Category</label>
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.cId?.message}</p>
                  </div>}
                </div>
                <div className="col-md-4">
                  {getSubCateIdLoading ? <div style={{ height: "5vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
                    <ColorRing
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={['#32cd32', '#138808', '#228c22', '#abbd81', '#849b87']}
                    />

                  </div> : <div className="form-floating">
                    <select className="form-select" id="floatingSelect"{...register("sId", { required: true })}>
                      <option selected value="" disabled>Select Sub Category</option>
                      {
                        getSubIdCate.length > 0
                          ?
                          getSubIdCate.map((val, index) => {

                            return (
                              <>
                                <option key={index} value={val.Id}>{val.Name}</option>
                              </>
                            )
                          }) : <option value="" disabled style={{ color: "red" }} > Please Set Category </option>
                      }

                    </select>
                    <label htmlFor="floatingSelect"> Sub Category</label>
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.sId?.message}</p>
                  </div>}
                </div>

              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control text-capitalize" placeholder="Main Category Name" {...register("name", { required: true })} />
                    <label htmlFor="floatingInput">Product Name</label>
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.name?.message}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control text-capitalize" placeholder="Main Category Name" {...register("price", { required: true })} />
                    <label htmlFor="floatingInput">Product Price</label>
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.price?.message}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control text-capitalize" placeholder="Main Category Name" {...register("sPrice", { required: true })} />
                    <label htmlFor="floatingInput">Strike Price</label>
                    <p style={{ color: "red", fontSize: "14px" }}>{errors.sPrice?.message}</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-floating mb-3" onClick={() => setClose(!close)}>
                    <div className="form-control" >
                      <AiOutlineArrowDown className="d-block ms-auto" />
                    </div>
                    <label htmlFor="floatingInput">Size</label>
                  </div>
                  {
                    close && <div className="" style={{ background: "white", border: "1px solid gray", borderRadius: "10px", height: "150px", zIndex: "2", position: "relative", overflow: "auto" }}>
                      <div className="row px-0 mx-0  gy-2 mt-2">
                        {
                          attribute.length > 0 ?
                            attribute.map((item, val) => {

                              return (
                                Object.keys(item).map(key => {
                                  if (key === "Size") {
                                    return (
                                      <>
                                        {
                                          item[key].map((val) => {
                                            
                                            return (
                                              <>
                                                <div className="col-4 text-center">
                                                  <input type="checkbox" value={val} onChange={sizes} />
                                                  <span>{val}</span>
                                                </div>
                                              </>
                                            )
                                          })
                                        }
                                      </>
                                    )
                                  }

                                }))
                            })
                            : 'Please Set Size Attribute'
                        }
                        <div className="col-12">
                          <button className="btn btn-success mb-3" onClick={AddSize}>Add Size</button>
                        </div>
                      </div>
                    </div>
                  }
                </div>

              </div>
              {sizeArray.length > 0 && <div className="col-12 mx-auto my-3">
                <table className="table table-hover   " id="table_attribute" style={{
                  borderCollapse: "collapse",
                  borderRadius: "1em",
                  overflow: "hidden",
                  background: "rgba(243,243,244,0.4)",

                }}>
                  <thead> <tr className="text-center">
                    <th className="col-4 p-3 fontSizeHeaderAdd">Size</th>
                    <th className="col-4 p-3 fontSizeHeaderAdd">Quantity</th>
                    <th className="col-4 p-3 fontSizeHeaderAdd">Action</th>
                  </tr></thead>
                  <tbody>
                    {sizeArray.map((val, index) => {
                      return (
                        <>
                          <tr className="text-center">
                            <td className="px-3 py-2 fontSize">{val}</td>
                            <td><input type="text" onBlur={SizeInputValue} style={{ borderRadius: "6px", outline: "none", width: "80px" }} /></td>
                            <td><RiDeleteBin6Line style={{ cursor: "pointer", color: "red", fontSize: "18px" }} onClick={() => deleteSize(val, index)} /></td>
                          </tr>
                        </>
                      )
                    })}
                    <tr>
                      <td colSpan={3}>
                        <button className="btn btn-outline-success my-3 d-block ms-auto" type="button" onClick={() => AddSizeQunatity()}>Add Size Quantity </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>}
              <div className="col-12 my-3">
                <div className="form-floating">
                  <textarea className="form-control" placeholder="Product Description" id="floatingTextarea2" style={{ height: "100px" }} {...register("description", { required: true })}></textarea>
                  <label for="floatingTextarea2">Product Description</label>
                </div>
                <p style={{ color: "red", fontSize: "14px" }}>{errors.description?.message}</p>
              </div>

              <div className="row">
                <div className="col-lg-9 col-sm-8 col-8">
                  <div className="upload-container">
                    <input type="file" id="file-input" className="hidden" multiple accept="image/jpeg, image/png" onChange={ImageBuffer} />
                    <label for="file-input" className=" btn btn-primary">Choose File</label> *Minimum 2 image required.
                  </div>

                </div>

              </div>
              {imageSize && <p style={{ color: "red", fontSize: "14px" }}>{imageSize}</p>}
              <div className="col-12 mt-3" style={{ background: "#e9ecef", padding: "18px", borderRadius: "10px", maxHeight: "455px", overflow: "auto" }}>
                <div className="row gy-3">
                  {
                    imageDataList.length !== 0 ?
                      imageDataList.map((val, index) => {
                        return (
                          <>
                            <div className="col-md-4 position-relative image_hover" >
                              <img src={val} key={index} alt="product" className="img-fluid" id="image" />
                              <div className="position-absolute top-50 start-50 translate-middle delete_btn" style={{ display: "none" }}>
                                <FaTrash
                                  className="text-danger btn_trash"
                                  onClick={() => deleteimg(val)}
                                />
                              </div>

                            </div>
                          </>
                        )
                      })
                      : <>
                        <div className="col-12"><div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Image</p></div></div></>
                  }
                </div>
              </div>

              <div className="row mt-3">
                <h4>Attributes</h4>
                {
                  attribute.length > 0 ?
                    attribute.map((item, val) => {
                      return (
                        Object.keys(item).map(key => {
                          if (key !== "Size") {
                            return (
                              < div className="col-md-4 mb-3" key={key} >
                                <div className="form-floating">
                                  <select className="form-select  " id="floatingSelect" aria-label="Floating label select example"  {...register(`${key}`, { required: true })} key={key}>
                                    <option selected={true} disabled value=""  >Select Main Category</option>
                                    {
                                      item[key].map((val) => {
                                        return (
                                          <>
                                            <option value={val}>{val}</option>
                                          </>
                                        )
                                      })
                                    }
                                  </select>
                                  <label for="floatingSelect " className="text-capitalize">{key}</label>
                                </div>
                              </div>)
                          }

                        }))
                    })
                    : ''
                }
              </div>
              <div className="form-check form-switch mt-3">
                <label className="form-check-label" >Product status</label>
                <input className="form-check-input" type="checkbox" role="switch" onChange={() => setIsChecked(!isChecked)} checked={isChecked} />
              </div>
              <div className="form-check form-switch mt-3">
                <label className="form-check-label" >Product For Sale</label>
                <input className="form-check-input" type="checkbox" role="switch" onChange={() => setSale(!sale)} checked={sale} />
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-success" disabled={AddProductLoading ? true : false}>{AddProductLoading ? <><ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={['#198754']}
                />Loading</> : "Add Product"}</button>
                <button className="btn btn-danger" onClick={() => {
                  reset()
                  clearErrors()
                  
                }
                }>Cancel</button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div></>}
    </>

  )
}

export default AddProduct





