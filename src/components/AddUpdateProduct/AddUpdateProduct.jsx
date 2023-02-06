import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./AddUpdateProduct.module.css";
// icons
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
// tost message
import { toast } from "react-toastify";
//fire base
import { db } from "../../Firebase/index";
import { onSnapshot, doc, query } from "firebase/firestore";
import { uploadImage, deleteImage, dowunloadImage } from "../../Firebase/Store";
import { addProduct, updataProduct, category } from "../../Firebase/index";
/// end firebase
// for generate random string
import { v4 } from "uuid";
const AddUpdateProduct = () => {
  //inputs variables
  const [isNew, setIsNew] = useState(false);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [price, setPrice] = useState(0);
  const [productCategory, setProductCategory] = useState("");
  const [productSubCategory, setProductSubCategory] = useState("");
  const [type, setType] = useState("");
  const [imgName1, setImgName1] = useState("");
  const [currentImgName1, setCurrentImgName1] = useState("");
  const [imgName2, setImgName2] = useState("");
  const [currentImgName2, setCurrentImgName2] = useState("");
  const [imgFile1, setImgFile1] = useState(null);
  const [imgFile2, setImgFile2] = useState(null);
  const [previewImage1, setPreviewImage1] = useState(null);
  const [previewImage2, setPreviewImage2] = useState(null);
  // all categories we have
  const [categories, setCategories] = useState([]);
  // all subcategory in selected category
  const [subCategory, setSubCategory] = useState([]);
  // for check we at add or update product page
  const id = useParams().id;
  
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
          setImgName1(data.img);
          setCurrentImgName1(data.img);
          setImgName2(data.img2);
          setCurrentImgName2(data.img2);
          setPrice(data.price);
          setProductCategory(data.category);
          // set subCategory state indepent on fetched categories (second used)
          setSubCategory(
            fetchedCategory?.filter((el) => el.title === data.category)[0]
              .sub_category
          );
          setProductSubCategory(data.sub_category);
          setType(data.type);
          const path1 = "products-images/" + data.img;
          const path2 = "products-images/" + data.img2;
          dowunloadImage(path1).then((img) => {
            setPreviewImage1(img);
          });
          dowunloadImage(path2).then((img) => {
            setPreviewImage2(img);
          });
        });
      } else {
        setIsNew(false);
        setTitle("");
        setDes("");
        setImgName1("");
        setImgName2("");
        setPrice("");
        setPreviewImage1(null);
        setPreviewImage2(null);
        setProductCategory("");
        setProductSubCategory("");
        setType("");
      }
    });
  }, [id]);
  
  // new or not button
  const isNewHandler = (e) => {
    setIsNew(!!+e.target.value);
    e.target.classList.toggle("active");
  };

  // show  sub_category of selected category
  const productCategoryChangeHandler = (e) => {
    const value = e.target.value;
    setProductCategory(value);
    setSubCategory(
      categories?.length > 0 &&
        categories?.filter((el) => el.title === value)[0]?.sub_category
    );
  };
  
  // preview image on screen
  const previewImg = (files, imgNum) => {
    const randomString = v4();
    if (files?.length > 0) {
      if (imgNum === 1) {
        setImgFile1(files[0]);
        setCurrentImgName1(files[0].name + randomString);
      } else {
        setImgFile2(files[0]);
        setCurrentImgName2(files[0].name + randomString);
      }
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        imgNum === 1
          ? setPreviewImage1(event.target.result)
          : setPreviewImage2(event.target.result);
      };
      fileReader.readAsDataURL(files[0]);
    }
  };

  //on submit form update or add product
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      title,
      des,
      img: currentImgName1,
      img2: currentImgName2,
      price,
      category: productCategory,
      sub_category: productSubCategory,
      isNew,
      type,
    };
    if (id) {
      updataProduct(id, data);
      // if product image changed
      if (currentImgName1 !== imgName1) {
        const path = "products-images/" + currentImgName1;
        uploadImage(imgFile1, path).then((res) => {
          const path = "products-images/" + imgName1;
          deleteImage(path);
        });
      } else if (currentImgName2 !== imgName2) {
        const path = "products-images/" + currentImgName2;
        uploadImage(imgFile2, path).then(() => {
          const path = "products-images/" + imgName2;
          deleteImage(path);
        });
      }
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
      const path1 = "products-images/" + currentImgName1;
      const path2 = "products-images/" + currentImgName2;
      uploadImage(imgFile1, path1);
      uploadImage(imgFile2, path2);
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
            <label htmlFor="img" className={`${styles.imageLabel}`}>
              <div>
                <AddPhotoAlternateIcon className=" text-iconColor" />
                <span>
                  Click to add an asset or drag and drop one in this area
                </span>
              </div>
              <img
                src={previewImage1}
                alt=""
                className="object-cover w-full h-full"
              />
              <input
                type="file"
                name="img"
                id="img"
                onChange={(e) => previewImg(e.target.files, 1)}
                className={`${styles.inputText} hidden`}
              />
            </label>
          </div>
          <div className={`${styles.col}`}>
            <label htmlFor="img2" className={`${styles.label}`}>
              img2
            </label>
            <label htmlFor="img2" className={`${styles.imageLabel}`}>
              <div>
                <AddPhotoAlternateIcon className=" text-iconColor" />
                <span>
                  Click to add an asset or drag and drop one in this area
                </span>
              </div>
              <img src={previewImage2} alt="" />
              <input
                type="file"
                name="img2"
                id="img2"
                onChange={(e) => previewImg(e.target.files, 2)}
              />
            </label>
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
            onChange={(e) => setPrice(+e.target.value)}
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
              {categories?.map((el) => (
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
              <option value={[]}>Please choose an option</option>
              {subCategory?.length > 0 ? (
                subCategory?.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))
              ) : (
                <option>Select Product category First</option>
              )}
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
              <option value="popular">popular</option>
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
