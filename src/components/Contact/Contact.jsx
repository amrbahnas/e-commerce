import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";
const Contact = () => {
  return (
    <div className="contact w-full bg-amr" id="contact">
      <div className="theContainer">
        <div className="contactWrapper w-full flex flex-col gap-4 md:flex-row justify-between py-5 items-center">
          <p className="text-white capitalize font-bold text-lg">
            be in toch with us
          </p>
          <div className="emailBar flex justify-center w-full md:w-96">
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              className="px-3 py-2 placeholder:capitalize focus:outline-none rounded-l-md flex-1"
            />
            <button className="bg-black text-white capitalize p-2 rounded-r-md">
              join us
            </button>
          </div>
          <div className="socialBar text-white flex gap-2">
            <FacebookIcon />
            <InstagramIcon />
            <TwitterIcon />
            <GoogleIcon />
            <PinterestIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
