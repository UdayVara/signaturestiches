import Cartcard from '@/components/Cartcard'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Link from 'next/link'
import Loader from '@/components/Loader'
function cart() {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const [cart, updateCart] = useState()
    const [isLoading, setLoading] = useState(false)
    const loginData = useSelector((state) => state.login)
    console.log(loginData);
    const getCart = async () => {
        if (loginData.id == "") {
            return
        }
        setLoading(true)
        setTimeout(async () => {
            const data = await fetch(`${url}/cart/getcart`, {
                headers: {
                    "auth-token": loginData.id
                }
            })
            const parsedData = await data.json()
            console.log(parsedData)
            if (parsedData.success) {
                updateCart(parsedData.cart)
            } else {
                // toast.error(parsedData.message)
                updateCart()
            }
            setLoading(false)
        }, 600)

    }
    const initPayment = (data) => {
        const options = {
            key:"rzp_test_Cx5kAsblXRM9rs",
            // key: "II0ANXBL9J0nnDRcpU8tCpiJ",
			amount: data.amount,
			currency: data.currency,
            order_id: data.id,
            handler: async (response) => {
				try {
                    
					await fetch(`${url}/order/verify`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token": loginData.id
                        },
                        body: JSON.stringify({
                            razorpay_order_id:response.razorpay_order_id,
                            razorpay_payment_id:response.razorpay_payment_id,
                            razorpay_signature : response.razorpay_signature,
                            id:cart._id
                        })
                    })
                    getCart()
				} catch (error) {
					console.log(error);
				}
			},
			theme: {
				color: "#3399cc",
			},
        }
        const rzp1 = new window.Razorpay(options)
        rzp1.open()
    }
    const placeOrder = async () => {
        // setLoading(true)
        // setTimeout(async () => {
            const data = await fetch(`${url}/order/place`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": loginData.id
                },
                body: JSON.stringify({ id: cart._id })
            })

            const parsedData = await data.json()
            console.log(parsedData);
            initPayment(parsedData.data)
            if (parsedData.success) {
                toast.success(parsedData.message)
            } else {
                toast.error(parsedData.message)
            }
            // setLoading(false)
            // getCart()
        // }, 500)

    }
    useEffect(() => {
        getCart()
    }, [loginData])
    return (
        <>
            {isLoading && <Loader />}
            {(cart && loginData.isLogin && !isLoading) && <div className="container my-5">
                <h2 className="text-start mt-4">My Cart : </h2>
                <div className="row g-2">
                    <div className="col-md-8 ">
                        <div className="d-flex flex-column justify-content-start">
                            {cart.products.map((element, index) => {
                                return <Cartcard id={element} total={cart.products.length} index={index} key={index} reload={getCart} />
                            })}
                        </div>
                    </div>
                    <div className="col-md-4  ">
                        <div className="container-fluid shadow py-3 ps-1">
                            <h3 className="text-center">Cart Summary</h3>
                            <div className="d-flex flex-column mt-5 mb-4 px-2 ">
                                <div className="d-flex justify-content-between">
                                    <h4>Total  </h4>
                                    <h4>{cart.mrp}</h4>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h4>Discount  </h4>
                                    <h4 className='text-success'>- {cart.discountAmount}</h4>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h4>Delivery  </h4>
                                    <h4>40</h4>
                                </div>
                                <hr />
                            </div>
                            <div className="px-2 d-flex mt-5 justify-content-between">
                                <h4 className='fs-2'>Final Price</h4>
                                <h4 className='fs-2'>{cart.mrp - cart.discountAmount + 40}</h4>
                            </div>


                        </div>
                        <button className="btn btn-primary mt-2 w-100 fs-5" onClick={placeOrder}>Place Order</button>
                    </div>
                </div>

            </div>}

            {(!cart && loginData.isLogin && !isLoading) && <div>
                <h2 className="my-5 text-center py-md-5 py-2">Your cart is Empty. <Link className="text-danger" href="/products">Add Products</Link></h2>
            </div>}
            {!cart && !loginData.isLogin && <div>
                <h2 className="my-5 text-center py-md-5 py-2"> <Link href="/login" className="text-danger">Login Now</Link> To Fill Your Cart</h2>
            </div>}
        </>
    )
}

export default cart