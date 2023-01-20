import React, { useEffect, useRef } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.css";
const MobileMenu = ({ setcontrolMobileMenu }) => {
  // target cart element
  const menu = useRef();

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

  return (
    <div className={`${styles.layout} md:hidden`}>
      <div className={styles.menu} ref={menu}>
        <div className={styles.menuWrapper}>
          <div className={styles.search}>
            <input type="search" name="" id="" />
            <SearchOutlinedIcon className="cursor-pointer" />
          </div>
          <ul className={styles.topMenu}>
            <li>
              <Link to="/admin">
                <PersonOutlineOutlinedIcon className="cursor-pointer" />
                <span>amr@gmail.com</span>
              </Link>
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
