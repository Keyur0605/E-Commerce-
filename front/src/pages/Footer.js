import React, { useState, useEffect } from 'react'
import "../style/Footer.css"
import { GetContact } from '../Store/ContactAction'
import { useSelector, useDispatch } from "react-redux"
import { ColorRing } from 'react-loader-spinner';
const Footer = () => {
    const dispatch = useDispatch();
  
    const [conatctData, setContactData] = useState()
    const { getContactLoading, getContactMsg } = useSelector((state) => state.contact)

    useEffect(() => {
        dispatch(GetContact())
      
    }, [])
   
    useEffect(() => {
        if (getContactMsg) {
            setContactData(getContactMsg)
        }
    }, [getContactMsg])
    console.log(conatctData);
    return (
        <>
            {getContactLoading  ? <div style={{ height: "30vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
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
                : <footer class="footer-section" >
                    <div class="container">
                        <div class="footer-cta pt-5 pb-5">
                            <div class="row">
                                <div class="col-xl-4 col-md-4 mb-30 d-flex justify-content-center">
                                    <div class="single-cta">
                                        <i class="fas fa-map-marker-alt"></i>
                                        <div class="cta-text">
                                            <h4>Find us</h4>
                                            <span>{conatctData && conatctData[0].Address}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-md-3 mb-30 d-flex justify-content-center">
                                    <div class="single-cta">
                                        <i class="fas fa-phone"></i>
                                        <div class="cta-text">
                                            <h4>Call us</h4>
                                            <span>{conatctData &&  conatctData[0].Mobile}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-5 col-md-5 mb-30 d-flex justify-content-center">
                                    <div class="single-cta">
                                        <i class="far fa-envelope-open"></i>
                                        <div class="cta-text">
                                            <h4>Mail us</h4>
                                            <span>{conatctData &&  conatctData[0].Email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                    <div class="copyright-area">
                        <div class="container">
                            <div class="row">
                                <div class="col-6 d-flex  justify-content-center align-items-center">
                                    <div class="copyright-text">
                                        <p>Copyright &copy; 2023, All Right Reserved Keyur & Harsh</p>
                                    </div>
                                </div>
                                <div className="col-6 justify-content-end d-flex">
                                <div class="footer-social-icon">
                                            <a href="#"><i class="fab fa-facebook-f facebook-bg"></i></a>
                                            <a href="#"><i class="fab fa-twitter twitter-bg"></i></a>
                                            <a href="#"><i class="fab fa-google-plus-g google-bg"></i></a>
                                        </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </footer>}
        </>
    )
}

export default Footer
