import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./AddUpdateProduct.module.css";
import { addProduct, updataProduct, category } from "../../Firebase/index";
import { toast } from "react-toastify";
//fire base
import { db } from "../../Firebase/index";
import { onSnapshot, doc, query } from "firebase/firestore";
/// end firebase
const AddUpdateProduct = () => {
  //inputs variables
  const [isNew, setIsNew] = useState(false);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [img, setImg] = useState("");
  const [img2, setImg2] = useState("");
  const [price, setPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [type, setType] = useState("");
  // all categories we have
  const [categories, setCategories] = useState([]);
  // all subcategory in selected category
  const [subCategory, setSubCategory] = useState([]);
  // for check we at add or update product page
  const id = useParams().id;

  const isNewHandler = (e) => {
    setIsNew(!!+e.target.value);
    e.target.classList.toggle("active");
  };

  // show  sub_category of selected category
  const productCategoryChangeHandler = (e) => {
    const value = e.target.value;
    setProductCategory(value);
    setSubCategory(
      categories.filter((el) => el.title === value)[0]?.sub_category
    );
  };

  //fetch product data from if (id)
  useEffect(() => {
    // target collection
    const q = query(category);
    // reset category state
    setCategories([]);
    // variables carry fetch results , we need this variable twice
    const fetchedCategory = [];
    // push result into variables
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        fetchedCategory.push({ ...doc.data(), id: doc.id });
      });
      // set category state with fetched categories (first used)
      setCategories(fetchedCategory);
      if (id) {
        // we at update product page
        const docRef = doc(db, "products", id);
        onSnapshot(docRef, (doc) => {
          const data = doc.data();
          setIsNew(data.isNew);
          setTitle(data.title);
          setDes(data.des);
          setImg(data.img);
          setImg2(data.img2);
          setPrice(data.price);
          setProductCategory(data.category);
          // set subCategory state indepent on fetched categories (second used)
          setSubCategory(
            fetchedCategory.filter((el) => el.title === data.category)[0]
              .sub_category
          );
          setProductSubCategory(data.sub_category);
          setType(data.type);
        });
      } else {
        setIsNew(false);
        setTitle("");
        setDes("");
        setImg("");
        setImg2("");
        setPrice("");
        setProductCategory("");
        setProductSubCategory("");
        setType("");
      }
    });
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
      sub_category: productSubCategory,
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
              value={productCategory}
              onChange={(e) => productCategoryChangeHandler(e)}
              className={`${styles.select}`}
              required
            >
              <option value="">Please choose an option</option>
              {categories.map((el) => (
                <option value={el.title} key={el.id}>
                  {el.title}
                </option>
              ))}
            </select>
          </div>
          <div className={`${styles.col}`}>
            <label htmlFor="sub_category" className={`${styles.label}`}>
              sub_category
            </label>
            <select
              id="sub_category"
              name="sub_category"
              value={productSubCategory}
              onChange={(e) => setProductSubCategory(e.target.value)}
              className={`${styles.select}`}
              required
            >
              <option value="">Please choose an option</option>
              {subCategory?.map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
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
