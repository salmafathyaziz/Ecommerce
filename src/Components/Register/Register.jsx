import React, { useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Register() {
  //progrmatic routing to route for the user automatically
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  //defualt is false
  const [isLoading, setIsLoading] = useState(false);


  async function callRegister(requestBody) {
    console.log(requestBody);
    setErrorMessage("");
    setIsLoading(true);

    //hakhod eldata w aklem elapi
    //request body is the data sent
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, requestBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
    console.log(data);
    //law kolo tmam hatla3 success
    if (data.message == "success") {
      // login

      navigate("/login");
    }
  }


  let validateSchema = Yup.object({
    name: Yup.string()
      .min(3, "name minLenght is 3")
      .max(10, "max lenght is 10")
      .required("name is required"),

    email: Yup.string().email("email is invalid").required("email is required"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password starts with uppercase")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword doesnt match ")
      .required("rePassword is required"),
      
    phone: Yup.string()
    .matches(/^01[0125][0-9]{8}$/, "phone number is invalid")
    .required("Phone is required"),

  });

  let registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    //if both have same name, you can write it once
    validationSchema: validateSchema,
    onSubmit: callRegister,
  });

  return (
    <>

<Helmet>
                
          <title>Register</title>
              
            </Helmet>

      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Register Now: </h2>
          {errorMessage ? ( <div className="alert alert-danger"> {errorMessage} </div>) : null}

        <form onSubmit={registerForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="fullName" className="mb-1">
              {" "}
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="name"
              // values dy ely ethat fiha el initial values
              className="form-control"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></input>

            {registerForm.errors.name && registerForm.touched.name ? (
              <div className="alert  alert-danger">
                {" "}
                {registerForm.errors.name}{" "}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="fullName" className="mb-1">
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="email"
              // values dy ely ethat fiha el initial values
              className="form-control"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></input>

            {registerForm.errors.email && registerForm.touched.email ? (
              <div className="alert alert-danger">
                {" "}
                {registerForm.errors.email}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="Password" className="mb-1">
              {" "}
              Passwrod
            </label>
            <input
              type="password"
              id="Passwrod"
              name="password"
              // values dy ely ethat fiha el initial values
              className="form-control"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></input>

            {registerForm.errors.password && registerForm.touched.password ? (
              <div className="alert alert-danger">
                {" "}
                {registerForm.errors.password}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="rePassword" className="mb-1">
              rePassword
            </label>
            <input
              type="password"
              id="rePassword"
              name="rePassword"
              // values dy ely ethat fiha el initial values
              className="form-control"
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></input>

            {registerForm.errors.rePassword &&
            registerForm.touched.rePassword ? (
              <div className="alert alert-danger">
                {" "}
                {registerForm.errors.rePassword}
              </div>
            ) : null}
          </div>

          <div className="form-group   mb-2">
            <label htmlFor="Phone" className="mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="Phone"
              name="phone"
              // values dy ely ethat fiha el initial values
              className="form-control"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
            ></input>

            {registerForm.errors.phone ? (
              <div className="alert alert-danger">
                {" "}
                {registerForm.errors.phone}
              </div>
            ) : null}
          </div>
          {/* law fiha error aw matlmstsh */}
          <button    disabled ={!(registerForm.isValid && registerForm.dirty)} className="btn bg-main text-white d-block ms-auto">
            {isLoading ? ( <i className="fa fa-spinner fa-spin "></i> ) : ("Register")}
          </button>
        </form>
      </div>
    </>
  );
}
