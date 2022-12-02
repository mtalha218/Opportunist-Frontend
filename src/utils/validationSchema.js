import * as Yup from "yup";
export const forgetSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid Email Address"
    )
    .required("Email is Required"),
});

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid Email Address"
    )
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "Invalid Email Address"
    )
    .required("Email is Required"),
  password: Yup.string().required("Password is Required"),
  username: Yup.string().required("Username is Required"),
  firstName: Yup.string().required("First Name is Required"),
  lastName: Yup.string().required("LastName is Required"),
});
export const resetSchema = Yup.object().shape({
  confirmPassword: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

export const buyerSchema = Yup.object().shape({
  category: Yup.string().required("Category is Required"),
  title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Project Description is Required"),
  deliveryTime: Yup.string().required("Delivery is Required"),
  price: Yup.string().required("Price is Required"),
});
export const ResponseSchema = Yup.object().shape({
  revision: Yup.string().required("Revision is Required"),
  // title: Yup.string().required("Title is Required"),
  description: Yup.string().required("Project Description is Required"),
  deliveryTime: Yup.string().required("Delivery is Required"),
  price: Yup.string().required("Price is Required"),
});
