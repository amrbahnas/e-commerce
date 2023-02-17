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
import { signIn, facebookLogin, googleLogin } from "../../Firebase/Auth";
import { dowunloadImage } from "../../Firebase/Store.js";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setLoginState, setAdminState } from "../../store/AuthSlice.js";
import {
  setTheEmail,
  setTheUserName,
  setPhotoURL,
  setUserImage,
  resetUserOrders,
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
        dispatch(resetUserOrders());
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

  const facebookLoginHandler = () => {
    facebookLogin()
      .then((result) => {
        // The signed-in user info.
        const { displayName, email, photoUrl } = result.user.reloadUserInfo;
        console.log("🚀 ~ file: Login.jsx:146 ~ .then ~ photoUrl", photoUrl);
        dispatch(resetUserOrders());
        dispatch(setTheEmail(email));
        dispatch(setTheUserName(displayName));
        if (!photoUrl.includes("facebook")) {
          // if user has img ,dowunload it
          dispatch(setPhotoURL(photoUrl));
          dowunloadImage("users-profiles-images/" + photoUrl).then((img) => {
            dispatch(setUserImage(img));
          });
        } else {
          // if user hasn`t img ,dowunload defualt img
          dispatch(setUserImage(photoUrl));
        }
        dispatch(setLoginState(true));
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(
          "🚀 ~ file: Login.jsx:150 ~ facebookLoginHandler ~ errorMessage",
          errorMessage
        );
        // The email of the user's account used.
        const email = error.customData.email;
        console.log(
          "🚀 ~ file: Login.jsx:152 ~ facebookLoginHandler ~ email",
          email
        );
      });
  };
  // login with google account
  const googleLoginHandler = () => {
    googleLogin()
      .then((result) => {
        const { displayName, email, photoUrl } = result.user.reloadUserInfo;
        console.log("🚀 ~ file: Login.jsx:146 ~ .then ~ photoUrl", photoUrl);
        dispatch(resetUserOrders());
        dispatch(setTheEmail(email));
        dispatch(setTheUserName(displayName));
        if (!photoUrl.includes("google")) {
          // user change default img ,download it
          dispatch(setPhotoURL(photoUrl));
          dowunloadImage("users-profiles-images/" + photoUrl).then((img) => {
            dispatch(setUserImage(img));
          });
        } else {
          // if user hasn`t img ,dowunload defualt img
          dispatch(setUserImage(photoUrl));
        }
        dispatch(setLoginState(true));
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
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
                          className="inline-block text-gray-800 cursor-pointer dark:text-darkPText form-check-label"
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

                    <span
                      className="flex items-center justify-center w-full py-3 mb-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md bg-backgroundAColor px-7 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                      role="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={facebookLoginHandler}
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
                    </span>
                    <span
                      className="flex items-center justify-center w-full py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-green-500 rounded shadow-md px-7 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
                      role="button"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="light"
                      onClick={googleLoginHandler}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="48"
                        height="48"
                        viewBox="0 0 48 48"
                        className="w-4 h-4 mr-2"
                        >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        ></path>
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        ></path>
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        ></path>
                      </svg>
                      Continue with Google
                    </span>
                  </form>
                  <p className="pt-1 mt-2 mb-0 text-sm font-semibold dark:text-darkSText">
                    Don't have an account?
                    <Link
                      to="/user/Register"
                      href="#!"
                      className="text-red-600 transition duration-200 ease-in-out hover:text-red-700 focus:text-red-700 hover:underline dark:text-darkPText"
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
