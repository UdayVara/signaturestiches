import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Cartcard from '@/components/Cartcard'
import Loader from '@/components/Loader'
import OrderPageCard from '@/components/OrderPageCard'

function individualOrderPage() {
    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const loginData = useSelector((state) => state.login)
    const [order, setOrder] = useState()
    const [loading, setLoading] = useState(false)
    const getOrder = async () => {
        setLoading(true)
        setTimeout(async () => {
            if (!loginData.isLogin) {
                return 
            }
            if(!router.query.orderid){
                return
            }
            setLoading(true)
            const data = await fetch(`${url}/order/get/${router.query.orderid}`,{
                method: 'GET',
                headers: {
                    "auth-token":loginData.id
                }
            })
            const parsedData = await data.json()
            console.log(parsedData)
            if (parsedData.success) {
                setOrder(parsedData.order)
            } else {
                toast.error(parsedData.message)
            }
            setLoading(false)
        },500)
    }
    useEffect(() => {
        getOrder()
    }, [loginData.isLogin,router.query.orderid])
    return (
        <>
        {loading && <Loader />}
            {order && <div className="container my-5">
                <h3>Order : #{router.query.orderid} <span class="badge rounded-pill text-bg-warning fs-5">{order.status}</span></h3>
                <div className="row g-2 mt-2">
                    <div className="col-md-8 ">
                        <div className="d-flex flex-column justify-content-start">
                            {order.products.map((element,index)=>{
                                return <OrderPageCard product={element.product} size={element.size}/>
                            })}
                        </div>
                    </div>
                    <div className="col-md-4  ">
                        <div className="container-fluid shadow py-3 ps-1">
                            <h3 className="text-center">Order Summary</h3>
                            <div className="d-flex flex-column mt-5 mb-4 px-2 ">
                                <div className="d-flex justify-content-between">
                                    <h4>Total  </h4>
                                    <h4>{order.total}</h4>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h4>Discount  </h4>
                                    <h4 className='text-success'>- {order.discount}</h4>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <h4>Delivery  </h4>
                                    <h4>{order.shippingCharges}</h4>
                                </div>
                                <hr />
                            </div>
                            <div className="px-2 d-flex mt-5 justify-content-between">
                                <h4 className='fs-2'>Final Price</h4>
                                <h4 className='fs-2'>{order.grandTotal}</h4>
                            </div>


                        </div>
                       
                    </div>
                </div>
            </div>}
        </>
    )
}

export default individualOrderPage