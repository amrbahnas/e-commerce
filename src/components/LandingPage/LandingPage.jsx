import React,{useEffect} from "react";
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
      <div className="h-full theContainer">
        <div
          className={`${styles.wrapper} h-full grid grid-cols-3 grid-rows-3 gap-2`}
        >
          <div className="col-span-3 col-start-1 row-span-2 row-start-1 overflow-hidden rounded-md md:col-span-2">
            <LandingSlider
              images={images}
              autoplay={true}
              SPV1={1}
              SPV2={1}
              SPV3={1}
              SPV4={1}
            />
          </div>
          <div className="hidden col-span-1 col-end-4 row-span-1 row-start-1 gap-2 md:flex">
            <div className="overflow-hidden rounded-md ">
              <img
                src={"assets/ar_dk_eg-explore-03.avif"}
                alt=""
                className="object-fill h-full skeleton"
              />
            </div>
            <div className="overflow-hidden rounded-md ">
              <img
                src={"assets/ar_dk_eg-mega-03.avif"}
                alt=""
                className="object-fill h-full skeleton"
              />
            </div>
          </div>
          <div className="hidden col-span-1 col-end-4 row-span-1 row-start-2 overflow-hidden rounded-md md:block">
            <img
              src={"assets/ar_dk_eg-top-01.avif"}
              alt=""
              className="object-fill min-h-full skeleton"
            />
          </div>
          <div className="flex h-48 col-span-3 col-start-1 row-span-1 row-start-3 gap-2 ">
            <div className="flex-1 overflow-hidden rounded-md ">
              <img
                src={"assets/ar_dk_eg-top-01.gif"}
                alt=""
                className="object-fill w-full h-full skeleton"
              />
            </div>
            <div className="flex-1 hidden overflow-hidden rounded-md md:block">
              <img
                src={"assets/en_dk_eg-top-01.avif"}
                alt=""
                className="object-fill w-full h-full skeleton "
              />
            </div>
            <div className="flex-1 overflow-hidden rounded-md ">
              <img
                src={"assets/Offer-Discounts.jpg"}
                alt=""
                className="object-fill w-full h-full skeleton "
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
