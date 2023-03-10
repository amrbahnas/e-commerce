import React, { useEffect, useRef, useState } from "react";
import styles from "./ProfilePhotoPreview.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { updateUserData } from "../../Firebase/Auth.js";

import { uploadImage, deleteImage, dowunloadImage } from "../../Firebase/Store";
// redux
import { useDispatch } from "react-redux";
import { setPhotoURL, setUserImage } from "../../store/userSlice";
// for generate random string
import { v4 } from "uuid";
const ProfilePhotoPreview = ({
  userImage,
  photoURL,
  setProfilePhotoLayout,
}) => {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [imgFile, setImgFile] = useState(null);
  const [profileImage, setProfileImage] = useState(userImage);

  /////////////////////////////close when click////////////////////////////
  const layout = useRef();
  // close window onclick outside
  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!layout.current.contains(e.target)) {
        setProfilePhotoLayout(false);
        setProfileImage(userImage);
      }
    };
    document.addEventListener("mousedown", handler);
    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  /////////////////////////////start////////////////////////////
  // take img from input file then show it
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
    // DELETE OLD IMG
    const randomString = v4();
    // UPLOAD NEW IMG TO STORE
    const imageName = imgFile.name + randomString;
    const imagePath = "users-profiles-images/" + imageName;
    uploadImage(imgFile, imagePath)
      .then((res) => {
        if (photoURL) {
          deleteImage("users-profiles-images/" + photoURL);
        }
        // UPDATE USER PHOTOURL
        updateUserData({ photoURL: imageName });
        // UPDATE GLOBAL STARE
        dispatch(setPhotoURL(imageName));
        dispatch(setUserImage(profileImage));
        setConfirm(false);
        setProfilePhotoLayout(false);
      })
      .catch((err) => {
        console.log("upload", err);
      });
  };

  const removeUserPhoto = () => {
    if (photoURL) {
      if (window.confirm("Are you sure")) {
        dowunloadImage("users-profiles-images/default-user-image.png").then(
          (img) => {
            dispatch(setUserImage(img));
            deleteImage("users-profiles-images/" + photoURL);
            updateUserData({ photoURL: null });
            dispatch(setPhotoURL(null));
            setProfilePhotoLayout(false);
          }
        );
      }
    }
  };

  const closeLayOut = () => {
    setProfilePhotoLayout(false);
    setProfileImage(userImage);
  };
  return (
    <div className={`${styles.photoPreview}`}>
      <div className={`theContainer  flex items-center justify-center`}>
        <div
          className={`${styles.wrapper} dark:bg-darkCard bg-white dark:text-darkSText text-gray-800`}
          ref={layout}
        >
          <div className={`${styles.header}`}>
            <span>Profile photo</span>
            <ClearIcon
              onClick={(e) => closeLayOut()}
              className="cursor-pointer "
            />
          </div>
          <div className={`${styles.img}`}>
            <img src={profileImage} alt="profile" />
          </div>
          <div className={`${styles.footer}`}>
            <div className={`${styles.edit}`}>
              <label htmlFor="inputFile">
                <EditIcon />
                Edit
                <input
                  type="file"
                  id="inputFile"
                  onChange={(e) => previewImg(e.target.files)}
                />
              </label>
            </div>

            <div
              className={`${styles.delete}`}
              onClick={(e) => removeUserPhoto()}
            >
              <DeleteIcon />
              Delete
            </div>
            {confirm && (
              <button onClick={(e) => uploadhandler()}>Confirm</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoPreview;
