import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Cartcard(props) {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const [product, updateProduct] = useState()
    const loginInfo = useSelector((state) => state.login)
    const index = props.index
    const getProduct = async () => {
        const data = await fetch(`${url}/products/${props.id.product}`)
        const parsedData = await data.json()
        if (parsedData.success) {
            updateProduct(parsedData.product)
        } else {
            toast.error(parsedData.message)
        }
    }
    const deleteProduct = async () => {
        const data = await fetch(`${url}/cart/deleteitem`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "auth-token": loginInfo.id
            },
            body: JSON.stringify({ index: index })
        })

        const parseData = await data.json()
        console.log(parseData);
        props.reload()
    }
    useEffect(() => {
        getProduct()
    }, [])
    return (    
        <>
            {(product && loginInfo.isLogin) && <div class="card mb-3" >
                <div class="d-flex flex-row">
                    <div class="image">
                        <img src={`${url}/Images/${product.image}`} alt="..." style={{ maxHeight: "200px",maxWidth:"40vw" }} />
                    </div>
                    <div class="content w-100">
                        <div class="card-body ">
                            <div className="w-100 title d-flex justify-content-between gap-2">
                                <h5 class="card-title">{product.name}</h5>
                                <h5>Rs.{product.price}</h5>
                            </div>

                            <h6>Size : {props.id.size}</h6>
                            {props.remove != false && <button className="btn btn-danger btn-sm mt-2" onClick={deleteProduct}> <i class="bi bi-trash3"></i> Remove</button>}
                        </div>
                    </div>
                </div>
            </div> }
        </>
    )
}

export default Cartcard

