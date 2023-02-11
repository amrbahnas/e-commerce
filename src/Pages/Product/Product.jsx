import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/cartSlice";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import BalanceOutlinedIcon from "@mui/icons-material/BalanceOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import Loading from "../../components/Loading/Loading";
//fire base
import { dowunloadImage } from "../../Firebase/Store";
import { db } from "../../Firebase/index";
import { onSnapshot, doc } from "firebase/firestore";
/// end firebase
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Product = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const [item, setItem] = useState({});
  const [itemCount, setItemCount] = useState(1);
  const [added, setAdded] = useState(false);
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [mainImage, setMainImg] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "products", id);
    const data = [];
    onSnapshot(docRef, (doc) => {
      data.push({ ...doc.data(), id: doc.id });
      setItem(data[0]);
      const path = "products-images/";
      dowunloadImage(path + data[0].img).then((img) => {
        setImg1(img);
        setMainImg(img);
      });
      dowunloadImage(path + data[0].img2).then((img) => {
        setImg2(img);
      });
    });
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });

  const addToCart = (e) => {
    const product = { ...item, previewImg: img1, itemCount };
    dispatch(addProduct(product));
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <div className="mt-24 theContainer ">
      <Link to={-1}>
        <span className="mb-4 fixed  bg-amr text-white rounded-full shadow-md hover:scale-105 top-1/3 left-24 w-10 h-10 hidden md:flex items-center justify-center">
          <ArrowBackIcon fontSize="large" />
        </span>
      </Link>
      <div className="p-4 bg-white rounded-md sectionWrapper">
        <div className="flex flex-col h-auto product md:h-screen md:flex-row mt-8 ">
          <div className="flex flex-1 product-left">
            <div className="flex flex-col gap-4 px-4 cursor-pointer imgList basis-1/4">
              <img
                src={img1}
                alt=""
                className="object-cover rounded bg-img skeleton"
                onClick={() => setMainImg(img1)}
              />
              <img
                src={img2}
                alt=""
                className="object-cover rounded bg-img skeleton"
                onClick={() => setMainImg(img2)}
              />
            </div>
            <div className="rounded mainImg basis-3/4 h-3/4 bg-img">
              <img
                src={mainImage}
                alt=""
                className="object-cover w-full h-full skeleton"
              />
            </div>
          </div>
          <div className="flex flex-col items-start flex-1 gap-5 p-5 product-right">
            <h2 className="text-xl capitalize f">{item?.title}</h2>
            <div className="flex flex-col price">
              <span className="ml-2 text-4xl font-bold text-sky-500">
                ${item?.price}
              </span>
              <span className="text-gray-500 line-through text-md">
                ${item?.price + 20}
              </span>
            </div>
            <p className="text-sm">{item?.des}</p>
            <div className="flex items-center itemCount">
              <button
                onClick={() =>
                  setItemCount((prev) => (prev !== 1 ? --prev : prev))
                }
                className="flex items-center justify-center w-10 h-10 p-3 text-2xl font-bold text-white rounded-md cursor-pointer bg-slate-400"
              >
                -
              </button>
              <span className="flex items-center justify-center w-10 h-10 font-semibold">
                {itemCount}
              </span>
              <button
                onClick={() => setItemCount((prev) => ++prev)}
                className="flex items-center justify-center w-10 h-10 p-3 text-2xl font-bold text-white rounded-md cursor-pointer bg-slate-400"
              >
                +
              </button>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={` px-20 py-2 ${
                added ? " bg-green-600" : "bg-sky-500"
              } text-white my-3 hover:scale-105 rounded-md flex items-center`}
              onClick={(e) => addToCart(e)}
            >
              {added ? (
                <>
                  <CheckIcon /> {itemCount} Items Added
                </>
              ) : (
                <>
                  <AddShoppingCartOutlinedIcon /> Add to cart
                </>
              )}
            </motion.button>
            <div className="flex gap-3 addOptions text-sky-500">
              <div className="cursor-pointer optionOne">
                <FavoriteBorderOutlinedIcon /> Add to wish list
              </div>
              <div className="cursor-pointer optionTwo">
                <BalanceOutlinedIcon /> Add to compare
              </div>
            </div>
            <div className="w-full right-footer">
              <div className="flex flex-col w-full py-4 mt-5 text-gray-600 border-b moreInfo border-b-gray-400">
                <span>vendor: elbahnsawy</span>
                <span>product type: {item?.sub_category}</span>
                <span>tage: best,trending,top</span>
              </div>
              <div className="flex flex-col text-gray-600 links w-fit">
                <span className="py-2 capitalize border-b border-b-gray-400">
                  description
                </span>
                <span className="py-2 capitalize border-b border-b-gray-400">
                  additional information
                </span>
                <span className="capitalize ">faq</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
