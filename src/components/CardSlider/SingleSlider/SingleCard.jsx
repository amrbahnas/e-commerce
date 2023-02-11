import React, { useEffect, useState } from "react";
// react router
import { Link } from "react-router-dom";
// redux
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../../../store/cartSlice";

// firebase
import { dowunloadImage } from "../../../Firebase/Store";
//icon
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PreviewIcon from "@mui/icons-material/Preview";
import ProductPreview from "../../ProductPreview/ProductPreview";
// message
import { toast } from "react-toastify";
// css
import "./SingleCard.css";
/************************************* start ************************************************** */
const SingleCard = ({ item }) => {
  const dispatch = useDispatch();

  // get global state
  const { admin } = useSelector((store) => store.AuthSlice);
  // state for carry the image of the card
  const [img1, setImg1] = useState(null);
  const [previewProduct, setPreviewProduct] = useState(false);

  // fetch the card image
  useEffect(() => {
    const path = "products-images/";
    dowunloadImage(path + item.img).then((img) => {
      setImg1(img);
    });
  }, [item.img]);
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

  /************************************* DOM ************************************************** */
  return (
    
      <div className="singleCard">
        <Link to={"/product/" + item.id}>
          <img src={img1} alt="" className="skeleton" />
        </Link>
        <div className="info">
          <Link to={"/product/" + item.id}>
            <h3 className="mb-2 whitespace-nowrap ">{item.title}</h3>
          </Link>
          <span className="block text-lg font-bold">${item.price}</span>
          <span className="text-sm text-gray-500 line-through ">
            ${+item.price + 20}
          </span>
        </div>
        <div className="conrolsButton">
          <div className="button" onClick={(e) => setPreviewProduct(true)}>
            <PreviewIcon />
          </div>
          <div className="button" onClick={addToCart}>
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
        {previewProduct && (
          <ProductPreview
            item={item}
            img1={img1}
            setPreviewProduct={setPreviewProduct}
          />
        )}
      </div>
    
  );
};

export default SingleCard;
