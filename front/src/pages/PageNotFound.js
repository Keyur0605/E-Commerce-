import React from 'react'
import { NavLink } from 'react-router-dom'
const PageNotFound = () => {
    return (
        <div>
            <div className="container">
                <div style={{ height: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="row">
                        <div className="col-12 d-flex flex-column align-items-center">
                        <img src="image/401.png" alt="svg"  className='img-fluid'/>
                        <h4 style={{fontWeight:"bold"}}>404 Page Not Found</h4>
                            <NavLink to="/"><button className='btn btn-primary'>Go to Home</button></NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
