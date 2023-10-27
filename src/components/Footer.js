import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <>
            <div className="container-fluid py-5 text-dark" style={{ backgroundColor: '#E6E7E8',bottom:"0" }}>
                <div className="container">

                    <div className="row">
                        <div className="col-md-3 fs-3 "><img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/Images/ss_logo.jpg`} loading='lazy' className="img-fluid d-block mx-auto rounded" alt="" /></div>
                        <div className="col-md-6  mt-md-0 mt-4 ">
                            <div className="ms-lg-3 row pt-3">

                                <div className="col-6 fs-5">
                                    <h4 className='fs-3'><Link href="/products" className=' text-decoration-none text-dark'>Products</Link></h4>
                                    <ul style={{ listStylePosition: "inside", listStyleType: "none" }}>
                                        <Link href="/products/tshirts" className="text-decoration-none text-dark"><li>Tshirt</li></Link>
                                        <Link href="/products/shirts" className="text-decoration-none text-dark"><li>Shirt</li></Link>
                                        <Link href="/products/jeans" className="text-decoration-none text-dark"><li>Jeans</li></Link>
                                        <Link href="/products/hoodies" className="text-decoration-none text-dark"><li>Hoodies</li></Link>
                                    </ul>
                                </div>
                                <div className="col-6 fs-5"><h4 className='fs-3'>Services</h4>
                                    <ul style={{ listStylePosition: "inside", listStyleType: "none" }}>
                                        <li><Link href="/user" className='text-decoration-none text-dark'>My Account</Link></li>
                                        <li><Link href="/user/cart" className='text-decoration-none text-dark'>My Cart</Link></li>
                                        <li>Terms & Conditions</li>
                                        <li>Return Policy</li>
                                    </ul></div>

                            </div>
                        </div>
                        <div className="col-md-3 pt-3   ">
                            <h3>Signature Stiches</h3>
                            <h6>Get outfit of your choice for everyone.</h6>
                            <h6 className="mt-3">Contact us on</h6>
                            <div className="d-flex fs-5 justify-content-start" >
                                <i className="bi bi-envelope me-3"></i>
                                <i className="bi bi-facebook me-3"></i>
                                <i className="bi bi-whatsapp me-3"></i>
                                <i className="bi bi-instagram me-3"></i>
                                <i className="bi bi-linkedin"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer