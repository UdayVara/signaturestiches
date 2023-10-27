import Loader from '@/components/Loader'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'


function ProductPage() {
    const router = useRouter()
    const loginInfo = useSelector((state) =>  state.login )
    console.log(loginInfo);
    const [product, updateProduct] = useState()
    const [serviceStatus, updatedServiceStatus] = useState()
    const [selectedSize,updateSelectedSize] = useState()
    const [pincode, updatePincode] = useState()
    const [isLoading,setLoading] = useState(false)
    const currentCities = [360575, 360001, 360576, 380001, 400008, 560002]
    const productId = router.query.productid;
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const validatePincode = () => {
        if (currentCities.includes(parseInt(pincode))) {
            updatedServiceStatus(true)
        } else {
            updatedServiceStatus(false)
        }
    }

    const getProduct = async () => {
        setLoading(true)
        setTimeout(async()=>{
            if (productId) {
                const data = await fetch(`${url}/products/${productId}`)
                const parsedData = await data.json()
                console.log(parsedData);
                if (parsedData.success) {
                    updateSelectedSize(parsedData.product.sizes[0])
                    updateProduct(parsedData.product)
                }
            }
            setLoading(false)
        },500)
        
    }

    const addItem = async () => {
        if(!loginInfo.isLogin){
            router.push("/login")
            return
        }
        setLoading(true)
        const data = await fetch(`${url}/cart/additem`,{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "auth-token": loginInfo.id
            },
            body:JSON.stringify({
                product:productId,
                size:selectedSize
            })
        })
        const parsedData = await data.json()

        if (parsedData.success) {
            toast.success("Product Added Successfully.")
        } else {
            toast.error(parsedData.message)
        }
        setLoading(false)
    }

    useEffect(() => {
        getProduct()
    }, [productId])
    return (
        <>
            {/* <h6 className=" my-3 text-start">
                Welcome to the Product Page.Product : {productId}
            </h6> */}
            {isLoading && <Loader />}
            {product && <div className="container mt-3 mb-5">
           
                <div className="row">
                    <div className="col-md-6 col-lg-4">
                        <img src={`http://localhost:5000/Images/${product.image}`} alt="" style={{ maxHeight: "80vh" }} loading='lazy' className="d-block mx-auto img-fluid" />
                    </div>
                    <div className="col-md-6 col-lg-8 pt-3">
                        <h2 className="text-start mb-0 ms-0">{product.name}</h2>
                        <h6 className="ms-1 text-secondary">T-shirt</h6>
                        <p className="mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde doloribus dolores iste veniam suscipit repudiandae consectetur corrupti, ut quia nostrum laboriosam saepe. Id ipsum quia libero nesciunt, nihil commodi, dolore iusto esse non nam voluptate vel, repellat corrupti hic nemo amet maxime eum incidunt illum? Dolore corporis rerum dolorem officia?</p>
                        <div className='d-flex align-items-center'>
                            <h5 className="pt-2">Select Size : </h5>
                            <select className='ms-5 form-select' onChange={(e)=>{updateSelectedSize(e.target.value)}} style={{ maxWidth: "150px" }}>
                                {product.sizes.map((element, index) => {
                                    return <option value={element}>{element}</option>
                                })}
                            </select>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <h2 className="mt-3">₹{parseInt(parseInt(product.price) - ((parseInt(product.price) * parseInt(product.discount)) / 100))} <strike className="text-muted fs-6 ">{product.price}</strike> <span className="fs-5 text-success">{product.discount}%</span> </h2>
                            <button className="btn btn-danger" onClick={addItem}>Add To Cart <i class="bi bi-cart text-light fs-5 ms-2"></i></button>
                        </div>
                        <div className="d-flex mt-4 mb-1">
                            <input type="text" name="pin" id="pin" className="form-control shadow-sm p-2 " placeholder="Enter Pincode" style={{ maxWidth: "17rem" }} onChange={(e) => { updatePincode(e.target.value) }} />
                            <button className=" ms-4 btn btn-danger rounded px-4" onClick={validatePincode}>Check</button>
                        </div>


                        {(serviceStatus == true && serviceStatus != null) && <p className='ms-1'>We Deliver to Your Pincode</p>}

                        {(serviceStatus == false && serviceStatus != null) && <p className='ms-1 text-danger
                        '>Sorry , We are currently not availabe in your area</p>}


                    </div>
                </div>
            </div>}
        </>
    )
}

export default ProductPage