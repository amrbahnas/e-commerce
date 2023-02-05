import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { daleteProduct, resetCart } from "../../store/cartSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import FeaturedProducts from "./../../components/FeaturedProducts/FeaturedProducts";
const Cart = () => {
  const dispatch = useDispatch();
  const { data, totalPrice } = useSelector((store) => store.cartSlice);
  const { login } = useSelector((store) => store.AuthSlice);
  const deleteHandler = (id, price) => {
    const res = window.confirm("Are you sure you want to delete");
    if (res) {
      dispatch(daleteProduct({ id, price }));
    }
  };
  const resetHandler = () => {
    if(window.confirm("Are you sure ? you will lose all items")){
      dispatch(resetCart());
      
    }
  };

  return (
    <div className={`${styles.cart} mt-24 `}>
      <div className="theContainer ">
        <div
          className={`${styles.wrapper}  md:p-3 bg-white rounded-md  capitalize`}
        >
          <div
            className={`${styles.header} flex justify-between gap-2 p-2 border-b-4 border-img`}
          >
            <Link to="/">
              <span className="cursor-pointer hover:text-orange-400">
                continue shopping
              </span>
            </Link>
            <span className="font-medium capitalize ">{data.length} items</span>
            <span className="hidden md:block">
              need help ? call (+20) 106-448-0375
            </span>
          </div>
          <div
            className={`${styles.body} flex flex-wrap gap-2 md:p-4  border-b-4 border-img`}
          >
            <div
              className={`${styles.left} flex-1 md:p-2 flex flex-col  gap-3   overflow-y-scroll`}
            >
              {data.length === 0 ? (
                <div className="text-center ">Empty</div>
              ) : (
                data?.map((item) => {
                  return (
                    <div
                      className="flex items-center justify-center w-full gap-4 p-2 border-2 item border-img"
                      key={item.id}
                    >
                      <img
                        src={item.previewImg}
                        alt=""
                        className="w-6 basis-1/6"
                      />
                      <div className="flex-1 info">
                        <Link to={"/product/" + item.id}>
                          <h3 className="mb-3 text-gray-700 underline capitalize cursor-pointer decoration-1 underline-offset-4">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-gray-500">
                          {item.des?.substring(0, 50)}
                        </p>
                        <span className="price text-sky-700 text-md">
                          {item.itemCount} x ${item.price}
                        </span>
                      </div>
                      <div
                        className="text-center text-red-600 cursor-pointer delete basis-1/6 hover:scale-105"
                        onClick={(e) => deleteHandler(item.id, item.price)}
                      >
                        <DeleteOutlineIcon />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            <div
              className={`${styles.right} w-full lg:w-80  h-full flex flex-col mt-5 md:mt-0 p-2 sticky top-24 `}
            >
              <div className={`${styles.promoCode} flex flex-col gap-2 mb-4`}>
                <span>enter promo code</span>
                <div className={`${styles.promoInput} flex gap-2`}>
                  <input
                    type="text"
                    name="promoCode"
                    placeholder="promo code"
                    className="flex-1 p-2 border-2 rounded-md border-img focus:outline-none"
                  />
                  <button className="w-24 p-2 text-white bg-black rounded-md ">
                    submit
                  </button>
                </div>
                {!login && (
                  <span>
                    <span className="mr-1 underline cursor-pointer text-buttonBg">
                      <Link to="user/login">signin</Link>
                    </span>
                    to your account to see available rewards
                  </span>
                )}
              </div>
              <div className={`${styles.promotions}`}>
                <span className="block mb-2 text-lg font-bold ">
                  promotions
                </span>
                <div className={`${styles.priceDetails}`}>
                  <ul className={`${styles.ul}`}>
                    <li className="py-2 border-b">
                      <span>free shipping on orders $ 39+</span>
                      <span> -$18.97</span>
                    </li>
                    <li>
                      <span>shipping const</span>
                      <span>19$</span>
                    </li>
                    <li>
                      <span>shipping discount</span>
                      <span>19$</span>
                    </li>
                    <li>
                      <span>estimated stales tax</span>
                      <span>19$</span>
                    </li>
                    <li>
                      <span>estimated total</span>
                      <span>{totalPrice}$</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`${styles.checkout}`}>
                <button>checkout</button>
              </div>
              <span
                className="block mt-4 text-sm text-red-600 capitalize cursor-pointer "
                onClick={resetHandler}
              >
                reset cart
              </span>
            </div>
          </div>
        </div>
      </div>
      <FeaturedProducts title="you may also like" type="normal" />
    </div>
  );
};

export default Cart;
