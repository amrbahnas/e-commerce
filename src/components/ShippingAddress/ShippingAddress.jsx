import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAddress } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import styles from "./ShippingAddress.module.css";
const ShippingAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("");

  const  {userAddress}  = useSelector((store) => store.userSlice);
  useEffect(() => {
    setLocation(userAddress.location);
    setCity(userAddress.city);
    setPostal(userAddress.postal);
    setCountry(userAddress.country);
  }, [
    userAddress.location,
    userAddress.city,
    userAddress.postal,
    userAddress.country,
  ]);
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      location,
      city,
      postal,
      country,
    };
    dispatch(setUserAddress(data));
    navigate("/checkout/payment");
  };
  return (
    <div className={`${styles.inputSection}`}>
      <form className={`${styles.form}`} onSubmit={(e) => submitHandler(e)}>
        <span>Shipping Address:</span>
        <div className={`${styles.input}`}>
          <label htmlFor="address">address</label>
          <input
            type="text"
            id="address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div className={`${styles.input}`}>
          <label htmlFor="city">city:</label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div className={`${styles.input}`}>
          <label htmlFor="Postal Code">Postal Code</label>
          <input
            type="text"
            id="Postal Code"
            value={postal}
            onChange={(e) => setPostal(e.target.value)}
            required
          />
        </div>
        <div className={`${styles.input}`}>
          <label htmlFor="Country">Country</label>
          <input
            type="text"
            id="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
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
