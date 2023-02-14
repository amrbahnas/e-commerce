import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import styles from "./Placeorder.module.css";
import { useSelector } from "react-redux";
import Rocket from "./../Rocket/Rocket";
import { motion } from "framer-motion";
const Placeorder = () => {
  const navigate = useNavigate();
  const [rocket, setRocket] = useState(false);
  // price
  const { data, totalPrice } = useSelector((store) => store.cartSlice);
  const discount = totalPrice * 0.3;
  const tax = totalPrice * 0.05;
  const [finalPrice] = useState(totalPrice + tax  - discount); //
  const { userAddress, paymentMethod } = useSelector(
    (store) => store.userSlice
  );
  const submitHandler = () => {
    setRocket((prev) => !prev);
  };
  return (
    <div className={`${styles.placeorder} dark:bg-darkCard bg-white `}>
      <div className={`${styles.left} dark:bg-darkCard bg-white`}>
        <div className={`${styles.shipping}`}>
          <span className={styles.title}>
            <LocationOnIcon /> <span>shipping</span>
          </span>
          <div className={`${styles.info}`}>
            <span>{userAddress.location}</span>
            <span>{userAddress.city}</span>
            <span>{userAddress.postal}</span>
            <span>{userAddress.country}</span>
          </div>
        </div>
        <div className={`${styles.payment}`}>
          <div>
            <span className={styles.title}>
              <PaymentIcon />
              <span>Payment Method</span>
            </span>
            <div className={`${styles.info}`}>
              <span>{paymentMethod}</span>
            </div>
          </div>
          <img src="/assets/payment.png" alt="" />
        </div>
        <div className={`${styles.order}`}>
          <span className={styles.title}>
            <BorderAllIcon />
            <span>Order Items</span>
          </span>
          <div className={`${styles.productsHead}`}>
            <span>product</span>
            <span>Price</span>
          </div>
          <div className={`${styles.products}`}>
            {data.map((product) => (
              <div className={`${styles.product}`} key={product.id}>
                <div className={`${styles.info}`}>
                  <img src={product.previewImg} alt="" className="" />
                  <span>{product.title.substring(0, 20)} ...</span>
                </div>
                <div className={`${styles.price}`}>
                  {product.itemCount} x {product.price}$
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`${styles.right} dark:bg-darkCard bg-white`}>
        <span className={styles.title}>Order Summary</span>
        <ul>
          <li>
            <span>Items:</span>
            <span>{data.length}</span>
          </li>
          <li>
            <span>Tax:</span>
            <span>${Math.ceil(tax)}</span>
          </li>
          <li>
            <span>discount:</span>
            <span>$ -{Math.ceil(discount)}</span>
          </li>
          <li>
            <span>total:</span>
            <span className="font-bold">${Math.ceil(finalPrice)}</span>
          </li>
        </ul>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(e) => submitHandler()}
        >
          {rocket ? (
            <img
              src="/assets/Spin.svg"
              alt=""
              className="w-6 m-auto transparent"
            />
          ) : (
            "place order"
          )}
        </motion.button>
        <button onClick={(e) => navigate(-1)}>back</button>
      </div>
      {rocket && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="relative z-50"
        >
          <Rocket />
        </motion.div>
      )}
    </div>
  );
};

export default Placeorder;
