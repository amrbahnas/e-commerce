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
