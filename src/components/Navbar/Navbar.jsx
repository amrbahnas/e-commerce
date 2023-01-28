import { useState, useRef, useEffect } from "react";
// reducx
import { useSelector, useDispatch } from "react-redux";
import { setLoginState } from "../../store/AuthSlice";

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
  const { userName } = useSelector((store) => store.userSlice);
  const [loginMenuControl, setLoginMenuControl] = useState(false);
  const [controlMobileMenu, setcontrolMobileMenu] = useState(false);
  // logout function
  const logOutHandler = () => {
    dispatch(setLoginState(false));
    logOut();
    setLoginMenuControl(false);
  };

  const loginMenu = useRef();
  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!loginMenu.current.contains(e.target)) {
        setLoginMenuControl(false);
        console.log("as");
      }
    };
    document.addEventListener("mousedown", handler);
    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

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
          <div className="searchBar hidden md:flex">
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
              <li className=" relative" ref={loginMenu}>
                <div
                  className="cursor-pointer flex items-center "
                  onClick={(e) =>
                    login
                      ? setLoginMenuControl(!loginMenuControl)
                      : navigate("/login")
                  }
                >
                  <PersonOutlineOutlinedIcon />
                  {login && admin
                    ? userName + " (Admin)"
                    : login
                    ? userName
                    : "Login"}
                </div>
                {loginMenuControl && (
                  <div className="loginMenu absolute rounded-md w-fit p-4 top-10 -left-4  border flex flex-col items-center justify-center gap-4 shadow-md bg-white">
                    <div className=" bg-orange-400 text-white hover:scale-105 hover:shadow-md Register capitalize cursor-pointer border p-2 bg-white rounded-md w-full text-center">
                      <Link to="/profile">
                        Profile
                      </Link>
                    </div>
                    <div className="login capitalize  hover:scale-105 cursor-pointer border p-2 bg-white rounded-md w-full text-center">
                      <span onClick={(e) => logOutHandler()}>logOut</span>
                    </div>
                  </div>
                )}
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
            </div>
            <div
              className=" cursor-pointer block lg:hidden"
              onClick={(e) => setcontrolMobileMenu(true)}
            >
              <MenuIcon />
            </div>
          </div>
          {controlMobileMenu && (
            <MobileMenu setcontrolMobileMenu={setcontrolMobileMenu} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
