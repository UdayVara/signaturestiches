import { redirect } from 'next/dist/server/api-utils'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

function Displaycard(props) {
    const router = useRouter()
    return (
        <>
        <div class="card my-4 mx-auto animate" style={{maxWidth:"20rem",cursor:"pointer",height:"35rem"}} onClick={()=>{router.push(`/products/${props.id}`)}}>
            <img src={`http://localhost:5000/Images/${props.image}`} class="card-img-top img-fluid" alt="..."/>
                <div class="card-body">
                    <h5 class="card-title">{props.title}</h5>
                    <p class="card-text">{props.category.charAt(0).toUpperCase() + props.category.slice(1)}</p>
                    <h4 className="mt-4">₹{parseInt(parseInt(props.price)-((parseInt(props.price)*parseInt(props.discount))/100))} <strike className="text-muted fs-6 ">{props.price}</strike> </h4>
                </div>
        </div>
        </>
    )
}

export default Displaycard