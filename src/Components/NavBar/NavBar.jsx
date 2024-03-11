import { useContext } from "react";
import styles from "./NavBar.module.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Assets/images/freshcart-logo.svg";

import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function NavBar() {


  let { userToken, setUserToken } = useContext(UserContext);

  let { numOfCartItems } = useContext(CartContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken", null);
    setUserToken(null);
    navigate("/login");
  }

  return (
    <>
      <nav className=" fixed-top navbar navbar-expand-lg bg-body-tertiary position-relative">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="fresh market logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
           

              {
                userToken !== null ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/wishlist">
                        wishlist
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">
                        cart
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link className="nav-link" to="/products">
                        Products
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/categories">
                        Categories
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/brands">
                        Brands
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                ) 
              }
            </ul>
          

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item   d-flex align-items-center">
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
              </li>

              {/* law howa logged in */}
              {userToken !== null ? (
                <>
                  <li className="nav-item position-relative">
                    <Link className="nav-link" to="/cart">
                      <i className="fas fa-cart-shopping text-secondary "></i>
                      <span className="bg-main text-white p-1 rounded position-absolute  w-75  start-50 bottom-50  end-0">
                        {" "}
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={() => logOut()}
                      className="nav-link cursor-pointer"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  {/* law msh logged in */}
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
