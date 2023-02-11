import { useState, useRef, useEffect } from "react";
// redux
import { useSelector, useDispatch } from "react-redux";
import { setLoginState, setAdminState } from "../../store/AuthSlice";
//motion
import { motion, AnimatePresence } from "framer-motion";
//firebase
import { logOut } from "../../Firebase/Auth";
// mui icons
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MenuIcon from "@mui/icons-material/Menu";
// react router
import { Link, useNavigate, NavLink } from "react-router-dom";
// css file
import "./Navbar.css";
// component
import MobileMenu from "../mobileMenu/MobileMenu";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, admin } = useSelector((store) => store.AuthSlice);
  const { data } = useSelector((store) => store.cartSlice);
  const { userName, userImage } = useSelector((store) => store.userSlice);
  const [loginMenuControl, setLoginMenuControl] = useState(false);
  const [controlMobileMenu, setcontrolMobileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  // logout function
  const logOutHandler = () => {
    dispatch(setLoginState(false));
    dispatch(setAdminState(false));
    logOut();
    setLoginMenuControl(false);
  };

  const loginMenu = useRef();
  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!loginMenu.current.contains(e.target)) {
        setLoginMenuControl(false);
      }
    };
    document.addEventListener("mousedown", handler);
    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="fixed top-0 z-40 w-full bg-white shadow-md storeHeader">
      <div className="theContainer">
        <div className="justify-between navbar">
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
                <NavLink to="/products/electronics" className="NavLink">
                  electronics
                </NavLink>
              </li>
              <li>
                <NavLink to="/products/kids" className="NavLink">
                  kids
                </NavLink>
              </li>
              <li>
                <NavLink to="/products/accessories" className="NavLink">
                  Accessories
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="hidden searchBar md:flex">
            <input
              type="text"
              name="searchItem"
              id=""
              className="searchBarInput"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <span className="absolute cursor-pointer right-1">
              <Link to={"search/" + searchValue}>
                <SearchOutlinedIcon />
              </Link>
            </span>
          </div>
          <div className="navRight">
            <ul className="ul-item">
              <li className="relative " ref={loginMenu}>
                <div
                  className="flex items-center cursor-pointer "
                  onClick={(e) =>
                    login
                      ? setLoginMenuControl(!loginMenuControl)
                      : navigate("/user/login")
                  }
                >
                  {login ? (
                    <div className="profileImage">
                      <div className="w-8 h-8 mr-1 overflow-hidden rounded-full">
                        <img
                          src={userImage}
                          alt=""
                          className="object-cover w-full h-full "
                        />
                      </div>
                    </div>
                  ) : (
                    <PersonOutlineOutlinedIcon />
                  )}
                  {login && admin
                    ? userName + " (Admin)"
                    : login
                    ? userName
                    : "Login"}
                </div>
                <AnimatePresence>
                  {loginMenuControl && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute flex flex-col items-center justify-center gap-4 p-4 bg-white border rounded-md shadow-md loginMenu w-fit top-10 -left-4"
                    >
                      <Link to="/profile">
                        <div className="w-full p-2 text-center text-white capitalize bg-orange-400 border rounded-md cursor-pointer hover:scale-105 hover:shadow-md Register">
                          Profile
                        </div>
                      </Link>
                      <div
                        className="w-full p-2 text-center capitalize bg-white border rounded-md cursor-pointer login hover:scale-105"
                        onClick={(e) => logOutHandler()}
                      >
                        <span>logOut</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
              {admin ? (
                <li>
                  <NavLink to="/admin" className="flex items-center">
                    <DashboardIcon />
                    Dashboard
                  </NavLink>
                </li>
              ) : (
                <li>
                  <FavoriteBorderOutlinedIcon className="cursor-pointer hover:text-red-600" />
                </li>
              )}
            </ul>
            <div className="flex gap-10 navRight ">
              <Link to="/cart">
                <div
                  className="relative flex items-center gap-2 cursor-pointer"
                  // onClick={(e) => setCartControl(!cartControl)}
                >
                  <ShoppingCartOutlinedIcon className="cursor-point" />
                  {data.length > 0 && (
                    <span className="count">{data.length}</span>
                  )}
                  <span className="font-medium capitalize text-md">cart</span>
                </div>
              </Link>
            </div>
            <div
              className="block cursor-pointer lg:hidden"
              onClick={(e) => setcontrolMobileMenu(true)}
            >
              <MenuIcon />
            </div>
          </div>
          <AnimatePresence>
            {controlMobileMenu && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MobileMenu setcontrolMobileMenu={setcontrolMobileMenu} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
