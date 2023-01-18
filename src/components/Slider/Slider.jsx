import React, { useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import "./Slider.css";
const Slider = () => {
  const data = [
    "https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/837140/pexels-photo-837140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  const [photoIndex, SetPhotoIndex] = useState(0);
  const prevSlide = () => {
    SetPhotoIndex(photoIndex === 0 ? 2 : (prev) => prev - 1);
  };
  const nextSlide = () => {
    SetPhotoIndex(photoIndex === 2 ? 0 : (prev) => prev + 1);
  };

  return (
    <div className="slider">
      <div
        className="images"
        style={{ transform: `translateX(${-photoIndex * 100}vw)` }}
      >
        <img src={data[0]} alt="" />
        <img src={data[1]} alt="" />
        <img src={data[2]} alt="" />
      </div>
      <div className="icons">
        <div className="icon" onClick={prevSlide}>
          <NavigateBeforeIcon />
        </div>
        <div className="icon" onClick={nextSlide}>
          <NavigateNextIcon />
        </div>
      </div>
    </div>
  );
};

export default Slider;
