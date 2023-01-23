import React from "react";
import styles from "./LandingPage.module.css";
import CardSlider from "./../CardSlider/CardSlider";
const LandingPage = () => {
  const images = [
    "assets/1.jpg",
    "assets/2.png",
    "assets/3.jpg",
  ];
  return (
    <div className={`${styles.LandingPage}  mt-24 `}>
      <div className="theContainer h-full">
        <div
          className={`${styles.wrapper} h-full grid grid-cols-3 grid-rows-3 gap-2`}
        >
          <div className=" col-start-1 col-span-3 md:col-span-2 row-start-1 row-span-2 rounded-md overflow-hidden ">
            <CardSlider
              images={images}
              paginationIs={true}
              scrollbarIs={false}
              NavigationIs={false}
              autoplayIs={false}
              spaceBetweenIs={1}
              slidesPerViewIs={1}
              breakpoints={1}
            />
          </div>
          <div className="  col-end-4 col-span-1 row-start-1 row-span-1 hidden md:flex gap-2 ">
            <div className=" rounded-md overflow-hidden ">
              <img
                src={
                  "https://eg.jumia.is/cms/Jan-23/UN's/Home-Appliances/Home9.jpg"
                }
                alt=""
                className="h-full object-cover"
              />
            </div>
            <div className=" rounded-md overflow-hidden">
              <img
                src={
                  "https://eg.jumia.is/cms/Jan-23/UN's/Home-Appliances/Home9.jpg"
                }
                alt=""
                className="h-full object-cover"
              />
            </div>
          </div>
          <div className="col-end-4 col-span-1 row-start-2 row-span-1 rounded-md overflow-hidden hidden md:block">
            <img
              src={
                "https://eg.jumia.is/cms/Jan-23/UN's/Home-Appliances/Home9.jpg"
              }
              alt=""
              className="min-h-full object-cover"
            />
          </div>
          <div className="col-start-1 col-span-3 row-start-3 row-span-1 flex gap-2">
            <div className=" rounded-md overflow-hidden ">
              <img
                src={
                  "https://eg.jumia.is/cms/Jan-23/UN's/Home-Appliances/Home9.jpg"
                }
                alt=""
                className="h-full lg:h-auto object-cover"
              />
            </div>
            <div className=" rounded-md overflow-hidden ">
              <img
                src={
                  "https://eg.jumia.is/cms/Jan-23/UN's/Home-Appliances/Home9.jpg"
                }
                alt=""
                className="h-full lg:h-auto object-cover"
              />
            </div>
            <div className="rounded-md overflow-hidden  hidden md:block">
              <img
                src={
                  "https://eg.jumia.is/cms/Jan-23/UN's/Home-Appliances/Home9.jpg"
                }
                alt=""
                className="h-full lg:h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
