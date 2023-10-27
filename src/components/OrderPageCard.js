import React from 'react'

function OrderPageCard(props) {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const product = props.product
    const size = props.size
    return (
        <div class="card mb-3" >
            <div class="d-flex flex-row">
                <div class="image">
                    <img src={`${url}/Images/${product.image}`} alt="..." style={{ maxHeight: "200px", maxWidth: "40vw" }} />
                </div>
                <div class="content w-100">
                    <div class="card-body ">
                        <div className="w-100 title d-flex justify-content-between gap-2">
                            <h5 class="card-title">{product.name}</h5>
                            <h5>₹ <span className="text-success fs-5">{Math.floor(product.price - (product.price*product.discount/100))}</span> <strike className='text-muted fs-6'>{product.price}</strike></h5>
                        </div>

                        <h6>Size : {size}</h6>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderPageCard