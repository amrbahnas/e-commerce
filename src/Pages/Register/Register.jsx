import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useSelector } from "react-redux";
import { signup, signupUserName } from "../../Firebase/Auth";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPass, setCheckPass] = useState(false);
  // check if user is already logged in
  const { login } = useSelector((store) => store.AuthSlice);
  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login]);

  /// control eye icon
  const [showHiddenPassword, setShowHiddenPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const passwordField = useRef();
  const showHiddenPasswordHandler = () => {
    setShowHiddenPassword((prev) => !prev);
    const type =
      passwordField.current.getAttribute("type") === "password"
        ? "text"
        : "password";
    passwordField.current.setAttribute("type", type);
  };

  const formHandler = (e) => {
    e.preventDefault();
    signup(email, password)
      .then((user) => {
        signupUserName(user.user, { displayName: firstName + " " + lastName });
        setCheckEmail(false);
        setCheckPass(false);
        // nave to success  page
          navigate("/user/successaccount", false); 
      })
      .catch((error) => {
        if (error.message.includes("email")) {
          setCheckEmail(true);
          setCheckPass(false);
        } else {
          setCheckPass(true);
          setCheckEmail(false);
        }
      });
    // Navigate("/login", true);
  };
  return (
    <div className="loginPage h-screen">
      <div className="theContainer">
        <div className="loginPage h-screen flex items-center justify-center">
          <section className="h-screen">
            <div className="container px-6 py-12 h-full">
              <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    className="w-full"
                    alt="Register"
                  />
                </div>

                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                  <form onSubmit={(e) => formHandler(e)}>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group mb-6">
                        <input
                          type="text"
                          className="form-control
                          block
                          w-full
                          px-4
                          py-3
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleInput123"
                          aria-describedby="emailHelp123"
                          placeholder="First name"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="form-group mb-6">
                        <input
                          type="text"
                          className="form-control
                          block
                          w-full
                          px-4
                          py-3
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid border-gray-300
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleInput124"
                          aria-describedby="emailHelp124"
                          placeholder="Last name"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-6">
                      {checkEmail && (
                        <span className=" block text-red-700 pb-2">
                          The Emain Is already Used.
                        </span>
                      )}
                      <input
                        type="email"
                        className={`
                        ${checkEmail ? " border-red-700" : "border-gray-300"}
                        form-control block
                          w-full
                          px-4
                          py-3
                          text-base
                          font-normal
                          text-gray-700
                          bg-white bg-clip-padding
                          border border-solid
                          rounded
                          transition
                          ease-in-out
                          m-0
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                        id="exampleInput125"
                        placeholder="Email address"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group mb-6">
                      {checkPass && (
                        <span className=" block text-red-700 pb-2">
                          Password shoud be at least 6 characters
                        </span>
                      )}
                      <div className="relative">
                        {showIcon ? (
                          showHiddenPassword ? (
                            <VisibilityIcon
                              className="absolute right-4 top-3 text-lg cursor-pointer"
                              onClick={(e) => showHiddenPasswordHandler()}
                            />
                          ) : (
                            <VisibilityOffIcon
                              className="absolute right-4 top-3 text-lg cursor-pointer"
                              onClick={(e) => showHiddenPasswordHandler()}
                            />
                          )
                        ) : null}
                        <input
                          type="password"
                          ref={passwordField}
                          className={`
                        ${checkPass ? " border-red-700" : "border-gray-300"}
                        form-control block
                        w-full
                        px-4
                          py-3
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding
                        border border-solid 
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                          id="exampleInput126"
                          placeholder="Password"
                          required
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          onFocus={(e) => setShowIcon(true)}
                        />
                      </div>
                    </div>
                    <div className="form-group form-check text-center mb-6">
                      <input
                        type="checkbox"
                        className="form-check-input h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                        id="Subscribe"
                      />
                      <label
                        className="form-check-label inline-block text-gray-800"
                        htmlFor="Subscribe"
                      >
                        Subscribe to our newsletter
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="
                        w-full
                        px-7
                        py-3
                        bg-blue-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
                    >
                      Sign up
                    </button>
                  </form>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    have an account?
                    <Link
                      to="/user/login"
                      href="#!"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out hover:underline"
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
