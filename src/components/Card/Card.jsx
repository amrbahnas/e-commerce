import React, { useState, useEffect } from "react";
// react router
import { Link } from "react-router-dom";
// redux
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../store/cartSlice";
// framer motion
import { motion } from "framer-motion";
// icons
import StarIcon from "@mui/icons-material/Star";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
//firebase
import { dowunloadImage } from "../../Firebase/Store";
// tost message
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// css file
import "./Card.css";
import ProductPreview from "../ProductPreview/ProductPreview";
const Card = ({ item }) => {
  const dispatch = useDispatch();
  const { admin } = useSelector((store) => store.AuthSlice);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(false);

  useEffect(() => {
    const path = "products-images/";
    dowunloadImage(path + item.img).then((img) => {
      setImg1(img);
    });
    dowunloadImage(path + item.img2).then((img) => {
      setImg2(img);
    });
  }, [item.img, item.img2]);

  const addToCart = () => {
    dispatch(addProduct({ ...item, previewImg: img1, itemCount: 1 }));
    toast.success("Item Added", {
      position: "bottom-right",
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
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="card "
      >
        {item.isNew && <span className="newseason">New Season</span>}
        <Link to={"/product/" + item.id}>
          <div className="overflow-hidden image">
            <img
              src={img1}
              alt=""
              className="transition-all duration-400 hover:scale-110 skeleton"
            />
            <img src={img2} alt="" className="hover:scale-105" />
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
        <div className="conrolsButton">
          <div
            className="previewProduct"
            onClick={(e) => setPreviewProduct(true)}
          >
            <PreviewIcon />
          </div>
          <div className="addToCard" onClick={addToCart}>
            <AddShoppingCartIcon />
          </div>
        </div>
        {admin && (
          <Link to={"/admin/edditproduct/" + item.id} target="_blank">
            <div className="editProduct">
              <EditIcon />
            </div>
          </Link>
        )}
      </motion.div>
      {previewProduct && (
        <ProductPreview
          item={item}
          img1={img1}
          setPreviewProduct={setPreviewProduct}
        />
      )}
    </>
  );
};

export default Card;
