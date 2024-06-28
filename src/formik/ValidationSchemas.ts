import * as Yup from "yup";

/**
 * Signup Validations
 */
export const clientFormValidationSchema = Yup.object({
  email: Yup.string()
    .required("This field is required.")
    .email("Invalid email address."),
  name: Yup.string().required("This field is required."),
  cin: Yup.string()
    .required("This field is required.")
    .matches(/^\d+$/, "Field must be numeric.")
    .min(21, "Field must be exactly 21 digits")
    .max(21, "Field must be exactly 21 digits"),
  pin: Yup.string()
    .required("This field is required.")
    .matches(/^\d+$/, "Field must be numeric.")
    .min(6, "Field must be exactly 6 digits")
    .max(6, "Field must be exactly 6 digits"),
});
