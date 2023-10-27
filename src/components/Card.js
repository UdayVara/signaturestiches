import React from 'react'
function Card(props) {
    return (
        <div class="card" style={{ pointerEvents: "none" }}>
            <img src={props.image} class="card-img-top img-fluid" alt="..." style={{ maxHeight: "50vh", pointerEvents: "none" }} />
            <div class="card-body">
                <h5 class="card-title fs-5">{props.title}</h5>
                <p className="text-secondary ">{props.category}</p>
                <a href="#" class="btn btn-primary mt-2 ms-0">Go somewhere</a>
            </div>
        </div>
    )
}

export default Card