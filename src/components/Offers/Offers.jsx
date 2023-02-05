import React from "react";
import styles from "./Offers.module.css";
const Offers = ({ images, title }) => {
  const allImages = images.map((img, indx) => {
    return (
      <div
        className={`${styles.img} flex-1 rounded-md overflow-hidden`}
        key={indx}
      >
        <img src={img} alt="" className="w-full h-full skeleton" />
      </div>
    );
  });
  return (
    <div className="my-8 offers h-fit ">
      <div className="theContainer">
        <div className="bg-white rounded-md cursor-pointer offerWrapper">
          {title && <h2 className="p-6 text-3xl font-bold capitalize">{title}</h2>}
          <div className="flex flex-wrap gap-2 offersWrapper">{allImages}</div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
