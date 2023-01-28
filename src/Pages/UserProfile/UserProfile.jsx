import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";
import { useSelector } from "react-redux";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
const UserProfile = () => {
  const navigate = useNavigate();
  const { email, userName, photoURL } = useSelector((store) => store.userSlice);
  const { login } = useSelector((store) => store.AuthSlice);

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login]);
  return (
    <div className={`${styles.userProfile} mt-24`}>
      <div className="theContainer">
        <div className={`${styles.wrapper} grid grid-cols-4 gap-3`}>
          <div
            className={`${styles.left} col-span-4 md:col-span-1 flex justify-center p-8 bg-white`}
          >
            <div className={`${styles.img}`}>
              <img
                src="assets/1.jpg"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
              <div className={`${styles.editIcon}`}>
                <CameraAltIcon />
                Edit
              </div>
            </div>
          </div>
          <div
            className={`${styles.right} col-span-4 md:col-span-3 flex  flex-col gap-4 rounded-md`}
          >
            <div className={`${styles.box}`}>
              <span className={`${styles.title}`}>General Info</span>
              <div className={`${styles.inputsContainer}`}>
                <div className={`${styles.input}`}>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={userName}
                    disabled
                  />
                </div>
                <div className={`${styles.input}`}>
                  <label htmlFor="lastName">last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="firstName"
                    value={userName}
                    disabled
                  />
                </div>
              </div>
              <button>UPDATE INFO</button>
            </div>

            <div className={`${styles.box}`}>
              <span className={`${styles.title}`}>Security</span>
              <div className={`${styles.inputsContainer}`}>
                <div className={`${styles.input}`}>
                  <label htmlFor="Email">Email</label>
                  <input
                    type="email"
                    name="Email"
                    id="Email"
                    value={email}
                    disabled
                  />
                </div>
                <div className={`${styles.input}`}>
                  <label htmlFor="lastName">Password</label>
                  <input
                    type="password"
                    name="Password"
                    id="Password"
                    value="123464646466"
                    disabled
                  />
                </div>
              </div>
              <div className={`${styles.buttons}`}>
                <button>Change password</button>
                <button>Add PHONE NUMBER</button>
                <span>DELETE ACCOUNT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
