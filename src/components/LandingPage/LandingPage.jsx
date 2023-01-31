import React from "react";
import styles from "./LandingPage.module.css";
// import CardSlider from "./../CardSlider/CardSlider";
import LandingSlider from "./../LandingSlider/LandingSlider";
const LandingPage = () => {
  const images = [
    "assets/landing/landing3.webp",
    "assets/landing/landing2.webp",
    "assets/3.jpg",
    "assets/landing/landing1.webp",
    "assets/1.jpg",
    "assets/2f2439c4-fd71-44d3-b302-94216df147b0.jpg",
  ];
  return (
    <div className={`${styles.LandingPage}  mt-24 `}>
      <div className="theContainer h-full">
        <div
          className={`${styles.wrapper} h-full grid grid-cols-3 grid-rows-3 gap-2`}
        >
          <div className=" col-start-1 col-span-3 md:col-span-2 row-start-1 row-span-2 rounded-md overflow-hidden ">
            <LandingSlider images={images} />
          </div>
          <div className="  col-end-4 col-span-1 row-start-1 row-span-1 hidden md:flex gap-2 ">
            <div className=" rounded-md overflow-hidden ">
              <img
                src={"assets/ar_dk_eg-explore-03.avif"}
                alt=""
                className="h-full object-fill"
              />
            </div>
            <div className=" rounded-md overflow-hidden">
              <img
                src={"assets/ar_dk_eg-mega-03.avif"}
                alt=""
                className="h-full object-fill"
              />
            </div>
          </div>
          <div className="col-end-4 col-span-1 row-start-2 row-span-1 rounded-md overflow-hidden hidden md:block">
            <img
              src={"assets/ar_dk_eg-top-01.avif"}
              alt=""
              className="min-h-full object-fill"
            />
          </div>
          <div className="col-start-1 col-span-3 row-start-3 row-span-1 flex gap-2  h-48 ">
            <div className=" rounded-md overflow-hidden flex-1 ">
              <img
                src={"assets/ar_dk_eg-top-01.gif"}
                alt=""
                className=" h-full w-full  object-fill "
              />
            </div>
            <div className="rounded-md overflow-hidden  hidden md:block flex-1">
              <img
                src={"assets/en_dk_eg-top-01.avif"}
                alt=""
                className=" h-full w-full object-fill"
              />
            </div>
            <div className=" rounded-md overflow-hidden flex-1">
              <img
                src={"assets/Offer-Discounts.jpg"}
                alt=""
                className=" h-full w-full object-fill "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
