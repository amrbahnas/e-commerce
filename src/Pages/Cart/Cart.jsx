import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { daleteProduct, resetCart } from "../../store/cartSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import styles from "./Cart.module.css";
import FeaturedProducts from "./../../components/FeaturedProducts/FeaturedProducts";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //calc price
  const { data, totalPrice } = useSelector((store) => store.cartSlice);
  const tax = totalPrice * 0.05;
  const promoCode = 0.1 * totalPrice;
  const discount = totalPrice * 0.2;
  const [finalPrice, setFinalPrice] = useState(totalPrice + tax - discount);
  const [usePromoCode, setUsePromoCode] = useState(false);
  //
  const { login } = useSelector((store) => store.AuthSlice);
  const [cartEmpty, setCartEmpty] = useState(false);

  // promocode
  const promocodeInput = useRef();
  const discountHandler = (e) => {
    if (promocodeInput.current.value) {
      promocodeInput.current.disabled=true;
      setFinalPrice((prev) => prev - Math.ceil(prev * 0.2));
      setUsePromoCode(true);
      e.target.disabled = true;
      e.target.style.backgroundColor = "#0000009e";
    }
  };

  // delete product
  const deleteHandler = (id, price) => {
    const res = window.confirm("Are you sure you want to delete");
    if (res) {
      dispatch(daleteProduct({ id, price }));
    }
  };

  const checkoutHandler = () => {
    if (totalPrice === 0) {
      setCartEmpty(true);
    } else if (login && totalPrice > 0) {
      navigate("/checkout/shopingAddress");
    } else {
      navigate("/user/login");
    }
  };
  const resetHandler = () => {
    if (data.length > 0) {
      if (window.confirm("Are you sure ? you will lose all items")) {
        dispatch(resetCart());
      }
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
                <div className="flex flex-col items-center justify-center w-full p-2 mt-4 ">
                  <span>Your cart is empty!</span>
                  <img src="assets/cartEmpty.png" alt="" />
                </div>
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
                    ref={promocodeInput}
                    placeholder="promo code"
                    className="flex-1 p-2 border-2 rounded-md border-img focus:outline-none"
                  />
                  <button
                    className="w-24 p-2 text-white bg-black rounded-md "
                    onClick={(e) => discountHandler(e)}
                  >
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
                    {usePromoCode && (
                      <li className=" text-green-500">
                        <span>promo code</span>
                        <span>$ -{promoCode}</span>
                      </li>
                    )}
                    <li>
                      <span>estimated stales tax</span>
                      <span>${tax}</span>
                    </li>
                    <li>
                      <span>shipping discount</span>
                      <span>$ -{discount}</span>
                    </li>
                    <li>
                      <span>estimated total</span>
                      <span className="font-bold">$ {finalPrice}</span>
                    </li>
                  </ul>
                </div>
              </div>
              {cartEmpty && (
                <div className="mb-2 text-red-500 ">
                  Your Cart Is Empty.
                  <span className="ml-1 text-black underline ">
                    <Link to="/">Shopping now!</Link>
                  </span>
                </div>
              )}
              <div
                className={`${styles.checkout}`}
                onClick={(e) => checkoutHandler()}
              >
                <button>checkout</button>
              </div>
              <span
                className="block mt-4 text-sm text-red-600 capitalize cursor-pointer w-fit hover:underline "
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
