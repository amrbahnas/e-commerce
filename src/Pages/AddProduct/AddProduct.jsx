import React, { useRef, useState } from "react";
import styles from "./AddProduct.module.css";
import { addProduct } from "../../Firebase/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
const AddProduct = () => {
  const [isNew, setIsNew] = useState(false);
  const title = useRef();
  const des = useRef();
  const img = useRef();
  const img2 = useRef();
  const price = useRef();
  const category = useRef();
  const subCategory = useRef();
  const type = useRef();

  const isNewHandler = (e) => {
    setIsNew(!!+e.target.value);
    e.target.classList.toggle("active");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      des: des.current.value,
      img: img.current.value,
      img2: img2.current.value,
      price: +price.current.value,
      category: category.current.value,
      sub_category: subCategory.current.value,
      isNew,
      type: type.current.value,
    };
    addProduct(data);
    toast.success("Product Added", {
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
    <div className={`${styles.admin}`}>
      <div className="theContainer">
        <div className={styles.processTitle}>add new product</div>
        <form
          className={`${styles.wrapper}`}
          onSubmit={(e) => submitHandler(e)}
        >
          <div className={`${styles.row}`}>
            <div className={`${styles.col}`}>
              <label htmlFor="title" className={`${styles.label}`}>
                title
              </label>
              <input
                required
                type="text"
                name="title"
                id="title"
                ref={title}
                className={`${styles.inputText}`}
              />
            </div>

            <div className={`${styles.col}`}>
              <label htmlFor="des" className={`${styles.label}`}>
                des
              </label>
              <textarea
                required
                id="des"
                name="des"
                ref={des}
                className={`${styles.textArea}`}
              />
            </div>
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.col}`}>
              <label htmlFor="img" className={`${styles.label}`}>
                img
              </label>
              <input
                required
                type="text"
                name="img"
                id="img"
                ref={img}
                className={`${styles.inputText}`}
              />
            </div>
            <div className={`${styles.col}`}>
              <label htmlFor="img2" className={`${styles.label}`}>
                img2
              </label>
              <input
                required
                type="text"
                name="img2"
                id="img2"
                ref={img2}
                className={`${styles.inputText}`}
              />
            </div>
          </div>
          <div className={`${styles.row} ${styles.price}`}>
            <label htmlFor="price" className={`${styles.label}`}>
              price
            </label>
            <input
              required
              type="number"
              name="price"
              id="price"
              ref={price}
              className={`${styles.inputText} flex-1 md:w-2/5`}
            />
          </div>
          <div className={`${styles.row}`}>
            <div className={styles.col}>
              <label htmlFor="category" className={`${styles.label}`}>
                category
              </label>
              <select
                id="category"
                name="category"
                ref={category}
                className={`${styles.select}`}
                required
              >
                <option value="">Please choose an option</option>
                <option value="men">men</option>
                <option value="woman">woman</option>
                <option value="children">children</option>
                <option value="accessories">accessories</option>
              </select>
            </div>
            <div className={`${styles.col}`}>
              <label htmlFor="sub_category" className={`${styles.label}`}>
                sub_category
              </label>
              <select
                id="sub_category"
                name="sub_category"
                ref={subCategory}
                className={`${styles.select}`}
                required
              >
                <option value="">Please choose an option</option>
                <option value="hat">hat</option>
                <option value="t-shirt">t-shirt</option>
                <option value="watches">watches</option>
                <option value="phones">phones</option>
                <option value="glasses">glasses</option>
                <option value="headphones">headphones</option>
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.col}`}>
              <label htmlFor="type" className={`${styles.label}`}>
                type
              </label>
              <select
                id="type"
                name="type"
                ref={type}
                className={`${styles.select}`}
                required
              >
                <option value="">Please choose an option</option>
                <option value="trending">trending</option>
                <option value="featured">featured</option>
                <option value="normal">normal</option>
              </select>
            </div>
            <div className={`${styles.col}`}>
              <label htmlFor="isNew" className={`${styles.label}`}>
                isNew
              </label>
              <div className={`${styles.choose}`}>
                <button
                  type="button"
                  value="0"
                  className={`${!isNew && styles.active}`}
                  onClick={(e) => isNewHandler(e)}
                >
                  false
                </button>
                <button
                  type="button"
                  value="1"
                  className={`${isNew && styles.active}`}
                  onClick={(e) => isNewHandler(e)}
                >
                  true
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className={`${styles.submit}`}>
            submit
          </button>
        </form>
      </div>
      <ToastContainer />
      <Link to="/" className={styles.goBACK}>
        <ArrowBackIosIcon />
      </Link>
    </div>
  );
};

export default AddProduct;
