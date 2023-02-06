import React, { useState, useRef, useEffect} from "react";
// icons
import CloseIcon from "@mui/icons-material/Close";
// firebase
import { signIn } from "../../Firebase/Auth";
// component
import InputField from "./InputField";
// style file
import styles from "./ChangePassword.module.css";

/************************************* start ************************************************** */
const ChangePassword = ({
  setChangePasswordLayout,
  updateUserPassword,
  email,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isPasswordNotCorrent, setIsPasswordNotCorrent] = useState(false);
  const [isPasswordNotValid, setIsPasswordNotValid] = useState(false);
  const [isPasswordNotMatch, setIsPasswordNotMatch] = useState(false);
  const updateHandler = () => {
    signIn(email, currentPassword)
      .then((res) => {
        if (newPassword.length < 6) {
          setIsPasswordNotValid(true);
        } else if (newPassword !== repeatPassword) {
          setIsPasswordNotMatch(true);
          setIsPasswordNotValid(false);
          setIsPasswordNotCorrent(false);
        } else {
          updateUserPassword(newPassword);
          setIsPasswordNotCorrent(false);
          setChangePasswordLayout(false);
        }
      })
      .catch((err) => {
        console.log("error");
        setIsPasswordNotCorrent(true);
      });
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
  
  /************************************* DOM ************************************************** */
  return (
    <div className={`${styles.changePassword}`}>
      <div className={`theContainer  flex items-center justify-center`}>
        <div className={`${styles.form}`} ref={layout}>
          <div className={`${styles.header}`}>
            <h2>Change password</h2>
            <CloseIcon
              className="cursor-pointer "
              onClick={() => setChangePasswordLayout(false)}
            />
          </div>
          <InputField
            labelTile={"Current Password"}
            warnMsg={"Wrong Password"}
            warnState={isPasswordNotCorrent}
            inputName={"currentPassword"}
            inputValue={currentPassword}
            onChangeFunc={setCurrentPassword}
          />

          <InputField
            labelTile={"New Password"}
            warnMsg={"Passwords must be a minimum of 6 characters"}
            warnState={isPasswordNotValid}
            inputName={"NewPassword"}
            inputValue={newPassword}
            onChangeFunc={setNewPassword}
          />

          <InputField
            labelTile={"Repeat new password"}
            warnMsg={"Passwords must match"}
            warnState={isPasswordNotMatch}
            inputName={"repeatPassword"}
            inputValue={repeatPassword}
            onChangeFunc={setRepeatPassword}
          />

          <button onClick={(e) => updateHandler()}>UPDATE PASSWORD</button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
