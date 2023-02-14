import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserAddress } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import styles from "./ShippingAddress.module.css";
const ShippingAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userLocation, setUserLocation] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userPostal, setUserPostal] = useState("");
  const [userCountry, setUserCountry] = useState("");

  const { location, city, postal, country } = useSelector(
    (store) => store.userSlice.userAddress
  );

  useEffect(() => {
    console.log(location);
    if (location) {
      setUserLocation(location);
      setUserCity(city);
      setUserPostal(postal);
      setUserCountry(country);
    }
  }, [location, city, postal, country]);
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
    <div
      className={`${styles.inputSection} dark:bg-darkCard bg-white `}
    >
      <form className={`${styles.form}`} onSubmit={(e) => submitHandler(e)}>
        <span>Shipping Address:</span>
        <div className={`${styles.input}`}>
          <label htmlFor="address">address</label>
          <input
            type="text"     
            id="address"
className="bg-gray-100 dark:bg-darkBody "
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
            required
          />
        </div>
        <div className={`${styles.input}`}>
          <label htmlFor="city">city:</label>
          <input
            type="text"
            id="city"
className="bg-gray-100 dark:bg-darkBody "
            value={userCity}
            onChange={(e) => setUserCity(e.target.value)}
            required
          />
        </div>
        <div className={`${styles.input}`}>
          <label htmlFor="Postal Code">Postal Code</label>
          <input
            type="text"
            id="Postal Code"
className="bg-gray-100 dark:bg-darkBody "
            value={userPostal}
            onChange={(e) => setUserPostal(e.target.value)}
            required
          />
        </div>
        <div className={`${styles.input}`}>
          <label htmlFor="Country">Country</label>
          <input
            type="text"
            id="Country"
            className="bg-gray-100 dark:bg-darkBody "
            value={userCountry}
            onChange={(e) => setUserCountry(e.target.value)}
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
