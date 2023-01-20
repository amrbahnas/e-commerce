import React, { useRef } from "react";
import styles from "./AddProduct.module.css";
import { addProduct } from "../../Firebase/index";
const AddProduct = () => {
  const title = useRef();
  const des = useRef();
  const img = useRef();
  const img2 = useRef();
  const price = useRef();
  const category = useRef();
  const sub_category = useRef();
  const isNew = useRef();
  const type = useRef();
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(title.current.value);
    const data = {
      title: title.current.value,
      des: des.current.value,
      img: img.current.value,
      img2: img2.current.value,
      price: +price.current.value,
      category: category.current.value,
      sub_category: sub_category.current.value,
      isNew: true,
      type: type.current.value,
    };
    addProduct(data);

  };
  return (
    <div className="theContainer">
      <div className={`${styles.wrapper}`}>
        <form onSubmit={(e) => submitHandler(e)}>
          <div className={`${styles.row}`}>
            <label htmlFor="title" className={`${styles.label}`}>
              title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              ref={title}
              className={`${styles.inputText}`}
            />
          </div>

          <div className={`${styles.row}`}>
            <label htmlFor="des" className={`${styles.label}`}>
              des
            </label>
            <input
              type="text"
              name="des"
              id="des"
              ref={des}
              className={`${styles.inputText}`}
            />
          </div>
          <div className={`${styles.row}`}>
            <label htmlFor="img" className={`${styles.label}`}>
              img
            </label>
            <input
              type="text"
              name="img"
              id="img"
              ref={img}
              className={`${styles.inputText}`}
            />
          </div>
          <div className={`${styles.row}`}>
            <label htmlFor="img2" className={`${styles.label}`}>
              img2
            </label>
            <input
              type="text"
              name="img2"
              id="img2"
              ref={img2}
              className={`${styles.inputText}`}
            />
          </div>
          <div className={`${styles.row}`}>
            <label htmlFor="price" className={`${styles.label}`}>
              price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              ref={price}
              className={`${styles.inputText}`}
            />
          </div>
          <div className={`${styles.row}`}>
            <label htmlFor="category" className={`${styles.label}`}>
              category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              ref={category}
              className={`${styles.inputText}`}
            />
          </div>
          <div className={`${styles.row}`}>
            <label htmlFor="sub_category" className={`${styles.label}`}>
              sub_category
            </label>
            <input
              type="text"
              name="sub_category"
              id="sub_category"
              ref={sub_category}
              className={`${styles.inputText}`}
            />
          </div>
          <div className={`${styles.row}`}>
            <label htmlFor="isNew" className={`${styles.label}`}>
              isNew
            </label>
            <input
              type="text"
              name="isNew"
              id="isNew"
              ref={isNew}
              className={`${styles.inputText}`}
            />
          </div>
          <div className={`${styles.row}`}>
            <label htmlFor="type" className={`${styles.label}`}>
              type
            </label>
            <input
              type="text"
              name="type"
              id="type"
              ref={type}
              className={`${styles.inputText}`}
            />
          </div>

          <button type="submit" className={`${styles.submit}`}>
            add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
