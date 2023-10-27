import React from 'react'
import Displaycard from '@/components/Displaycard'
import { toast } from 'react-toastify'
function hoodies(props) {
  let products = []
  if (props.parsedData.success) {
    products = props.parsedData.products
  } else {
    toast.error("Internal server Error")
  }
  return (
    <>
      <h1 className="text-center mt-4 mb-md-4 mb-2">Shop Now</h1>
      <div className="container mb-4">
        <div className="row row-cols row-cols-1 row-cols-lg-4 row-cols-md-2">
          {
            products.map((element, index) => {
              return <div className="col">
                <Displaycard image={element.image} title={element.name} category={element.category} price={element.price} id={element._id} discount={element.discount} />
              </div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default hoodies

export async function getServerSideProps() {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL
  const data = await fetch(`${url}/products/get/hoodie`)
  const parsedData = await data.json()

  if (parsedData.success) {
    console.log(parsedData);
    // setProducts(parsedData.products)
  } else {
    console.log(parsedData);
  }
  // Pass data to the page via props
  return { props: { parsedData } }
}