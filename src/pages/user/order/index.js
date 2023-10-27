import Ordercard from '@/components/Ordercard'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';
function index() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
  const loginData = useSelector((state) => state.login)
  const [isLoading, setLoading] = useState(false)
  const [order, updateOrder] = useState()

  const getOrders = async () => {
    setLoading(true)
    if (!loginData.isLogin) {
      return
    }
    setTimeout(async () => {
      const data = await fetch(`${url}/order/getorders`, {
        method: 'GET',
        headers: {
          "auth-token": loginData.id
        }
      })
      const parsedData = await data.json()
      console.log(parsedData);
      if (parsedData.success) {
        updateOrder(parsedData.orders)
      }
      setLoading(false)
    }, 500)

  }


  useEffect(() => {
    getOrders()
  }, [loginData.isLogin])
  return (
    <>
      {isLoading && <Loader />}
      {(order && loginData.isLogin && !isLoading) && <div className="container mt-md-5 mt-3 mb-5 ">
        <h2>My Orders : </h2>
        {order.map((element, index) => {
          return <Ordercard orderId={element._id} items={element.products.length} status={element.status} key={index} amount={element.grandTotal} />
        })}

      </div>}

      {(!order && loginData.isLogin && !isLoading) && <h2 className="my-5 text-center py-md-5 py-2">You Have not purchased anything <Link className="text-danger" href="/products">Buy Now</Link></h2>}

      {(!order && !loginData.isLogin && !isLoading) && <h2 className="my-5 text-center py-md-5 py-2"> <Link href="/login" className="text-danger">Login Now</Link> To Get Your Orders</h2>}
    </>
  )
}

export default index