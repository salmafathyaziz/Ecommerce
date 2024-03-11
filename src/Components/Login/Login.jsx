import { useState, useContext } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  // el login howa ely hay3mel set leluser token
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  //defualt is false
  const [isLoading, setIsLoading] = useState(false);

  async function callLogin(requestBody) {
    setErrorMessage("");
    setIsLoading(true);

    //hakhod eldata w aklem elapi
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, requestBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
    console.log(data); //law kolo tmam hatla3 success
    if (data.message == "success") {
      // login
      setIsLoading(false);
      localStorage.setItem('userToken', data.token);
      setUserToken(data.token);

      navigate("/home");
    }
  }

  let validateSchema = Yup.object({
    email: Yup.string().email("email is invalid").required("email is required"),

    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "Password starts with uppercase")
      .required("password is required"),
  });

  let LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validateSchema,
    onSubmit: callLogin,
  });

  return (
    <>
<Helmet>
                
                <title>Login</title>
              
            </Helmet>



      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Login Now: </h2>
        {errorMessage ? (
          <div className="alert alert-danger"> {errorMessage} </div>
        ) : null}

        <form onSubmit={LoginForm.handleSubmit}>
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
              value={LoginForm.values.email}
              onChange={LoginForm.handleChange}
              onBlur={LoginForm.handleBlur}
            ></input>

            {LoginForm.errors.email && LoginForm.touched.email ? (
              <div className="alert alert-danger">
                {" "}
                {LoginForm.errors.email}
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
              value={LoginForm.values.password}
              onChange={LoginForm.handleChange}
              onBlur={LoginForm.handleBlur}
            ></input>

            {LoginForm.errors.password && LoginForm.touched.password ? (
              <div className="alert alert-danger">
                {" "}
                {LoginForm.errors.password}
              </div>
            ) : null}
          </div>

          {/* law fiha erroe aw matlmstsh */}
          <button className="btn bg-main text-white d-block ms-auto">
            {isLoading ? <i className="fa fa-spinner fa-spin "></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
