import React, { useState, useRef, useEffect } from "react";
//styles file
import styles from "./ConfirmPassword.module.css";
// firebase
import { signIn } from "../../Firebase/Auth";
// icons
import CloseIcon from "@mui/icons-material/Close";

/************************************* start ************************************************** */
const ConfirmPassword = ({
  setConfirmPasswordLayout,
  setChangeEmailState,
  email,
}) => {
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
  };
  
  /************************************* DOM ************************************************** */
  return (
    <div className={`${styles.confirmPassword}`}>
      <div className="flex items-center justify-center theContainer">
        <div
          className={`${styles.wrapper} dark:bg-darkCard bg-white dark:text-darkSText text-gray-800`}
          ref={layout}
        >
          <div className={`${styles.header}`}>
            <CloseIcon
              className="cursor-pointer "
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
              className={`${
                isNotValid ? "border-red-600" : ""
              } bg-gray-100 dark:bg-darkBody`}
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
