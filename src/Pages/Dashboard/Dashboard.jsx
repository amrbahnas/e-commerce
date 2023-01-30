import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Dashboard.module.css";
import { Link,NavLink, Outlet } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className="theContainer">
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <NavLink to="/admin" end className="hover:text-buttonBg">
              AllProducts
            </NavLink>
            <NavLink to="addproduct" className="hover:text-buttonBg">
              ADD New Product
            </NavLink>
          </div>
          <div className={styles.body}>
            <Outlet />
          </div>
        </div>
      </div>
      <Link to={-1} className={styles.goBACK}>
        <ArrowBackIosIcon />
      </Link>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
