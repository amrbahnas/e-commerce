import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./DeleteAccount.module.css";
// redux
import { useDispatch } from "react-redux";
import { setLoginState } from "../../store/AuthSlice";
//firebase
import { signIn, logOut } from "../../Firebase/Auth";

const DeleteAccount = ({
  setDeleteAccountLayout,
  deleteUserAccount,
  email,
}) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [ispasswordNotCorrect, setIspasswordNotCorrect] = useState(false);
  const [isNotValid, setIsNotValid] = useState(false);

  const deleteHandler = () => {
    signIn(email, password)
      .then((res) => {
        if (confirm === "delete my Account") {
          deleteUserAccount()
            .then((res) => {
              dispatch(setLoginState(false));
              logOut();
              setDeleteAccountLayout(false);
              // navigate("/", { replace: true });
              toast.info("Account has been Deleted", {
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "colored",
              });
            })
            .catch((err) => {
              toast.error("Please Try Again", {
                autoClose: false,
                hideProgressBar: true,
                closeOnClick: true,
                theme: "colored",
              });
            });
        } else {
          setIsNotValid(true);
        setIspasswordNotCorrect(false);

        }
      })
      .catch((err) => {
        setIspasswordNotCorrect(true);
      });
  };

  const layout = useRef();
  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!layout.current.contains(e.target)) {
        setDeleteAccountLayout(false);
      }
    };
    document.addEventListener("mousedown", handler);
    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={`${styles.deleteAccount}`}>
      <div className={`theContainer  flex items-center justify-center`}>
        <div className={`${styles.form}`} ref={layout}>
          <div className={`${styles.header}`}>
            <span>Delete Account</span>
            <CloseIcon
              className=" cursor-pointer"
              onClick={(e) => setDeleteAccountLayout(false)}
            />
          </div>
          <div className={`${styles.alert}`}>
            <span>
              <strong>Warning: </strong>
              This action is not reversible. Please be certain.
            </span>
          </div>
          <div className={`${styles.input}`}>
            <label htmlFor="Password">Account Password</label>
            {ispasswordNotCorrect && <span>Wrong password</span>}
            <input
              type="password"
              name="Password"
              id="Password"
              autoFoc
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={ispasswordNotCorrect ? "border-red-600" : ""}
            />
          </div>
          <div className={`${styles.input}`}>
            <label htmlFor="confirm">
              To verify, types
              <strong> delete my Account </strong>
              below:
            </label>
            {isNotValid && <span>Please match the requested Format</span>}
            <input
              type="text"
              name="confirm"
              id="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={isNotValid ? "border-red-600" : ""}
            />
          </div>
          <button onClick={(e) => deleteHandler()}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
