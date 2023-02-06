import React from "react";
// icons
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";
const Contact = () => {
  /************************************* DOM ************************************************** */
  return (
    <div className="w-full contact bg-amr" id="contact">
      <div className="theContainer">
        <div className="flex flex-col items-center justify-between w-full gap-4 py-5 contactWrapper md:flex-row">
          <p className="text-lg font-bold text-white capitalize">
            be in toch with us
          </p>
          <div className="flex justify-center w-full emailBar md:w-96">
            <input
              type="email"
              name="email"
              placeholder="enter your email"
              className="flex-1 px-3 py-2 placeholder:capitalize focus:outline-none rounded-l-md"
            />
            <button className="p-2 text-white capitalize bg-black rounded-r-md">
              join us
            </button>
          </div>
          <div className="flex gap-2 text-white socialBar">
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
