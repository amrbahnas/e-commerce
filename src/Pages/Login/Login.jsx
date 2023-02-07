import React, { useState, useEffect, useRef } from "react";
// react router
import { Link, useNavigate } from "react-router-dom";
// toest
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// firebase
import { signIn } from "../../Firebase/Auth";
import { dowunloadImage } from "../../Firebase/Store.js";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setLoginState, setAdminState } from "../../store/AuthSlice.js";
import {
  setTheEmail,
  setTheUserName,
  setPhotoURL,
  setUserImage,
} from "../../store/userSlice.js";

const Login = () => {
  // initialize
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //  check validation states
  const [emailSub, setEmailSub] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkEmailEnable, setCheckEmailEnable] = useState(false);
  const [checkPass, setCheckPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // get login state
  const { login } = useSelector((store) => store.AuthSlice);
  // user cant access this page if he has login
  useEffect(() => {
    if (login) {
      navigate("/");
    }
  }, [login, navigate]);
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
  // on click login
  const formHandler = (e) => {
    e.preventDefault();
    //start login function
    signIn(email, password)
      .then((res) => {
        ///// login success /////
        // if user is admin
        if (res.user.email === "admin@store.com") {
          // turn on admin permissions
          dispatch(setAdminState(true));
        } else {
          // turn of admin permissions
          dispatch(setAdminState(false));
        }

        //store ALL user info to global store
        dispatch(setLoginState(true));
        dispatch(setTheEmail(res.user.email));
        dispatch(setTheUserName(res.user.displayName));
        // get and store personal user img
        const url = res.user.photoURL;
        if (url) {
          dispatch(setPhotoURL(url));
          // if user has img ,dowunload it
          dowunloadImage("users-profiles-images/" + url).then((img) => {
            dispatch(setUserImage(img));
          });
        } else {
          // if user hasn`t img ,dowunload defualt img
          dowunloadImage("users-profiles-images/default-user-image.png").then(
            (img) => {
              dispatch(setUserImage(img));
            }
          );
        }
        //reset check validation values
        setCheckEmail(false);
        setCheckPass(false);
        //message for successful login
        toast.success("login", {
          position: "bottom-right",
          autoClose: 1200,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        //end message
        // go to home page
        navigate(-1, { replace: false });
      })
      .catch((error) => {
        ///// invalied info /////
        if (error.message.includes("user-not-found")) {
          // if enterd email is not subscribed
          setEmailSub(true);
          setCheckEmail(false);
          setCheckPass(false);
          setCheckEmailEnable(false);
        } else if (error.message.includes("email")) {
          // if enterd email is already used
          setEmailSub(false);
          setCheckEmail(true);
          setCheckPass(false);
          setCheckEmailEnable(false);
        } else if (error.message.includes("password")) {
          // if enterd password is wrong
          setEmailSub(false);
          setCheckEmail(false);
          setCheckPass(true);
          setCheckEmailEnable(false);
        } else {
          // if enterd email has been blocked
          console.log("Error: " + error.message);
          setEmailSub(false);
          setCheckEmail(false);
          setCheckPass(false);
          setCheckEmailEnable(true);
        }
      });
  };
  return (
    <div className="h-screen loginPage">
      <div className="theContainer">
        <div className="flex items-center justify-center h-screen loginPage">
          <section className="h-screen">
            <div className="container h-full px-6 py-12">
              <div className="flex flex-wrap items-center justify-center h-full text-gray-800 g-6">
                <div className="mb-12 md:w-8/12 lg:w-6/12 md:mb-0">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                    className="w-full"
                    alt="login"
                  />
                </div>
                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                  <form onSubmit={(e) => formHandler(e)}>
                    <div className="mb-6">
                      {emailSub && (
                        <span className="block pb-2 text-red-700 ">
                          Invalid Email
                        </span>
                      )}
                      {checkEmail && (
                        <span className="block pb-2 text-red-700 ">
                          The Emain that you've entered is incorrect.
                        </span>
                      )}
                      {checkEmailEnable && (
                        <span className="block pb-2 text-red-700 ">
                          Sorry Your Email has been Blocked.
                        </span>
                      )}

                      <input
                        type="text"
                        className={`${
                          checkEmail || checkEmailEnable || emailSub
                            ? " border-red-700"
                            : "border-gray-300"
                        } form-control block w-full px-4 py-3 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid     rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                        placeholder="Email address"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>

                    <div className="mb-6">
                      {checkPass && (
                        <span className="block pb-2 text-red-700 ">
                          The Password that you've entered is incorrect.
                        </span>
                      )}
                      <div className="relative">
                        {showIcon ? (
                          showHiddenPassword ? (
                            <VisibilityIcon
                              className="absolute text-lg cursor-pointer right-4 top-3"
                              onClick={(e) => showHiddenPasswordHandler()}
                            />
                          ) : (
                            <VisibilityOffIcon
                              className="absolute text-lg cursor-pointer right-4 top-3"
                              onClick={(e) => showHiddenPasswordHandler()}
                            />
                          )
                        ) : null}
                        <input
                          type="password"
                          ref={passwordField}
                          className={`${
                            checkPass ? " border-red-700" : "border-gray-300"
                          } form-control block w-full px-4 py-3 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
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

                    <div className="flex items-center justify-between mb-6">
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm cursor-pointer form-check-input checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
                          id="rememberCheck"
                          // checked
                        />
                        <label
                          className="inline-block text-gray-800 cursor-pointer form-check-label"
                          htmlFor="rememberCheck"
                        >
                          Remember me
                        </label>
                      </div>
                      <span className="text-blue-600 transition duration-200 ease-in-out cursor-pointer hover:text-blue-700 hover:underline focus:text-blue-700 active:text-blue-800">
                        <Link to="/resetpassword">Forgot password?</Link>
                      </span>
                    </div>

                    <button
                      type="submit"
                      className="inline-block w-full py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      Sign in
                    </button>

                    <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                      <p className="mx-4 mb-0 font-semibold text-center">OR</p>
                    </div>

                    <a
                      className="flex items-center justify-center w-full py-3 mb-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md bg-backgroundAColor px-7 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                      href="#!"
                      role="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 512"
                        className="w-3.5 h-3.5 mr-2"
                      >
                        <path
                          fill="currentColor"
                          d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
                        />
                      </svg>
                      Continue with Facebook
                    </a>
                    <a
                      className="flex items-center justify-center w-full py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md bg-backgroundAColor2 px-7 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                      href="#!"
                      role="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-3.5 h-3.5 mr-2"
                      >
                        <path
                          fill="currentColor"
                          d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                        />
                      </svg>
                      Continue with Twitter
                    </a>
                  </form>
                  <p className="pt-1 mt-2 mb-0 text-sm font-semibold">
                    Don't have an account?
                    <Link
                      to="/user/Register"
                      href="#!"
                      className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700 hover:underline"
                    >
                      Register
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

export default Login;
