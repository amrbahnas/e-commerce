import React, { useState, useRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from ".//ChangePassword.module.css";
const InputField = ({
  labelTile,
  warnMsg,
  warnState,
  inputName,
  inputValue,
  onChangeFunc,
  
}) => {
  const InputRef = useRef();
  const [showIcon, setShowIcon] = useState(false);
  const [showHiddenPassword, setShowHiddenPassword] = useState(false);
  const showHiddenPasswordHandler = () => {
    setShowHiddenPassword((prev) => !prev);
    const type =
      InputRef.current.getAttribute("type") === "password"
        ? "text"
        : "password";
    InputRef.current.setAttribute("type", type);
  };
  return (
    <div className={`${styles.input}`}>
      <label htmlFor={inputName}>{labelTile}</label>
      {warnState && <span>{warnMsg}</span>}
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
          name={inputName}
          id={inputName}
          value={inputValue}
          onChange={(e) => onChangeFunc(e.target.value)}
          onFocus={(e) => setShowIcon(true)}
          className={warnState ? "border-red-600" : ""}
          ref={InputRef}
        />
      </div>
    </div>
  );
};

export default InputField
