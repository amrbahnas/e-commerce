import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";

import styles from ".//ChangePassword.module.css";
const ChangePassword = ({ setChangePasswordLayout, updateUserPassword }) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeadPassword] = useState("");
  const [isPasswordNotValid, setIsPasswordNotValid] = useState(false);
  const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);

  const updateHandler = () => {
    if (newPassword.length < 6) {
      setIsPasswordNotValid(true);
    } else if (newPassword !== repeatPassword) {
      setIsPasswordNotMatch(true);
      setIsPasswordNotValid(false);

    } else {
      updateUserPassword(newPassword);
      setChangePasswordLayout(false);
    }
  };

  const layout = useRef();
  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!layout.current.contains(e.target)) {
        setChangePasswordLayout(false);
      }
    };
    document.addEventListener("mousedown", handler);
    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={`${styles.changePassword}`}>
      <div className={`theContainer  flex items-center justify-center`}>
        <div className={`${styles.form}`} ref={layout}>
          <div className={`${styles.header}`}>
            <h2>Change password</h2>
            <CloseIcon
              className=" cursor-pointer"
              onClick={(e) => setChangePasswordLayout(false)}
            />
          </div>
          <div className={`${styles.input}`}>
            <label htmlFor="NewPassword">New Password</label>
            <input
              type="password"
              name="NewPassword"
              id="NewPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={isPasswordNotValid ? "border-red-600" : ""}
            />
            {isPasswordNotValid && (
              <span>Passwords must be a minimum of 6 characters</span>
            )}
          </div>
          <div className={`${styles.input}`}>
            <label htmlFor="repeatPassword">Repeat new password</label>
            <input
              type="password"
              name="repeatPassword"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeadPassword(e.target.value)}
              className={isPasswordNotMatch ? "border-red-600" : ""}
            />
            {isPasswordNotMatch && <span>Passwords must match</span>}
          </div>
          <button onClick={(e) => updateHandler()}>UPDATE PASSWORD</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
