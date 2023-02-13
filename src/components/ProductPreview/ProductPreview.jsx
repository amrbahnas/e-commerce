import React, { useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import styles from "./ProductPreview.module.css";
const ProductPreview = ({ item, img1, setPreviewProduct }) => {
  const layout = useRef();
  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!layout.current.contains(e.target)) {
        setPreviewProduct(false);
      }
    };
    document.addEventListener("mousedown", handler);
    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={`${styles.productPreview}`}>
      <div className={`${styles.wrapper}`} ref={layout}>
        <div className={`${styles.image}`}>
          <img src={img1} alt="" />
        </div>
        <div className={`${styles.info}`}>
          <Link to={"/product/" + item.id}>
            <span className={`${styles.title}`}>{item.title}</span>
          </Link>
          <span className={`${styles.des}`}>{item.des}</span>
          <Link to={"/product/" + item.id}>
            <span className={`${styles.details}`}>More Details</span>
          </Link>
        </div>
        <span onClick={(e) => setPreviewProduct(false)}>
          <CloseIcon />
        </span>
      </div>
    </div>
  );
};

export default ProductPreview;
