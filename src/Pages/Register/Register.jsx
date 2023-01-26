import React from "react";
import { Link } from "react-router-dom";
const Register = () => {
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
                    alt="Phone image"
                  />
                </div>

                <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                  <form>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group mb-6">
                        <input
                          type="text"
                          className="form-control
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
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleInput123"
                          aria-describedby="emailHelp123"
                          placeholder="First name"
                        />
                      </div>
                      <div className="form-group mb-6">
                        <input
                          type="text"
                          className="form-control
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
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleInput124"
                          aria-describedby="emailHelp124"
                          placeholder="Last name"
                        />
                      </div>
                    </div>
                    <div className="form-group mb-6">
                      <input
                        type="email"
                        className="form-control block
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
                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInput125"
                        placeholder="Email address"
                      />
                    </div>
                    <div className="form-group mb-6">
                      <input
                        type="password"
                        className="form-control block
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
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="exampleInput126"
                        placeholder="Password"
                      />
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
                      type="button"
                      className="
                        w-full
                        px-6
                        py-2.5
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
                      <Link to="/">Sign up</Link>
                    </button>
                  </form>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    have an account?
                    <Link
                      to="/login"
                      href="#!"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
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
    </div>
  );
};

export default Register;
