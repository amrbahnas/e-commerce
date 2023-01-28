import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/cartSlice";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import "./Card.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Card = ({ item }) => {
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.AuthSlice);
  const addToCart = () => {
    dispatch(addProduct({ ...item, itemCount: 1 }));
    toast.success("Item Added", {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="card ">
      {item.isNew && <span className="newseason">New Season</span>}
      <Link to={"/product/" + item.id}>
        <div className="image overflow-hidden">
          <img
            src={item?.img}
            alt=""
            className=" transition-all duration-400 hover:scale-110"
          />
          {/*<img src={item?.img2} alt="" className="hover:scale-105" />*/}
        </div>
      </Link>
      <div className="cardFooter">
        <Link to={"/product/" + item.id}>
          <h2 className="title">{item?.title.substr(0, 25)}</h2>
        </Link>
        <div className="stars">
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
        </div>
        <div className="price">
          <span className="old">${item.oldPrice || item?.price + 20}</span>
          <span className="current">${item?.price}</span>
        </div>
      </div>
      <div className="addToCard" onClick={addToCart}>
        <AddShoppingCartIcon />
      </div>
      {admin && (
        <Link to={"/admin/edditproduct/" + item.id} target="_blank">
          <div className="editProduct">
            <EditIcon />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Card;
