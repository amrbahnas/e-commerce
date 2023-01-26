import { useState } from "react";
import { useSelector } from "react-redux";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
// import Cart from "./../Cart/Cart";
import MobileMenu from "../mobileMenu/MobileMenu";
const Navbar = () => {
  const { data } = useSelector((store) => store.cartSlice);
  const [loginMenuControl, setLoginMenuControl] = useState(false);
  const [controlMobileMenu, setcontrolMobileMenu] = useState(false);

  return (
    <div className="storeHeader bg-white w-full shadow-md fixed z-50 top-0">
      <div className="theContainer">
        <div className="navbar justify-between">
          <div className="navLeft">
            <div className="center">
              <Link to="/">STORE</Link>
            </div>
            <ul className="ul-item">
              <li>
                <NavLink to="/products/men" className="NavLink">
                  Men
                </NavLink>
              </li>
              <li>
                <NavLink to="/products/woman" className="NavLink">
                  Woman
                </NavLink>
              </li>
              <li>
                <NavLink to="/products/children" className="NavLink">
                  Children
                </NavLink>
              </li>
              <li>
                <NavLink to="/products/accessories" className="NavLink">
                  Accessories
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="searchBar">
            <input
              type="text"
              name="searchItem"
              id=""
              className="searchBarInput"
              placeholder="Search"
            />
            <SearchOutlinedIcon className="cursor-pointer absolute right-1" />
          </div>
          <div className="navRight">
            <ul className="ul-item">
              <li className=" relative">
                <div
                  className="cursor-pointer"
                  onClick={(e) => setLoginMenuControl(!loginMenuControl)}
                >
                  <PersonOutlineOutlinedIcon />
                  login/signup
                </div>
                {loginMenuControl && (
                  <div className="loginMenu absolute rounded-md w-full p-4 top-10  left-0 border flex flex-col items-center justify-center gap-4 shadow-md bg-white">
                    <div className="login capitalize cursor-pointer border p-2 bg-white rounded-md w-full text-center">
                      <Link to="/login" target="_blank">
                        login
                      </Link>
                    </div>
                    <div className="signup capitalize cursor-pointer border p-2 bg-white rounded-md w-full text-center">
                      <Link to="/signup" target="_blank">
                        signup
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              <li>
                <NavLink to="/admin">
                  <DashboardIcon />
                  Dashboard
                </NavLink>
              </li>
              <li className="hidden">
                <FavoriteBorderOutlinedIcon className="cursor-pointer hover:text-red-600" />
              </li>
              <li className="flex gap-10 navRight ">
                <Link to="/cart">
                  <div
                    className="relative cursor-pointer flex gap-2 items-center"
                    // onClick={(e) => setCartControl(!cartControl)}
                  >
                    <ShoppingCartOutlinedIcon className="cursor-point" />
                    {data.length > 0 && (
                      <span className="count">{data.length}</span>
                    )}
                    <span className="text-md font-medium capitalize">cart</span>
                  </div>
                </Link>
              </li>
            </ul>
            <div
              className=" cursor-pointer block lg:hidden"
              onClick={(e) => setcontrolMobileMenu(true)}
            >
              <MenuIcon />
            </div>
          </div>
          {/*cartControl && <Cart setCartControl={setCartControl} />*/}
          {controlMobileMenu && (
            <MobileMenu setcontrolMobileMenu={setcontrolMobileMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
