import React, { useState } from "react";
import { resetPassword } from "../../Firebase/index";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const sendMailHandler = (e) => {
    e.preventDefault();
    resetPassword(email)
      .then(() => {
        // Password reset email sent!
        toast.success("Password reset email sent! Check Your Email Box", {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate(-1);
        }, 3700);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 1200,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };
  return (
    <div className="resetPassword">
      <div classNamee="thecontainer">
        <div className="flex justify-center items-center h-screen bg-white  ">
          <form
            className="mb-3  md:w-8/12 lg:w-5/12 lg:ml-20 border h-80 flex flex-col justify-center gap-10 p-10 shadow-lg rounded-lg"
            onSubmit={(e) => sendMailHandler(e)}
          >
            <span
              for="exampleEmail0"
              className=" text-lg font-bold inline-block mb-2 text-gray-700 text-center"
            >
              Enter Your Email
            </span>
            <input
              type="email"
              className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            "
              id="exampleEmail0"
              placeholder="Email input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;
