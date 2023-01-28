import React, { useEffect, useRef } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link, NavLink } from "react-router-dom";
import styles from "./MobileMenu.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setLoginState } from "../../store/AuthSlice";
//firebase
import{logOut} from "../../Firebase/Auth"
const MobileMenu = ({ setcontrolMobileMenu }) => {
  const dispatch = useDispatch();
  // target cart element
  const menu = useRef();
  const { login, admin } = useSelector((store) => store.AuthSlice);
  const { userName } = useSelector((store) => store.userSlice);

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
            <li>
              <NavLink to="/admin">
                <DashboardIcon />
                Dashboard
              </NavLink>
            </li>
            <li>
              <PersonOutlineOutlinedIcon className="cursor-pointer" />
              {login ? (
                <span className=" cursor-pointer" onClick={e=>logOutHandler()}>{userName}{admin&&" (Admin)"}</span>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>

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
              <Link to="/products/woman" className="link">
                Woman
              </Link>
            </li>
            <li>
              <Link to="/products/children" className="link">
                Children
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
