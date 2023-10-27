import React, { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useFormik } from 'formik'
import profileSchema from '@/schema/profile'
import Loader from '@/components/Loader'


function index() {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL
    const loginData = useSelector((state) => state.login)
    const initval = { name: "", email: "", phone: "", address: "" }
    const [isLoading, setLoading] = useState(false)
    const sendDataToServer = async (value) => {
        setLoading(true)
        const data = await fetch(`${url}/user/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": loginData.id
            },
            body: JSON.stringify(value)
        })
        const parsedData = await data.json()

        if (parsedData.success) {
            getUser()
            toast.success(parsedData.message)
        } else {
            toast.error(parsedData.message)
        }
        setLoading(false)
    }
    const { values, handleChange, handleSubmit, errors, touched, setFieldValue } = useFormik({
        initialValues: initval,
        validationSchema: profileSchema,
        onSubmit: (value) => {
            sendDataToServer(value)
        }
    })
    const getUser = async () => {
        if (loginData.id == "") {
            return
        }
        setLoading(true)
        setTimeout(async() => {
            const data = await fetch(`${url}/user/getuser`, {
                headers: {
                    "auth-token": loginData.id
                }
            })
            const parsedData = await data.json()
            console.log(parsedData);
            if (parsedData.success) {
                console.log(parsedData)
                setFieldValue("name", parsedData.user.name)
                setFieldValue("email", parsedData.user.email)
                setFieldValue("phone", parsedData.user.phone)
                setFieldValue("address", parsedData.user.address)
                // updateData(parsedData.user)
            } else {
                toast.error(parsedData.message)
            }
            setLoading(false)
        }, 800)

    }

    useEffect(() => {
        getUser()
    }, [loginData])
    return (
        <>
            {isLoading && <Loader />}
            {!isLoading && <div className="container mt-md-5 mt-3 mb-3">
                <h2 className="text-start">My Account : </h2>

                <div className="row mt-4">
                    <div className="col-md-4">
                        <TextField id="outlined-basic" label="Name" variant="outlined" className="w-100" name="name" value={values.name} onChange={handleChange} />
                    </div>
                    <div className="col-md-4">
                        <TextField id="outlined-basic" label="Email" variant="outlined" className="w-100" type='email' error={errors.email && touched.email} helperText={errors.email && touched.email ? errors.email : ""} name="email" onChange={handleChange} value={values.email} />
                    </div>
                    <div className="col-md-4">
                        <TextField id="outlined-basic" label="Phone" variant="outlined" className="w-100" type='tel' error={errors.phone && touched.phone} helperText={errors.phone && touched.phone ? errors.phone : ""} name="phone" onChange={handleChange} value={values.phone} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-12">
                        <TextField id="outlined-basic" label="Shipping Address" variant="outlined" className="w-100" name='address' value={values.address} rows={4} type='text' error={errors.address && touched.address} helperText={errors.address && touched.address ? errors.address : ""} onChange={handleChange} multiline={true} />
                    </div>
                </div>
                <button type="button" className="mt-3 rounded btn btn-danger px-4 fs-5 ms-auto d-block" onClick={handleSubmit}>Submit</button>
            </div>}
        </>
    )
}

export default index