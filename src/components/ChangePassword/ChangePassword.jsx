import React, { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from ".//ChangePassword.module.css";
const ChangePassword = ({ setChangePasswordLayout, updateUserPassword }) => {
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isPasswordNotValid, setIsPasswordNotValid] = useState(false);
  const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
  const [showHiddenPassword, setShowHiddenPassword] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const newPasswordField = useRef();
  const repeatPasswordField = useRef();
  const showHiddenPasswordHandler = () => {
    setShowHiddenPassword((prev) => !prev);
    const type =
      newPasswordField.current.getAttribute("type") === "password"
        ? "text"
        : "password";
    newPasswordField.current.setAttribute("type", type);
    repeatPasswordField.current.setAttribute("type", type);
  };

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
            <div className={`${styles.inputField}`}>
              {showIcon ? (
                showHiddenPassword ? (
                  <VisibilityIcon
                    className={styles.eyeIcon}
                    onClick={(e) => showHiddenPasswordHandler()}
                  />
                ) : (
                  <VisibilityOffIcon
                    className={styles.eyeIcon}
                    onClick={(e) => showHiddenPasswordHandler()}
                  />
                )
              ) : null}
              <input
                type="password"
                name="NewPassword"
                id="NewPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onFocus={(e) => setShowIcon(true)}
                className={isPasswordNotValid ? "border-red-600" : ""}
                ref={newPasswordField}
              />
            </div>

            {isPasswordNotValid && (
              <span>Passwords must be a minimum of 6 characters</span>
            )}
          </div>
          <div className={`${styles.input}`}>
            <label htmlFor="repeatPassword">Repeat new password</label>
            <div className={`${styles.inputField}`}>
              {showIcon ? (
                showHiddenPassword ? (
                  <VisibilityIcon
                    className={styles.eyeIcon}
                    onClick={(e) => showHiddenPasswordHandler()}
                  />
                ) : (
                  <VisibilityOffIcon
                    className={styles.eyeIcon}
                    onClick={(e) => showHiddenPasswordHandler()}
                  />
                )
              ) : null}

              <input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                onFocus={(e) => setShowIcon(true)}
                className={isPasswordNotValid ? "border-red-600" : ""}
                ref={repeatPasswordField}
              />
            </div>
            {isPasswordNotMatch && <span>Passwords must match</span>}
          </div>
          <button onClick={(e) => updateHandler()}>UPDATE PASSWORD</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
