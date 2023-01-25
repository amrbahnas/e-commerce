import React from "react";
import Slider from "../../components/Slider/Slider";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import "./Home.css";
import Categories from "./../../components/Categories/Categories";
import Contact from "../../components/Contact/Contact";
import LandingPage from './../../components/LandingPage/LandingPage';
import Offers from './../../components/Offers/Offers';


const Home = () => {
  return (
    <div className="home ">
      <LandingPage/>
      <FeaturedProducts title="featured products" type="featured" />
  {/*<Categories Categories />*/}
      <FeaturedProducts title="trending products" type="trending" />
      <Offers/>
      <FeaturedProducts title="popular products" type="normal" />
      <Contact />
    </div>
  );
};

export default Home;
