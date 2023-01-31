import React, { useState, useRef, useEffect } from "react";
import styles from './ConfirmPassword.module.css'
import { signIn } from "../../Firebase/Auth";
import CloseIcon from "@mui/icons-material/Close";
const ConfirmPassword = ({ setConfirmPasswordLayout,setChangeEmailState,email }) => {
  const [passwordEntered, setPasswordEntered] = useState("");
  const [isNotValid, setIsNotValid] = useState(false);
  const layout = useRef();
  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!layout.current.contains(e.target)) {
        setConfirmPasswordLayout(false);
      }
    };
    document.addEventListener("mousedown", handler);
    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  
  const confirmHandler = () => {
 signIn(email, passwordEntered)
   .then((res) => {
    setConfirmPasswordLayout(false);
    setChangeEmailState(true);
   })
   .catch((err) => {
     console.log("error");
     setIsNotValid(true);
   });
  }
  return (
    <div className={`${styles.confirmPassword}`}>
      <div className="theContainer flex items-center justify-center">
        <div className={`${styles.wrapper}`} ref={layout}>
          <div className={`${styles.header}`}>
            <CloseIcon
              className=" cursor-pointer"
              onClick={(e) => setConfirmPasswordLayout(false)}
            />
          </div>
          <div className={`${styles.input}`}>
            <label htmlFor="confirm">Enter Your Password</label>
            {isNotValid && <span>Wrong Password</span>}
            <input
              type="password"
              name="confirm"
              id="confirm"
              autoFocus
              value={passwordEntered}
              onChange={(e) => setPasswordEntered(e.target.value)}
              className={isNotValid ? "border-red-600" : ""}
            />
          </div>
          <button onClick={(e) => confirmHandler()}>Cofirm</button>
        </div>
        ;
      </div>
    </div>
  );
};

export default ConfirmPassword;
