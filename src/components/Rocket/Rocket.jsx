import React, { useState, useEffect } from "react";
import styles from "./Rocket.module.css";
import SuccessCheck from "./../SuccessCheck/SuccessCheck";
import { useDispatch } from "react-redux";
import { resetCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Rocket = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [rocket, setRocket] = useState(true);
  const [success, setSuccess] = useState(false);
  const [timerGoHome, setTimerGoHome] = useState(15);

  useEffect(() => {
    const time = setTimeout(() => {
      setRocket(false);
      setSuccess(true);
      dispatch(resetCart());
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  }, [dispatch]);

  useEffect(() => {
    if (timerGoHome > 0) {
      setTimeout(() => setTimerGoHome(timerGoHome - 1), 1000);
    } else {
      navigate("/");
    }
  }, [timerGoHome, navigate]);

  return (
    <div className={styles.wrapper}>
      {rocket && (
        <div className={styles.rocket}>
          <div className={styles.rocketBody}>
            <div className={styles.body}></div>
            <div className={`${styles.fin} ${styles.finLeft}`}></div>
            <div className={`${styles.fin} ${styles.finRight}`}></div>
            <div className={styles.window}></div>
          </div>
          <div className={styles.exhaustFlame}></div>
          <ul className={styles.exhaustFumes}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <ul className={styles.star}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      )}
      {success && (
        <div className="flex flex-col items-center justify-center gap-10 -mt-24 ">
          <SuccessCheck />
          <motion.span
            whileTap={{ scale: 0.9 }}
            className="text-4xl font-bold text-center text-white capitalize"
          >
            Thank You For Shopping With Us
          </motion.span>
          <button
            onClick={(e) => navigate("/")}
            className="py-3 font-bold text-black capitalize rounded-md w-80 bg-disableColor"
          >
            <span>continue shopping</span>
            <span className="inline-block ml-2">{timerGoHome}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Rocket;
