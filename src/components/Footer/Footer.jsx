import React from "react";
import "./Footer.css";
const Footer = () => {
  /************************************* DOM ************************************************** */
  return (
    <div className="footer" id="footer">
      <div className="theContainer">
        <div className="top">
          <div className="box">
            <h2 className="title">categories</h2>
            <ul>
              <li>electronics</li>
              <li>men</li>
              <li>sports</li>
              <li>accessories</li>
              <li>new arrivals</li>
            </ul>
          </div>
          <div className="box">
            <h2 className="title">links</h2>
            <ul>
              <li>Faq</li>
              <li>pages</li>
              <li>stores</li>
              <li>compare</li>
              <li>cookis</li>
            </ul>
          </div>
          <div className="box">
            <h2 className="title">About</h2>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Perspiciatis
            </span>
          </div>
          <div className="box">
            <h2 className="title">contact</h2>
            <span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Doloremque ipsa, ex pariatur, Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Doloremque ipsa, ex pariatur,
            </span>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <h2>store</h2>
            <p className="text-center md:text-left">
              @copyright 2023 all rights reserved
            </p>
          </div>
          <div className="right">
            <img src="assets/payment.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
