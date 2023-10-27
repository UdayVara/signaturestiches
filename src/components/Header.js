import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '@/redux/features/loginSlice'
function Header() {
    const dispatch = useDispatch()
    const loginInfo = useSelector((state) => state.login)
    
    useEffect(()=>{
        if(localStorage.getItem("ss-auth-token") && loginInfo.islogin != true){
            dispatch(login(localStorage.getItem("ss-auth-token")))
        }
    },[])
    return (
        <nav className={`navbar navbar-expand-lg shadow`} style={{ backgroundColor: "#E11B23" }}>
            <div className="container-fluid">
                <Link className="navbar-brand text-light" href="/" style={{ fontSize: "1.4rem" }}>Signature Stiches</Link>
                <button className="d-lg-none d-block" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" title="Toggle navigation" style={{ backgroundColor: "#E11B23", border: "0" }} aria-label="Toggle navigation" >
                    <svg width="10vw" height="30px" style={{ maxWidth: "50px" }} viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f7f7f7" transform="matrix(1, 0, 0, -1, 0, 0)rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="0.24000000000000005"></g><g id="SVGRepo_iconCarrier"> <path d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="ms-auto navbar-nav me-2">

                        <li className="nav-item mx-md-2">
                            <Link className="nav-link active text-light" aria-current="page" href="/products/tshirts" style={{ fontSize: "1.2rem" }}>T-shirts</Link>
                        </li>
                        <li className="nav-item mx-md-2">
                            <Link className="nav-link active text-light" href="/products/shirts" style={{ fontSize: "1.2rem" }}>Shirts</Link>
                        </li>
                        <li className="nav-item mx-md-2">
                            <Link className="nav-link active text-light" href="/products/jeans" style={{ fontSize: "1.2rem" }}>Jeans</Link>
                        </li>
                        <li className="nav-item mx-md-2">
                            <Link className="nav-link active text-light" href="/products/hoodies" style={{ fontSize: "1.2rem" }}>Hoodies</Link>
                        </li>
                        {loginInfo.isLogin ? <li className="nav-item dropdown mx-md-2 ">
                            <Link className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ fontSize: "1.2rem" }}>
                                My Account
                            </Link>
                            <ul className="dropdown-menu mb-0 pb-0">
                                <li><Link className="dropdown-item" href="/user/cart"><i className="bi bi-cart text-danger fs-5"></i> Cart</Link></li>
                                <li><Link className="dropdown-item" href="/user" > <i className="bi bi-person text-danger fs-5"></i> Profile</Link></li>
                                <li><Link className="dropdown-item" href="/user/order" > <i className="bi bi-cart-check text-danger fs-5"></i> Orders</Link></li>
                                <li><Link className="dropdown-item bg-danger text-light" href="/" onClick={() => {localStorage.removeItem("ss-auth-token");dispatch(logout())}}><i className="bi bi-box-arrow-left fs-5"></i> Logout</Link></li>
                            </ul>
                        </li> : <li className="nav-item"><Link className='nav-link active text-light' href="/login" style={{ fontSize: "1.2rem" }}><i className="bi bi-person-lock text-light "></i> Login</Link></li>}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header