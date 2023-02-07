import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Items from "../../components/Items/Items";
import ProductsControl from "../../components/ProductsControl/ProductsControl";
//fire base
import { products } from "../../Firebase/index";
import { onSnapshot, query, where } from "firebase/firestore";
import styles from "./SearchResult.module.css";
const SearchResult = () => {
  const productsLeft = useRef();
  const { value } = useParams();
  const [priceRange, setPriceRange] = useState(1000);
  const [sort, setSort] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(products, where("title", "==", value));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setData(doc.data());
      });
    });
  }, [value]);

  //hidden show menu
  const productsLeftControl = () => {
    productsLeft.current.classList.toggle("hidden-products-left");
  };

  useEffect(() => {
    const handler = (e) => {
      //if the element which clicked not in the menu then
      if (!productsLeft.current.contains(e.target)) {
        productsLeft.current.classList.remove("hidden-products-left");
      }
    };
    document.addEventListener("mousedown", handler);
    // cleanup event listeners
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className={styles.SearchResult}>
      <div className="theContainer">
        <div className={styles.wrapper}>
            <ProductsControl
              data={data}
              productsLeft={productsLeft}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              setSort={setSort}
              productsLeftControl={productsLeftControl}
            />
          <div className={styles.result}>
            <Items
              priceRange={priceRange}
              catId={value}
              sort={sort}
              subCat={""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
