import * as Yup from "yup";

const loginSchema = Yup.object({
    email:Yup.string().required().email(),
    password:Yup.string().required().min(8).max(16)
})

export default loginSchema