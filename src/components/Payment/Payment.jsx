import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Payment.module.css";
const Payment = () => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/checkout/placeorder");
  };
  return (
    <div className={`${styles.inputSection}`}>
      <form className={`${styles.form}`} onSubmit={(e) => submitHandler(e)}>
        <span>Payment Methods</span>
        <span>Select method:</span>
        <div className={`${styles.input}`}>
          <input type="radio" name="paymethod" id="PayPal" />
          <label htmlFor="PayPal">PayPal or Credit Card</label>
        </div>
        <div className={`${styles.input}`}>
          <input type="radio" name="paymethod" id="Stripe" />
          <label htmlFor="Stripe">Stripe</label>
        </div>
        <button type="submit">Next Step</button>
        <button type="button" onClick={e=>navigate(-1)}>Back</button>
      </form>
      <div className={`${styles.image}`}>
        <img src="/assets/svg/delivery.svg" alt="" />
      </div>
    </div>
  );
};

export default Payment;
