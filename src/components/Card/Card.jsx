import React from "react";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import { motion } from "framer-motion";
import "./Card.css";
const Card = ({ item }) => {
  return (
    <Link to={"/product/" + item.id}>
      <div className="card ">
        {item.isNew && <span className="newseason">New Season</span>}
        <div className="image overflow-hidden">
          <img
            src={item?.img}
            alt=""
            className=" transition-all duration-400 hover:scale-110"
          />
          {/*<img src={item?.img2} alt="" className="hover:scale-105" />*/}
        </div>
        <div className="cardFooter">
          <h2 className="title">{item?.title.substr(0, 30)}</h2>
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
      </div>
    </Link>
  );
};

export default Card;
