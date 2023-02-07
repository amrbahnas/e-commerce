import { useState, useEffect } from "react";
import styles from "./CheckOut.module.css";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const CheckOut = () => {
  const { login } = useSelector((store) => store.AuthSlice);
  const navigate = useNavigate();
  const [payment, setPayment] = useState(false);
  const [paymentAccept, setPaymentAccept] = useState(false);
  const [adressAccept, setAdressAccept] = useState(false);
  const [placeorder, setPlaceorder] = useState(false);
  const [placeorderAccept] = useState(false);
  const [lineWidth, setLineWidth] = useState("0%");

  const pathname = useLocation().pathname.split("/")[2];
  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  useEffect(() => {
    if (pathname === "payment") {
      setPayment(true);
      setPaymentAccept(false);
      setPlaceorder(false);
      setAdressAccept(true);
      setLineWidth("67%");
    } else if (pathname === "placeorder") {
      setPlaceorder(true);
      setPayment(true);
      setPaymentAccept(true);
      setLineWidth("97%");
    } else {
      setAdressAccept(false);
      setPayment(false);
      setPaymentAccept(false);
      setLineWidth("35%");
    }
  }, [pathname]);

  return (
    <div className={`${styles.CheckOut}`}>
      <div className="theContainer">
        <div className={`${styles.wrapper}`}>
          <div className={`${styles.miniNav}`}>
            <span>
              <Link to="/">Home</Link>
            </span>
            <span>
              <ArrowForwardIosIcon fontSize="small" />
            </span>
            <span>{pathname}</span>
          </div>
          <div className={`${styles.stepsSection}`}>
            <div className={`${styles.step}`}>
              <span className={`${styles.stepNum} bg-amr`}>
                <CheckIcon />
              </span>
              <span className={`${styles.stepTitle}`}>Sign In</span>
            </div>
            <div className={`${styles.step}`}>
              <span className={`${styles.stepNum} bg-amr`}>
                {adressAccept ? <CheckIcon /> : 2}
              </span>
              <span className={`${styles.stepTitle}`}>Shipping Address</span>
            </div>
            <div className={`${styles.step}`}>
              <span
                className={`${styles.stepNum} ${
                  payment ? "bg-amr" : "bg-disableColor"
                }`}
              >
                {paymentAccept ? <CheckIcon /> : 3}
              </span>
              <span
                className={`${styles.stepTitle} ${
                  payment ? "text-black" : "text-disableColor"
                } `}
              >
                Payment Method
              </span>
            </div>
            <div className={`${styles.step}`}>
              <span
                className={`${styles.stepNum} ${
                  placeorder ? "bg-amr" : "bg-disableColor"
                } `}
              >
                {placeorderAccept ? <CheckIcon /> : 4}
              </span>
              <span
                className={`${styles.stepTitle}
              ${placeorder ? "text-black" : "text-disableColor"}
               `}
              >
                Place Order
              </span>
            </div>
            <div className={`${styles.line}`}>
              <span style={{ width: lineWidth }}></span>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
