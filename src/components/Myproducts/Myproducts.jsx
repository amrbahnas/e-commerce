import { useEffect, useState } from "react";
import { products, deleteProduct } from "../../Firebase/index";
import { onSnapshot, query, orderBy } from "firebase/firestore";
import { deleteImage } from "../../Firebase/Store";


import styles from "./Myproducts.module.css";

import SingleProduct from "./SingleProduct";
const Myproducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(products, orderBy("createdAt", "desc"));
    // const q = query(products);
    onSnapshot(q, (snapshot) => {
      const fetchedData=[]
      snapshot.docs.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setData(fetchedData);
    });
  }, []);

    const deleteHandler = ({ id, category, img, img2 }) => {
      const res = window.confirm("Are you sure you want to delete");
      if (res) {
        setData((prev) => prev.filter((doc) => doc.id !== id));
        deleteProduct(id);
        deleteImage("products-images/"+img);
        deleteImage("products-images/" + img2);
      }
    };

  return (
    <div className={styles.Myproducts}>
    <span className=" capitalize">{data.length} items found</span>
      {data.length === 0 ? (
        <div className=" text-center capitalize">no Products found</div>
      ) : (
        data?.map((item) => {
          return <SingleProduct key={item.id} item={item} deleteHandler={deleteHandler} />;
        })
      )}
    </div>
  );
};

export default Myproducts;
