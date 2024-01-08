import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import axios from "axios";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux"
import { GetMainCate } from '../Store/CategoryAction';
import { UpdateProduct } from '../Store/ProductAction';

const schema = yup.object({
    name: yup.string().required("Product Name is Required"),
    price: yup.number()
        .typeError("Please enter number value only")
        .nullable()
        .required("Please Enter Product Price")
        .moreThan(-1, "Negative values not accepted"),
    sPrice: yup.number()
        .typeError("Please enter number value only")
        .nullable()
        .required("Please Enter Product Price")
        .moreThan(-1, "Negative values not accepted"),

    description: yup.string().required(" Product Description is Required"),

})
const UpdateProductPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { update } = useParams();
    const [updateData, setUpdateData] = useState();
    const [sizeArray, setSizeArray] = useState([]);
    
    const [updateLoading, setUpdateLoading] = useState(true)
    const [imageDataList, setImageDataList] = useState([]);
    const { UpdateProductLoading, UpdateProductMsg } = useSelector((state) => state.product)
    const { register, reset, handleSubmit, formState: { errors }, clearErrors } = useForm({
        resolver: yupResolver(schema),
    })

    const data = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${JSON.parse(localStorage.getItem("token"))}`
                },
            }
            const result = await axios.get(`${process.env.REACT_APP_PORT}/product/${update}`, config)
            setUpdateData(result.data.product)
            setSizeArray(result.data.product.Size_Quantity)
            setImageDataList(result.data.product.Image.images)
            setUpdateLoading(false)
            return result.data
        } catch (error) {
            if (error.response.data.msg) {
                toast.error(error.response.data.msg, {
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
        }
    }
    useEffect(() => {
        data()
        dispatch(GetMainCate())
    }, [])
   


    const SizeInputValue = (size, value) => {
        
        sizeArray[size] = parseInt(value)
    }
    const AddSizeQunatity = () => {
        setSizeArray(sizeArray)
    }
    const onSubmit = (data) => {
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
            const item = { "id": updateData.Id, "name": updateData.Name, "description": updateData.Description, "sizeQuantity": sizeArray, "price": parseInt(updateData.Price), "sPrice": parseInt(updateData.S_Price) }
            console.log(item);
            dispatch(UpdateProduct(item))
            setTimeout(()=>{
              navigate('/product/list')
            },UpdateProductMsg)
            reset()
            clearErrors()
        }
    }
    
    return (
        <>

            {updateLoading ? <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
                <div className="container">
                    <div className="addProduct">
                        <div className="row w-100" style={{ background: "white", padding: "20px 0px", borderRadius: "8px" }}>
                            <div className="col-lg-11  mx-auto Product">
                                <form onSubmit={handleSubmit(onSubmit)} >
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control text-capitalize" placeholder="Main Category Name" {...register("name", {
                                                    required: true, onChange: (e) => {
                                                        updateData.Name = e.target.value
                                                    }
                                                })}
                                                    defaultValue={updateData.Name} />
                                                <label htmlFor="floatingInput">Product Name</label>
                                                <p style={{ color: "red", fontSize: "14px" }}>{errors.name?.message}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control text-capitalize" placeholder="Main Category Name" {...register("price", {
                                                    required: true, onChange: (e) => {
                                                        updateData.Price = e.target.value
                                                    }
                                                })} defaultValue={updateData.Price} />
                                                <label htmlFor="floatingInput">Product Price</label>
                                                <p style={{ color: "red", fontSize: "14px" }}>{errors.price?.message}</p>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-floating mb-3">
                                                <input type="text" className="form-control text-capitalize" placeholder="Main Category Name" {...register("sPrice", {
                                                    required: true, onChange: (e) => {
                                                        updateData.S_Price = e.target.value
                                                    }
                                                })} defaultValue={updateData.S_Price} />
                                                <label htmlFor="floatingInput">Strike Price</label>
                                                <p style={{ color: "red", fontSize: "14px" }}>{errors.sPrice?.message}</p>
                                            </div>
                                        </div>
                                        <div className="col-12 mx-auto my-3">
                                            <table className="table table-hover   " id="table_attribute" style={{
                                                borderCollapse: "collapse",
                                                borderRadius: "1em",
                                                overflow: "hidden",
                                                background: "rgba(243,243,244,0.4)",

                                            }}>
                                                <thead> <tr className="text-center">
                                                    <th className="col-4 p-3 fontSizeHeaderAdd">Size</th>
                                                    <th className="col-4 p-3 fontSizeHeaderAdd">Quantity</th>

                                                </tr></thead>
                                                <tbody>
                                                    {Object.keys(updateData.Size_Quantity).map((size) => {
                                                        return (
                                                            <>
                                                                <tr className="text-center">
                                                                    <td className="px-3 py-2 fontSize">{size}</td>
                                                                    <td><input type="text" onBlur={(e) => SizeInputValue(size, e.target.value)} defaultValue={updateData.Size_Quantity[size]} style={{ borderRadius: "6px", outline: "none", width: "80px" }} /></td>
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
                                        </div>
                                        <div className="col-12 my-3">
                                            <div class="form-floating">
                                                <textarea class="form-control" placeholder="Product Description" id="floatingTextarea2" style={{ height: "100px" }} {...register("description", {
                                                    required: true, onChange: (e) => {
                                                        updateData.Description = e.target.value
                                                    }
                                                })} defaultValue={updateData.Description}></textarea>
                                                <label for="floatingTextarea2">Product Description</label>
                                            </div>
                                            <p style={{ color: "red", fontSize: "14px" }}>{errors.description?.message}</p>
                                        </div>
                                    </div>


                                    <div className="row">

                                        <div className="col-12 mt-3" style={{ background: "#e9ecef", padding: "18px", borderRadius: "10px", maxHeight: "455px", overflow: "auto" }}>
                                            <div className="row gy-3">
                                                {
                                                    imageDataList.length !== 0 ?
                                                        imageDataList.map((val, index) => {
                                                            return (
                                                                <>
                                                                    <div className="col-md-4 position-relative " >
                                                                        <img src={val} key={index} alt="product" className="img-fluid" id="image" />


                                                                    </div>
                                                                </>
                                                            )
                                                        })
                                                        : <>
                                                            <div className="col-12"><div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}><svg width="80" height="80" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fillRule="evenodd"><ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7"></ellipse><g fillRule="nonzero" stroke="#d9d9d9"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa"></path></g></g></svg> <p>No Image</p></div></div></>
                                                }
                                            </div>
                                        </div>

                                    </div>

                                    <div className="d-flex justify-content-between mt-3">
                                        <button type="submit" className="btn btn-success" disabled={UpdateProductLoading}>{UpdateProductLoading ? <><ColorRing
                                            visible={true}
                                            height="30"
                                            width="30"
                                            ariaLabel="blocks-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="blocks-wrapper"
                                            colors={['#198754']}
                                        />Loading</> : "Update Product"}</button>
                                        <button className="btn btn-danger" onClick={() => {
                                            reset()
                                            navigate('/product/list')

                                        }
                                        }>Cancel</button>
                                    </div>
                                    

                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
        </>
    )
}

export default UpdateProductPage
