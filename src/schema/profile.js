import * as Yup from "yup";

const profileSchema = Yup.object({
    name:Yup.string().required("Name is Required Field."),
    email:Yup.string().required("Email is required Field.").email(),
    phone:Yup.string().required("Phone is required Field.").length(10),
    address:Yup.string().required("Address is required Field.").min(10)
})

export default profileSchema;