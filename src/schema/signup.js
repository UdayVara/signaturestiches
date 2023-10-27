import * as Yup from "yup";

const signupSchema = Yup.object({
    name:Yup.string().required("Name is Required Field."),
    email:Yup.string().required("Email is required Field.").email(),
    phone:Yup.string().required("Phone is required Field.").length(10),
    password:Yup.string().required("Password is required Field").min(8,"Range of password must be between 8 to 16").max(16,"Range of password must be between 8 to 16"),
    cpass:Yup.string().required("Confirm Password is Required Field").oneOf([Yup.ref('password'),null],"Both Passwords must be same.")
})

export default signupSchema;