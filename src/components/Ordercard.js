import Link from 'next/link'
import React from 'react'

function Ordercard(props) {
  return (
    <div className="container-fluid my-3 py-3 shadow border border-2 d-flex justify-content-between rounded">
        <div className="ps-md-3">
            <h4 className="text-start  fs-6">#{props.orderId}</h4>
            <h6 className="text-muted ps-2">{props.items} Items <span class="badge rounded-pill text-bg-warning">{props.status}</span></h6>
        </div>
        <div>
            <h4 className='fs-5 text-center'>₹ {props.amount}</h4>
            <Link href={`/user/order/${props.orderId}`} className="btn btn-danger btn-sm px-4 rounded">View</Link>
        </div>
    </div>
  )
}

export default Ordercard