import React, { useState, useEffect } from "react";
import Card from "./../Card/Card";
import styles from "./Items.module.css";
// import Loading from "../Loading/Loading";
//fire base
import { products } from "../../Firebase/index";
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
import Pagination from './../Pagination/Pagination';
/// end firebase
const Items = ({ subCat, sort, catId, priceRange }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    let q = "";
    if (subCat.length > 0 && sort) {
      q = query(
        products,
        where("category", "==", catId),
        where("price", "<=", +priceRange),
        where("sub_category", "in", subCat),
        orderBy("price", sort)
      );
    } else if (sort) {
      q = query(
        products,
        where("category", "==", catId),
        where("price", "<=", +priceRange),
        orderBy("price", sort)
      );
    } else if (subCat.length > 0) {
      q = query(
        products,
        where("category", "==", catId),
        where("price", "<=", +priceRange),
        where("sub_category", "in", subCat)
      );
    } else {
      q = query(
        products,
        where("category", "==", catId),
        where("price", "<=", +priceRange)
      );
    }

    setData([]);
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
    });
  }, [subCat, sort, catId, priceRange]);

  return (
    <div
      // className={`${styles.items} flex flex-wrap  items-center  justify-center gap-10`}
    >
      <div
        className={`${styles.items} flex flex-wrap  items-center  justify-center gap-10`}
      >
        {data.length > 0 ? (
          data?.map((item) => <Card item={item} key={item.id} />)
        ) : (
          <div className=" capitalize">no data available</div>
        )}
      </div>
      <Pagination />
    </div>
  );
};

export default Items;
