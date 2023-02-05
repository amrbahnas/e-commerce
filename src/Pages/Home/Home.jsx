import React from "react";
// import Slider from "../../components/Slider/Slider";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import "./Home.css";
import Categories from "./../../components/Categories/Categories";
import Contact from "../../components/Contact/Contact";
import LandingPage from "./../../components/LandingPage/LandingPage";
import Offers from "./../../components/Offers/Offers";
import MoreOffers from "../../components/MoreOffers/MoreOffers";
import LandingSlider from "../../components/LandingSlider/LandingSlider";
// import HelpChat from "../../components/HelpChat/HelpChat";

const Home = () => {
  const imgsOfferOne = ["assets/offerOne.avif"];
  const imgsOfferTwo = ["assets/offerTwo.avif"];
  const imgsOfferThree = ["assets/offerThree.avif"];
  const imgsOfferFour = ["assets/offerFour.avif"];
  const imgsOfferSclider = [
    "assets/landing/2.avif",
    "assets/landing/3.avif",
    "assets/landing/4.avif",
    "assets/landing/5.gif",
  ];
  const categoriesSliderImages = [
    "assets/landingCategories/1.avif",
    "assets/landingCategories/2.avif",
    "assets/landingCategories/3.avif",
    "assets/landingCategories/4.avif",
    "assets/landingCategories/5.avif",
    "assets/landingCategories/6.avif",
    "assets/landingCategories/7.avif",
    "assets/landingCategories/8.avif",
    "assets/landingCategories/9.avif",
    "assets/landingCategories/10.avif",
  ];

  return (
    <div className="home ">
      <LandingPage />
      <div className="my-8 theContainer">
        <LandingSlider
          images={categoriesSliderImages}
          SPV1={4}
          SPV2={6}
          SPV3={8}
          SPV4={10}
          autoplay={false}
        />
      </div>
      <FeaturedProducts title="trending products" type="trending" />
      <Offers images={imgsOfferThree} />
      <Categories Categories />
      <MoreOffers />
      <Offers images={imgsOfferFour} />
      <FeaturedProducts title="featured products" type="featured" />
      <div className="my-8 theContainer">
        <LandingSlider
          images={imgsOfferSclider}
          SPV1={1}
          SPV2={1}
          SPV3={1}
          SPV4={1}
          autoplay={true}
        />
      </div>
      <FeaturedProducts title="popular products" type="popular" />
      <Offers images={imgsOfferTwo} title={"smart watches deals"} />
      <Contact />
      {/* <HelpChat/> */}
    </div>
  );
};

export default Home;
