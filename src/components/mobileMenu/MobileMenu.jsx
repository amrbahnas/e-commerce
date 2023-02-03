import React, { useEffect, useRef, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, NavLink } from "react-router-dom";
import styles from "./MobileMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoginState, setAdminState } from "../../store/AuthSlice";
//firebase
import { logOut } from "../../Firebase/Auth";
const MobileMenu = ({ setcontrolMobileMenu }) => {
  const dispatch = useDispatch();
  // target cart element
  const menu = useRef();
  const [optionsControl, setOptionsControl] = useState(false);
  const { login, admin } = useSelector((store) => store.AuthSlice);
  const { userName, userImage } = useSelector((store) => store.userSlice);

  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!menu.current.contains(e.target)) {
        // call back function, change state to false , because the state at the parrent component
        setcontrolMobileMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  // logout function
  const logOutHandler = () => {
    dispatch(setLoginState(false));
    dispatch(setAdminState(false));
    logOut();
  };
  return (
    <div className={`${styles.layout} lg:hidden`}>
      <div className={styles.menu} ref={menu}>
        <div className={styles.menuWrapper}>
          <div className={styles.search}>
            <input type="search" name="" id="" />
            <SearchOutlinedIcon className="cursor-pointer" />
          </div>
          <ul className={styles.topMenu}>
            {admin && (
              <li>
                <NavLink to="/admin">
                  <DashboardIcon />
                  Dashboard
                </NavLink>
              </li>
            )}
            <li
              onClick={(e) => setOptionsControl(!optionsControl)}
              className={styles.userProfile}
            >
              {login ? (
                <div className=" w-8 h-8 rounded-full overflow-hidden mr-1">
                  <img
                    src={userImage}
                    alt=""
                    className=" w-full h-full object-cover"
                  />
                </div>
              ) : (
                <PersonOutlineOutlinedIcon />
              )}

              {login ? (
                <span className=" cursor-pointer">
                  {userName}
                  {admin && " (Admin)"}
                  {optionsControl ? <ExpandMoreIcon /> : <ChevronRightIcon />}
                </span>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
            {login && optionsControl ? (
              <>
                <li>
                  <Link to="/profile" className="link">
                    Profile
                  </Link>
                </li>
                <li>
                  <span
                    onClick={(e) => logOutHandler()}
                    className="cursor-pointer"
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : null}

            <li>
              <Link to="/" className="link">
                HomePage
              </Link>
            </li>
            <li>
              <a href="#footer" className="link">
                About
              </a>
            </li>
            <li>
              <Link href="#footer" className="link">
                contact
              </Link>
            </li>
            <li>
              <Link to="/" className="link">
                stores
              </Link>
            </li>
          </ul>
          <div className="section text-center mt-3 text-xl capitalize">
            sections
          </div>
          <ul className={styles.topMenu}>
            <li>
              <Link to="/products/men" className="link">
                Men
              </Link>
            </li>
            <li>
              <Link to="/products/electronics" className="link">
                electronics
              </Link>
            </li>
            <li>
              <Link to="/products/kids" className="link">
                kids
              </Link>
            </li>
            <li>
              <Link to="/products/accessories" className="link">
                Accessories
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
