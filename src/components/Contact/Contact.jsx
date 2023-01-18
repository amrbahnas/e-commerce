import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";
const Contact = () => {
  return (
    <div className="contact w-full bg-blue-700">
      <div className="theContainer flex flex-col gap-4 sm:flex-row justify-between py-5 items-center">
        <p className="text-white capitalize font-bold text-lg">
          be in toch with us
        </p>
        <div className="emailBar">
          <input
            type="email"
            name="email"
            placeholder="enter your email"
            className="px-3 py-2 placeholder:capitalize focus:outline-none rounded-l-md"
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
  );
};

export default Contact;
