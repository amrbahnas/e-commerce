import { useEffect, useState } from "react";
import { products, deleteProduct, category } from "../../Firebase/index";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { deleteImage } from "../../Firebase/Store";

import styles from "./Myproducts.module.css";

import SingleProduct from "./SingleProduct";
const Myproducts = () => {
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const q = query(products, orderBy("createdAt", "desc"));
    // const q = query(products);
    onSnapshot(q, (snapshot) => {
      const fetchedData = [];
      snapshot.docs.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setData(fetchedData);
      setShowData(fetchedData);
    });
    /******************************************* */
    const q2 = query(category);
    // reset category state
    setCategories([]);
    // variables carry fetch results , we need this variable twice
    const fetchedCategory = [];
    // push result into variables
    onSnapshot(q2, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        fetchedCategory.push({ ...doc.data(), id: doc.id });
      });
    });
    // set category state with fetched categories (first used)
    setCategories(fetchedCategory);
  }, []);

  const filterByCategory = (value) => {
    console.log(value);
    setShowData(data.filter((el) => el.category === value));
  };

  const deleteHandler = ({ id, category, img, img2 }) => {
    const res = window.confirm("Are you sure you want to delete");
    if (res) {
      setData((prev) => prev.filter((doc) => doc.id !== id));
      deleteProduct(id);
      deleteImage("products-images/" + img);
      deleteImage("products-images/" + img2);
    }
  };

  return (
    <div className={styles.Myproducts}>
      <span>All Categories:</span>
      <ul className={styles.selectCategory}>
        <li>
          <input
            type="radio"
            name="category"
            value=""
            id="all"
            checked={data.length === showData.length}
            onChange={(e) => setShowData(data)}
          />
          <label htmlFor="all">All</label>
        </li>
        {categories?.map((el) => (
          <li value={el.title} key={el.id}>
            <input
              type="radio"
              name="category"
              value={el.title}
              id={el.title}
              onChange={(e) => filterByCategory(e.target.value)}
            />
            <label htmlFor={el.title}>{el.title}</label>
          </li>
        ))}
      </ul>
        <span className=" capitalize">{showData.length} items found</span>
      <div className={styles.productsWrapper}>
        {data.length === 0 ? (
          <div className=" text-center capitalize">no Products found</div>
        ) : (
          showData?.map((item) => {
            return (
              <SingleProduct
                key={item.id}
                item={item}
                deleteHandler={deleteHandler}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Myproducts;
