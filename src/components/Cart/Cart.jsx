import React, { useEffect } from "react";
import styles from "./Cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { daleteProduct, resetCart } from "../../store/cartSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useRef } from "react";
const Cart = ({ setCartControl }) => {
  const dispatch = useDispatch();
  const { data, totalPrice } = useSelector((store) => store.cartSlice);

  // target cart element
  const menu = useRef();

  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!menu.current.contains(e.target)) {
        // change state to false , because the state at the parrent component
        setCartControl(false);
      }
    };

    document.addEventListener("mousedown", handler);

    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };  
  });

  const deleteHandler = (id, price) => {
    dispatch(daleteProduct({ id, price }));
  };
  const resetHandler = () => {
    dispatch(resetCart());
  };

  return (
    <div className={`${styles.cart}`} ref={menu}>
      <h2 className=" capitalize text-2xl text-center md:text-left ">
        products in your cart
      </h2>
      {data.length === 0 ? (
        <div className=" text-center">Empty</div>
      ) : (
        data?.map((item) => {
          return (
            <div
              className="item w-full flex items-center justify-center gap-4 shadow-md p-1"
              key={item.id}
            >
              <img
                src={item.img}
                alt=""
                className=" w-6 basis-1/6"
              />
              <div className="info flex-1">
                <h3 className="mb-3 capitalize text-gray-700">
                  {item.title}
                </h3>
                <p className="text-gray-500">{item.des?.substring(0, 100)}</p>
                <span className="price text-sky-700 text-md">
                  {item.itemCount} x ${item.price}
                </span>
              </div>
              <div
                className="delete basis-1/6 text-red-600 text-center cursor-pointer"
                onClick={(e) => deleteHandler(item.id, item.price)}
              >
                <DeleteOutlineIcon />
              </div>
            </div>
          );
        })
      )}
      <div className="cartFooter flex flex-col justify-between  h-28 mt-5">
        <div className="subtotal flex justify-between items-center">
          <span className=" uppercase text-lg">subtotal</span>
          <span className=" text-lg">${totalPrice}</span>
        </div>
        <div className="flex justify-center md:justify-start">
          <button className="text-white bg-sky-800 w-4/5  px-8 py-2 uppercase text-sm font-bold">
            proceed to checkout
          </button>
        </div>
        <span
          className=" capitalize text-sm cursor-pointer text-red-600"
          onClick={resetHandler}
        >
          reset cart
        </span>
      </div>
    </div>
  );
};

export default Cart;
