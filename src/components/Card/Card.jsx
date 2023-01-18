import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";
const Card = ({ item }) => {
  return (
    <Link to={"/product/" + item.id}>
      <div className="card">
        {item.attributes.isNew && <span className="newseason">New Season</span>}
        <div className="image">
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item?.attributes.img.data.attributes.url
            }
            alt=""
          />
          <img
            src={
              process.env.REACT_APP_UPLOAD_URL +
              item?.attributes.img2.data.attributes.url
            }
            alt=""
          />
        </div>
        <div className="cardFooter">
          <p className="title">{item?.attributes.title}</p>
          <div className="price">
            <span className="old">
              ${item.attributes.oldPrice || item?.attributes.price + 20}
            </span>
            <span className="current">${item?.attributes.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
