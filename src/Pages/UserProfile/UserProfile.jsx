import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { toast } from "react-toastify";
// redux
import { useDispatch, useSelector } from "react-redux";
import { setTheEmail, setTheUserName } from "../../store/userSlice";
// firebase
import {
  updateUserData,
  updateUserEmail,
  updateUserPassword,
  deleteUserAccount,
} from "../../Firebase/Auth.js";
// component
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";
import ProfilePhotoPreview from "../../components/ProfilePhotoPreview/ProfilePhotoPreview";
import ConfirmPassword from "../../components/ConfirmPassword/ConfirmPassword";

/**************************start************** */
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, userName, photoURL, userImage } = useSelector(
    (store) => store.userSlice
  );
  const { login } = useSelector((store) => store.AuthSlice);
  const [firstName, setFirstName] = useState(userName?.split(" ")[0]);
  const [lastName, setLastName] = useState(userName?.split(" ")[1]);
  const [userEmail, setUserEmail] = useState(email);
  const [profilePhotoLayout, setProfilePhotoLayout] = useState(false);
  const [changeEmailState, setChangeEmailState] = useState(false);
  const [confirmPasswordLayout, setConfirmPasswordLayout] = useState(false);
  const [changePasswordLayout, setChangePasswordLayout] = useState(false);
  const [deleteAccountLayout, setDeleteAccountLayout] = useState(false);
  const firstNameObject = useRef();
  const lastNameObject = useRef();
  const emailObject = useRef();

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);

  const enableInputes = (e) => {
    if (e.target.innerText !== "Save") {
      firstNameObject.current.disabled = false;
      firstNameObject.current.focus();
      lastNameObject.current.disabled = false;
      e.target.innerText = "Save";
    } else if (userName !== firstName + " " + lastName) {
      updateUserData({ displayName: firstName + " " + lastName })
        .then((res) => {
          dispatch(setTheUserName(firstName + " " + lastName));
          firstNameObject.current.disabled = true;
          lastNameObject.current.disabled = true;
          e.target.innerText = "UPDATE INFO";
          //message
          toast.success("Name Updated successfully ", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "colored",
          });
          //end message
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: false,
            closeOnClick: true,
            theme: "colored",
          });
        });
    } else {
      firstNameObject.current.disabled = true;
      lastNameObject.current.disabled = true;
      e.target.innerText = "UPDATE INFO";
    }
  };

  const enablePassword = (e) => {
    setChangePasswordLayout(true);
  };

  const enableEmail = (e) => {
    if (!changeEmailState) {
      setConfirmPasswordLayout(true);
    } else if (email !== userEmail) {
      updateUserEmail(userEmail)
        .then((res) => {
          dispatch(setTheEmail(userEmail));
          emailObject.current.disabled = true;
          e.target.innerText = "Change Email";
          toast.success("Email Updated successfully ", {
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            theme: "colored",
          });
        })
        .catch((err) => {
          toast.error("Invalid Email", {
            autoClose: false,
            closeOnClick: true,
            theme: "colored",
          });
        });
    } else {
      setChangeEmailState(false);
    }
  };

  const canselChangeEmail = () => {
    setUserEmail(email);

    setChangeEmailState(false);
  };

  const deleteUserHandler = (e) => {
    setDeleteAccountLayout(true);
  };

  return (
    <div className={`${styles.userProfile} mt-24`}>
      <div className="theContainer">
        <div className={`${styles.wrapper} grid grid-cols-4 gap-3`}>
          <div className={`${styles.left} col-span-4 lg:col-span-1`}>
            <div className={`${styles.img}`}>
              <img
                src={userImage}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
              <div
                className={`${styles.previewIcon}`}
                onClick={(e) => setProfilePhotoLayout(true)}
              >
                <CameraAltIcon />
                Preview
              </div>
            </div>
          </div>
          <div
            className={`${styles.right} col-span-4 lg:col-span-3 flex  flex-col gap-4 rounded-md`}
          >
            <div className={`${styles.box}`}>
              <span className={`${styles.title}`}>General Info</span>
              <div className={`${styles.inputsContainer}`}>
                <div className={`${styles.input}`}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled
                    ref={firstNameObject}
                  />
                </div>
                <div className={`${styles.input}`}>
                  <label htmlFor="lastName">last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled
                    ref={lastNameObject}
                  />
                </div>
              </div>
              <button onClick={(e) => enableInputes(e)}>UPDATE INFO</button>
            </div>

            <div className={`${styles.box}`}>
              <span className={`${styles.title}`}>Security</span>
              <div className={`${styles.inputsContainer}`}>
                <div className={`${styles.input}`}>
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    id="Email"
                    ref={emailObject}
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    disabled={!changeEmailState}
                  />
                </div>
                <div className={`${styles.input}`}>
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    id="Password"
                    value="***********"
                    disabled
                  />
                </div>
              </div>
              <div className={`${styles.buttons}`}>
                <button onClick={(e) => enableEmail(e)}>
                  {changeEmailState ? "Save Email" : "Change Email"}
                </button>
                {changeEmailState && (
                  <button onClick={(e) => canselChangeEmail(e)}>Cancel</button>
                )}
                <button onClick={(e) => enablePassword(e)}>
                  Change password
                </button>
                <span onClick={(e) => deleteUserHandler()}>DELETE ACCOUNT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {changePasswordLayout && (
        <ChangePassword
          setChangePasswordLayout={setChangePasswordLayout}
          updateUserPassword={updateUserPassword}
          email={email}
        />
      )}
      {deleteAccountLayout && (
        <DeleteAccount
          setDeleteAccountLayout={setDeleteAccountLayout}
          deleteUserAccount={deleteUserAccount}
          email={email}
        />
      )}
      {profilePhotoLayout && (
        <ProfilePhotoPreview
          userImage={userImage}
          photoURL={photoURL}
          setProfilePhotoLayout={setProfilePhotoLayout}
        />
      )}
      {confirmPasswordLayout && (
        <ConfirmPassword
          setConfirmPasswordLayout={setConfirmPasswordLayout}
          setChangeEmailState={setChangeEmailState}
          email={email}
        />
      )}
    </div>
  );
};

export default UserProfile;
