import React from 'react'
import { TextField } from '@mui/material'
import { useFormik } from 'formik';
import loginSchema from '@/schema/login';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { login } from '@/redux/features/loginSlice';
import { useDispatch } from 'react-redux';
function loginPage() {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const router = useRouter()
    const dispatch = useDispatch()
    const initalValues = {
        email: "",
        password: ""
    }
    const sendDataToServer = async (values) => {
        const data = await fetch(`${url}/user/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            })
        })
        const parsedData = await data.json()
        console.log(parsedData);
        if (parsedData.success) {
            toast.success(parsedData.message);
            localStorage.setItem("ss-auth-token",parsedData.token)
            dispatch(login(parsedData.token))
            router.push("/")
        } else {
            toast.error(parsedData.message)
        }
    }
    const { touched, errors, handleChange, handleSubmit } = useFormik({
        validationSchema: loginSchema,
        initialValues: initalValues,
        onSubmit: (value) => {
            sendDataToServer(value)
            console.log(value);
        }
    })
    return (
        <>
            <h1 className="text-center mt-4">Login</h1>
            <div className="container mb-5 mt-4">
                <div className="row">

                    <div className="offset-lg-1 col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center mb-5" style={{maxWidth:"550px"}}>


                        <TextField type='text' id="outlined-basic" label="Email" variant="outlined" className='w-100 my-3'  autoComplete='off' name='email' onChange={handleChange} error={errors.email && touched.email} helperText={errors.email && touched.email ? errors.email : ""} />



                        <TextField id="outlined-basic" label="Password" variant="outlined" className='w-100 my-3' type='password'  autoComplete='off' name='password' onChange={handleChange} error={errors.password && touched.password} helperText={errors.password && touched.password ? errors.password : ""} />

                        
                            <Link href="/signup" className="d-block text-decoration-none text-danger text-center  me-md-0 me-3" style={{ fontSize: "1.2rem" }}>Don't Have an Account?</Link>
                        

                        <button className="align-self-end mt-4 btn btn-danger rounded mt-3 fs-5 px-5"  onClick={handleSubmit}>Login</button>
                    </div>
                    <div className="col-md-6 d-md-block d-none">
                        <img src="login.svg" alt="" className="mt-5 img-fluid d-block mx-auto" style={{ maxHeight: "47vh" }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default loginPage