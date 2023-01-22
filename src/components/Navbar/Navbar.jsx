import { useState } from "react";
import { useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Cart from "./../Cart/Cart";
import MobileMenu from "../mobileMenu/MobileMenu";
const Navbar = () => {
  const { data } = useSelector((store) => store.cartSlice);

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
            <ul className="ul-item hidden md:flex">
              <li className="flex">
                <img
                  src={require("../../assets/egypt.png")}
                  className="w-6 object-cover"
                  alt=""
                />
                <ExpandMoreIcon className="cursor-pointer" />
              </li>
              <li>
                USD
                <ExpandMoreIcon className="cursor-pointer" />
              </li>
            </ul>
          </div>
          <div className="wrapper">
            <ul className="ul-item">
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
              <li>
                <SearchOutlinedIcon className="cursor-pointer" />
              </li>
              <li>
                <Link to="/admin">
                  <PersonOutlineOutlinedIcon className="cursor-pointer" />
                </Link>
              </li>
              <li>
                <FavoriteBorderOutlinedIcon className="cursor-pointer" />
              </li>
            </ul>
          </div>

          <div className="flex gap-10 navRight ">
            <div
              className="relative cursor-pointer"
              onClick={(e) => setCartControl(!cartControl)}
            >
              <ShoppingCartOutlinedIcon className="cursor-point" />
              <span className="count">{data.length}</span>
            </div>
            <div className="md:hidden">
              <MenuIcon
                className="hidden"
                onClick={(e) => setcontrolMobileMenu(true)}
              />
            </div>
          </div>
          {cartControl && <Cart setCartControl={setCartControl} />}
          {controlMobileMenu && (
            <MobileMenu setcontrolMobileMenu={setcontrolMobileMenu} />
          )}
        </div>
      </div>
    </div>
  );
          };
          
          export default Navbar;
          