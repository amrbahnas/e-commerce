import React from "react";
import styles from "./Offers.module.css";
const Offers = ({ images, title }) => {
  const allImages = images.map((img, indx) => {
    return (
      <div
        className={`${styles.img} flex-1 rounded-md overflow-hidden`}
        key={indx}
      >
        <img src={img} alt="" className="w-full h-full" />
      </div>
    );
  });
  return (
    <div className="offers h-fit my-8 ">
      <div className="theContainer">
        <div className="offerWrapper bg-white rounded-md cursor-pointer">
          {title && <h2 className="p-6 capitalize font-bold text-3xl">{title}</h2>}
          <div className="offersWrapper flex gap-2 flex-wrap">{allImages}</div>
        </div>
      </div>
    </div>
  );
};

export default Offers;
