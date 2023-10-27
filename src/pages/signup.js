import React from 'react'
import { TextField } from '@mui/material'
import Link from 'next/link'
import { useFormik } from 'formik'
import signupSchema from '@/schema/signup'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/features/loginSlice'

function signup() {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const dispatch = useDispatch()
    const router = useRouter()
    let intialvallues = {
        name: "",
        email: "",
        phone: "",
        password: "",
        cpass: ""
    }

    const sendDataToServer = async (values) => {
        const data = await fetch(`${url}/user/signup`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
            })
        })
        const parsedData = await data.json()
        console.log(parsedData);
        if (parsedData.success) {
            toast.success(parsedData.message)
            localStorage.setItem("ss-auth-token",parsedData.token)
            dispatch(login(parsedData.token))
            router.push("/")
        } else {
            toast.error(parsedData.message)
        }
    }

    const { touched, errors, handleChange, handleSubmit } = useFormik({
        initialValues: intialvallues,
        validationSchema: signupSchema,
        onSubmit: (values) => {
            sendDataToServer(values)
            console.log(values);
        }
    })
    return (
        <>
            <h1 className="text-center mt-4">Sign up</h1>
            <div className="container mb-5 mt-4">
                <div className="row">

                    <div className="offset-lg-1 col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center  ps-lg-5 psm-md-3"  style={{maxWidth:"550px"}}>

                        <TextField id="outlined-basic" name="name" label="Full Name" variant="outlined" className='w-100 my-3' style={{ maxWidth: "500px" }} autoComplete='off' error={errors.name && touched.name}
                            helperText={errors.name && touched.name ? errors.name : ""} onChange={handleChange} />

                        <TextField type='email' id="outlined-basic" name="email" label="Email" variant="outlined" className='w-100 my-3' style={{ maxWidth: "500px" }} autoComplete='off' error={errors.email && touched.email}
                            helperText={errors.email && touched.email ? errors.email : ""} onChange={handleChange} />

                        <TextField type='tel' id="outlined-basic" name="phone" label="Phone number" variant="outlined" className='w-100 my-3' style={{ maxWidth: "500px" }} autoComplete='off' error={errors.phone && touched.phone}
                            helperText={errors.phone && touched.phone ? errors.phone : ""} onChange={handleChange} />

                        <TextField id="outlined-basic" label="Password" variant="outlined" className='w-100 my-3' name="password" type='password' error={errors.password && touched.password}
                            helperText={errors.password && touched.password ? errors.password : ""} style={{ maxWidth: "500px" }} autoComplete='off' onChange={handleChange} />

                        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" className='w-100 my-3' name="cpass" type='text' style={{ maxWidth: "500px" }} autoComplete='off' error={errors.cpass && touched.cpass}
                            helperText={errors.cpass && touched.cpass ? errors.cpass : ""} onChange={handleChange} />
                        
                            <Link href="/login" className="d-block text-decoration-none text-danger text-center " style={{ fontSize: "1.2rem" }}>Already Have An Account ?</Link>

                        
                        <button className="align-self-end btn btn-danger px-4 rounded  mt-3 fs-5 px-5"  onClick={handleSubmit}>Signup</button>
                    </div>
                    <div className="col-md-6 d-md-block d-none ps-5">
                        <img src="signup.svg" alt="" className="mt-5 img-fluid d-block mx-auto " style={{ maxHeight: "47vh" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default signup