import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./AddUpdateProduct.module.css";
import { addProduct, updataProduct } from "../../Firebase/index";
import { toast } from "react-toastify";
//fire base
import { db } from "../../Firebase/index";
import { onSnapshot, doc, getDoc } from "firebase/firestore";
/// end firebase
const AddUpdateProduct = () => {
  const [isNew, setIsNew] = useState(false);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [img, setImg] = useState("");
  const [img2, setImg2] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [type, setType] = useState("");

  const isNewHandler = (e) => {
    setIsNew(!!+e.target.value);
    e.target.classList.toggle("active");
  };

  const id = useParams().id;

  //fetch product data from if (id)
  useEffect(() => {
    if (id) {
      const docRef = doc(db, "products", id);
      onSnapshot(docRef, (doc) => {
        const data = doc.data();
        setIsNew(data.isNew);
        setTitle(data.title);
        setDes(data.des);
        setImg(data.img);
        setImg2(data.img2);
        setPrice(data.price);
        setCategory(data.category);
        setSubCategory(data.sub_category);
        setType(data.type);
      });
    } else {
      setIsNew(false);
      setTitle("");
      setDes("");
      setImg("");
      setImg2("");
      setPrice("");
      setCategory("");
      setSubCategory("");
      setType("");
    }
  }, [id]);

  //on submit form update or add product
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      title,
      des,
      img,
      img2,
      price,
      category,
      sub_category: subCategory,
      isNew,
      type,
    };
    if (id) {
      updataProduct(id, data);
      toast.success("Product updated", {
        position: "top-right",
        autoClose: 1200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
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
    }
  };
  return (
    <div className="flex flex-wrap items-start justify-center gap-2">
      {id && (
        <div className=" w-40 h-40 rounded-full overflow-hidden mt-4">
          <img src={img} alt="" className="w-full h-full" />
        </div>
      )}
      <form className={`${styles.wrapper}`} onSubmit={(e) => submitHandler(e)}>
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={des}
              onChange={(e) => setDes(e.target.value)}
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
              value={img}
              onChange={(e) => setImg(e.target.value)}
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
              value={img2}
              onChange={(e) => setImg2(e.target.value)}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
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
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
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
              value={type}
              onChange={(e) => setType(e.target.value)}
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
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddUpdateProduct;
