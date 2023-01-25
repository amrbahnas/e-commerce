import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./Navbar.css";
// import Cart from "./../Cart/Cart";
import MobileMenu from "../mobileMenu/MobileMenu";
const Navbar = () => {
  const { data } = useSelector((store) => store.cartSlice);
  const searchBar = useRef();
  const [cartControl, setCartControl] = useState(false);
  const [controlMobileMenu, setcontrolMobileMenu] = useState(false);

  return (
    <div className="storeHeader bg-white w-full shadow-md fixed z-50 top-0">
      <div className="theContainer">
        <div className="navbar justify-between">
          <div className="center text-xl md:hidden">
            <Link to="/" className="link">
              STORE
            </Link>
          </div>
          <div className="left">
            <ul className="ul-item hidden lg:flex">
              <li className="flex">
                <img
                  src="assets/egypt.png"
                  className="w-6 object-cover"
                  alt=""
                />
                <ExpandMoreIcon className="cursor-pointer" />
              </li>
              <li className="flex">
                USD
                <ExpandMoreIcon className="cursor-pointer" />
              </li>
            </ul>
          </div>
          <div className="wrapper">
            <ul className="ul-item hidden lg:flex">
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

            <div className="center text-2xl">
              <Link to="/" className="link">
                STORE
              </Link>
            </div>

            <ul className="ul-item">
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
              <li className="relative flex items-center gap-1">
                <input
                  type="search"
                  name="searchItem"
                  id=""
                  className="searchBar"
                  autoFocus
                  ref={searchBar}
                />
                <SearchOutlinedIcon
                  onClick={(e) =>
                    searchBar.current.classList.toggle("showSearchBar")
                  }
                  className="cursor-pointer"
                />
              </li>
              <li>
                <Link to="/admin">
                  <PersonOutlineOutlinedIcon className="cursor-pointer" />
                </Link>
              </li>
              <li>
                <FavoriteBorderOutlinedIcon className="cursor-pointer hover:text-red-600" />
              </li>
            </ul>
          </div>

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
            <div className="md:hidden">
              <MenuIcon
                className="hidden"
                onClick={(e) => setcontrolMobileMenu(true)}
              />
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
