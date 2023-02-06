import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './ShippingAddress.module.css'
const ShippingAddress = () => {
    const navigate = useNavigate()
    const submitHandler = (e) => {
      e.preventDefault();
      navigate("/checkout/payment");
    };
  return (
    <div className={`${styles.inputSection}`}>
      <form className={`${styles.form}`} onSubmit={e=> submitHandler(e)}>
        <span>Shipping Address:</span>
        <div className={`${styles.input}`}>
          <label htmlFor="address">address</label>
          <input type="text" id="address" />
        </div>
        <div className={`${styles.input}`}>
          <label htmlFor="city">city:</label>
          <input type="text" id="city" />
        </div>
        <div className={`${styles.input}`}>
          <label htmlFor="Postal Code">Postal Code</label>
          <input type="text" id="Postal Code" />
        </div>
        <div className={`${styles.input}`}>
          <label htmlFor="Country">Country</label>
          <input type="text" id="Country" />
        </div>
        <button>Next Step</button>
      </form>
      <div className={`${styles.image}`}>
        <img src="/assets/svg/delivery.svg" alt="" />
      </div>
    </div>
  );
};

export default ShippingAddress;
