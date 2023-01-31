import React from "react";
import Slider from "../../components/Slider/Slider";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import "./Home.css";
import Categories from "./../../components/Categories/Categories";
import Contact from "../../components/Contact/Contact";
import LandingPage from "./../../components/LandingPage/LandingPage";
import Offers from "./../../components/Offers/Offers";
import MoreOffers from "../../components/MoreOffers/MoreOffers";

const Home = () => {
  const imgsOfferOne = ["assets/offerOne.avif"];
  const imgsOfferTwo = ["assets/offerTwo.avif"];
  const imgsOfferThree = ["assets/offerThree.avif"];
  const imgsOfferFour = ["assets/offerFour.avif"];
  return (
    <div className="home ">
      <LandingPage />
      <FeaturedProducts title="featured products" type="featured" />
      <Offers images={imgsOfferThree} />
      <Categories Categories />
      <MoreOffers/>
      <Offers images={imgsOfferFour} />
      <FeaturedProducts title="trending products" type="trending" />
      <Offers images={imgsOfferOne} />
      <FeaturedProducts title="popular products" type="normal" />
      <Offers images={imgsOfferTwo} title={"smart watches deals"} />

      <Contact />
    </div>
  );
};

export default Home;
