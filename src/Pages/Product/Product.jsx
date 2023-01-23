import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/cartSlice";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import Loading from "../../components/Loading/Loading";
//fire base
import { db } from "../../Firebase/index";
import { onSnapshot, doc } from "firebase/firestore";
/// end firebase
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  
  const dispatch = useDispatch();
  const id = useParams().id;
  const [item, setItem] = useState({});
  const [itemCount, setItemCount] = useState(1);
  const [mainImage, setMainImg] = useState("img");

  useEffect(() => {
    const docRef = doc(db, "products", id);
    onSnapshot(docRef, (doc) => {
      setItem({ ...doc.data(), id: doc.id });
    });
  }, []);

  const addToCart = () => {
    dispatch(addProduct({ ...item, itemCount }));
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
    <div className="theContainer mt-24 ">
      <div className="sectionWrapper bg-white p-4 rounded-md">
        <div className="product flex  h-auto md:h-screen flex-col md:flex-row ">
          <div className="product-left flex-1 flex">
            <div className="imgList basis-1/4 px-4 flex flex-col gap-4 cursor-pointer">
              <img
                src={item?.img}
                alt=""
                className="bg-img rounded"
                onClick={() => setMainImg("img")}
              />
              <img
                src={item?.img2}
                alt=""
                className="bg-img rounded"
                onClick={() => setMainImg("img2")}
              />
            </div>
            <div className="mainImg basis-3/4 h-3/4 bg-img rounded">
              <img
                src={item?.[mainImage]}
                alt=""
                className="h-full object-cover w-full"
              />
            </div>
          </div>
          <div className="product-right flex-1 flex flex-col items-start p-5 gap-5">
            <h2 className=" text-xl f capitalize">{item?.title}</h2>
            <div className="price flex flex-col">
              <span className=" text-sky-500 text-4xl font-bold ml-2">
                ${item?.price}
              </span>
              <span className=" text-gray-500 text-md line-through">
                ${item?.price + 20}
              </span>
            </div>
            <p className="text-sm">{item?.des}</p>
            <div className="itemCount flex  items-center">
              <button
                onClick={() =>
                  setItemCount((prev) => (prev !== 1 ? --prev : prev))
                }
                className=" bg-slate-400 p-3 cursor-pointer w-10 h-10 flex items-center justify-center rounded-md text-white font-bold text-2xl"
              >
                -
              </button>
              <span className="w-10 h-10 flex items-center justify-center font-semibold">
                {itemCount}
              </span>
              <button
                onClick={() => setItemCount((prev) => ++prev)}
                className=" bg-slate-400 p-3 cursor-pointer w-10 h-10 flex items-center justify-center rounded-md text-white font-bold text-2xl"
              >
                +
              </button>
            </div>
            <button
              className="px-20 py-2 bg-sky-500 text-white my-3"
              onClick={addToCart}
            >
              <AddShoppingCartOutlinedIcon /> Add to cart
            </button>
            <div className="addOptions flex gap-3 text-sky-500">
              <div className="optionOne">
                <FavoriteBorderOutlinedIcon /> Add to wish list
              </div>
              <div className="optionTwo">
                <BalanceOutlinedIcon /> Add to compare
              </div>
            </div>
            <div className="right-footer w-full">
              <div className="moreInfo flex flex-col text-gray-600 mt-5 py-4 border-b-gray-400 border-b w-full">
                <span>vendor: elbahnsawy</span>
                <span>product type: {item?.sub_category}</span>
                <span>tage: best,trending,top</span>
              </div>
              <div className="links flex flex-col text-gray-600 w-fit">
                <span className=" border-b-gray-400 border-b capitalize py-2">
                  description
                </span>
                <span className="py-2 border-b-gray-400 border-b capitalize">
                  additional information
                </span>
                <span className=" capitalize">faq</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
