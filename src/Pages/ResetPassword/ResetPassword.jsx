import React, { useState } from "react";
import { resetPassword } from "../../Firebase/Auth";
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
          position: "bottom-right",
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
          position: "bottom-right",
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
        <div className="flex items-center justify-center h-screen bg-white ">
          <form
            className="flex flex-col justify-center gap-10 p-10 mb-3 border rounded-lg shadow-lg md:w-8/12 lg:w-5/12 lg:ml-20 h-80"
            onSubmit={(e) => sendMailHandler(e)}
          >
            <span
              for="exampleEmail0"
              className="inline-block mb-2 text-lg font-bold text-center text-gray-700 "
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
              className="inline-block w-full py-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out bg-blue-600 rounded shadow-md px-7 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg"
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
