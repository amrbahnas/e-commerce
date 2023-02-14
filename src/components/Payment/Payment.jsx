import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserPaymentMethods } from "../../store/userSlice";
import styles from "./Payment.module.css";
const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("paypal");
  const { paymentMethod } = useSelector((store) => store.userSlice);
  // on render
  useEffect(() => {
    setPayment(paymentMethod);
  }, [paymentMethod]);
  // onclick next
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setUserPaymentMethods(payment));
    navigate("/checkout/placeorder");
  };
  return (
    <div
      className={`${styles.inputSection} dark:bg-darkCard bg-white`}
    >
      <form className={`${styles.form}`} onSubmit={(e) => submitHandler(e)}>
        <span>Payment Methods</span>
        <span>Select method:</span>
        <div className={`${styles.input}`}>
          <input
            type="radio"
            name="paymethod"
            value="paypal"
            id="PayPal"
            required
            onChange={(e) => setPayment(e.target.value)}
            checked={payment === "paypal"}
          />
          <label htmlFor="PayPal">PayPal or Credit Card</label>
        </div>
        <div className={`${styles.input}`}>
          <input
            type="radio"
            name="paymethod"
            value="stripe"
            id="Stripe"
            required
            checked={payment === "stripe"}
            onChange={(e) => setPayment(e.target.value)}
          />
          <label htmlFor="Stripe">Stripe</label>
        </div>
        <button type="submit">Next Step</button>
        <button type="button" onClick={(e) => navigate(-1)}>
          Back
        </button>
      </form>
      <div className={`${styles.image}`}>
        <img src="/assets/svg/delivery.svg" alt="" />
      </div>
    </div>
  );
};

export default Payment;
