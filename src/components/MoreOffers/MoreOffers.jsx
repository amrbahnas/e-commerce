import React from "react";
import styles from "./MoreOffers.module.css";
const MoreOffers = () => {
  const Box = ({ title, description, img }) => {
    return (
      <div className={`${styles.box}`}>
        <div className={`${styles.img}`}>
          <img src={img} alt="" className="skeleton" />
        </div>
        {title && (
          <div className={`${styles.footer}`}>
            <span>{title}</span>
            <span>{description}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`${styles.MoreOffers}`}>
      <div className="theContainer">
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.largeBox} dark:bg-darkCard bg-white`}>
            <div className={`${styles.title}`}>
              <span>More reason to shop</span>
            </div>
            <div className={`${styles.boxs}`}>
              <Box
                description={"Essentials at low Price"}
                img={"assets/more1.avif"}
              />
              <Box
                description={"Essentials at low Price"}
                img={"assets/more2.avif"}
              />
              <Box
                description={"Essentials at low Price"}
                img={"assets/more3.avif"}
              />
              <Box
                description={"Essentials at low Price"}
                img={"assets/more4.avif"}
              />
            </div>
          </div>
          <div className={`${styles.largeBox} dark:bg-darkCard bg-white`}>
            <div className={`${styles.title}`}>
              <span>Mega deals of the day</span>
            </div>
            <div className={`${styles.boxs}`}>
              <Box
                description={"Essentials at low Price"}
                img={"assets/more5.avif"}
              />
              <Box
                description={"Essentials at low Price"}
                img={"assets/more6.avif"}
              />
              <Box
                description={"Essentials at low Price"}
                img={"assets/more7.avif"}
              />
              <Box
                description={"Essentials at low Price"}
                img={"assets/more8.avif"}
              />
            </div>
          </div>
          <div className={`${styles.largeLargeBox} bg-white dark:bg-darkCard`}>
            <div className={`${styles.title}`}>
              <span>in focus</span>
            </div>
            <div className={`${styles.boxs}`}>
              <div className={`${styles.img}`}>
                <img src="assets/more9.avif" alt="" className="skeleton" />
              </div>
              <div className={`${styles.img}`}>
                <img src="assets/more10.avif" alt="" className="skeleton" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreOffers;
