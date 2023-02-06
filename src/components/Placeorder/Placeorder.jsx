import React from "react";
import { useNavigate } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import styles from "./Placeorder.module.css";
import { useSelector } from "react-redux";
const Placeorder = () => {
  const { data, totalPrice } = useSelector((store) => store.cartSlice);
  console.log(data);
  const navigate = useNavigate();
  return (
    <div className={`${styles.placeorder}`}>
      <div className={`${styles.left}`}>
        <div className={`${styles.shipping}`}>
          <span className={styles.title}>
            <LocationOnIcon /> <span>shipping</span>
          </span>
          <div className={`${styles.info}`}>
            <span>test</span>
            <span>test</span>
            <span>test</span>
          </div>
        </div>
        <div className={`${styles.payment}`}>
          <div>
            <span className={styles.title}>
              <PaymentIcon />
              <span>Payment Method</span>
            </span>
            <div className={`${styles.info}`}>
              <span>PayPal</span>
            </div>
          </div>
          <img src="/assets/payment.png" alt="" />
        </div>
        <div className={`${styles.order}`}>
          <span className={styles.title}>
            <BorderAllIcon />
            <span>Order Items</span>
          </span>
          <div className={`${styles.product}`}>
            <table>
              <thead>
                <tr>
                  <th>products</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {data.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <img src={product.previewImg} alt="" className="" />
                      <span>{product.title}</span>
                    </td>
                    <td>
                      {product.itemCount} x {product.price}$
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={`${styles.right}`}>
        <span className={styles.title}>Order Summary</span>
        <ul>
          <li>
            <span>Items:</span>
            <span>$222.60</span>
          </li>
          <li>
            <span>Shipping:</span>
            <span>$222.60</span>
          </li>
          <li>
            <span>tax:</span>
            <span>$222.60</span>
          </li>
          <li>
            <span>total:</span>
            <span>${totalPrice}</span>
          </li>
        </ul>
        <button>place order</button>
        <button onClick={(e) => navigate(-1)}>back</button>
      </div>
    </div>
  );
};

export default Placeorder;
