import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { toast } from "react-toastify";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  setTheEmail,
  setTheUserName,
  setUserImage,
} from "../..//store/userSlice";
// firebase
import {
  updateUserData,
  updateUserEmail,
  updateUserPassword,
  deleteUserAccount,
} from "../../Firebase/Auth.js";
import { uploadUserImage } from "../../Firebase/Store.js";
// component
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import DeleteAccount from "../../components/DeleteAccount/DeleteAccount";
// for generate random string
import { v4 } from "uuid";
const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, userName, userImage } = useSelector(
    (store) => store.userSlice
  );
  const { login } = useSelector((store) => store.AuthSlice);
  const [firstName, setFirstName] = useState(userName.split(" ")[0]);
  const [lastName, setLastName] = useState(userName.split(" ")[1]);
  const [userEmail, setUserEmail] = useState(email);
  const [changePasswordLayout, setChangePasswordLayout] = useState(false);
  const [deleteAccountLayout, setDeleteAccountLayout] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [profileImage, setProfileImage] = useState(userImage);
  const firstNameObject = useRef();
  const lastNameObject = useRef();
  const emailObject = useRef();

  const previewImg = (files) => {
    if (files.length > 0) {
      setImgFile(files[0]);
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        setProfileImage(event.target.result);
        setConfirm(true);
      };
      fileReader.readAsDataURL(files[0]);
    }
  };

  const uploadhandler = () => {
    const randomString=v4()
    uploadUserImage(imgFile, randomString);
    updateUserData({ photoURL: imgFile.name + randomString });
    dispatch(setUserImage(profileImage));
    setConfirm(false);
  };

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
    } else {
      updateUserData({ displayName: firstName + " " + lastName })
        .then((res) => {
          dispatch(setTheUserName(firstName + " " + lastName));
          firstNameObject.current.disabled = true;
          lastNameObject.current.disabled = true;
          e.target.innerText = "UPDATE INFO";
          //message
          toast.success("Name Updated successfully ", {
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored",
          });
          //end message
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored",
          });
        });
    }
  };

  const enablePassword = (e) => {
    setChangePasswordLayout(true);
  };

  const enableEmail = (e) => {
    if (e.target.innerText === "Change Eamil") {
      emailObject.current.disabled = false;
      emailObject.current.focus();
      e.target.innerText = "Save New Email";
    } else {
      updateUserEmail(userEmail)
        .then((res) => {
          dispatch(setTheEmail(userEmail));
          toast.success("Email Updated successfully ", {
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored",
          });
        })
        .catch((err) => {
          setUserEmail(email);
          toast.error(" You Login For Along Time, Please Re-Login Again", {
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored",
          });
          emailObject.current.disabled = true;
          e.target.innerText = "Change Eamil";
        });
    }
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
                src={profileImage}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
              <div className={`${styles.editIcon}`}>
                <label htmlFor="inputFile">
                  <CameraAltIcon />
                  Edit
                  <input
                    type="file"
                    id="inputFile"
                    onChange={(e) => previewImg(e.target.files)}
                  />
                </label>
              </div>
            </div>
            {confirm && (
              <button onClick={(e) => uploadhandler()}>Confirm</button>
            )}
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
                    disabled
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
                <button onClick={(e) => enableEmail(e)}>Change Eamil</button>
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
        />
      )}
      {deleteAccountLayout && (
        <DeleteAccount
          setDeleteAccountLayout={setDeleteAccountLayout}
          deleteUserAccount={deleteUserAccount}
        />
      )}
    </div>
  );
};

export default UserProfile;
