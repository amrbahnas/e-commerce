import React, { useState, useEffect, useRef } from "react";
import "./Products.css";
import Items from "./../../components/Items/Items";
import { useParams } from "react-router-dom";
//fire base
import { category } from "../../Firebase/index";
import { onSnapshot, query, where } from "firebase/firestore";
import { dowunloadImage } from "../../Firebase/Store";
/// end firebase
// component
import ProductsControl from "../../components/ProductsControl/ProductsControl";
const Products = () => {
  const productsLeft = useRef();
  const { id } = useParams();
  const [priceRange, setPriceRange] = useState(1000);
  const [sort, setSort] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState([]);
  const [data, setData] = useState([]);
  const [categoryCover, setCategoryCover] = useState([]);

  useEffect(() => {
    const q = query(category, where("title", "==", id));
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setData(doc.data());
      });
    });
    dowunloadImage("products-images/" + id + ".avif").then((img) => {
      setCategoryCover(img);
    });
  }, [id]);

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

  const categoryHandler = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedSubCat(
      isChecked
        ? [...selectedSubCat, value]
        : selectedSubCat.filter((el) => el !== value)
    );
  };
  return (
    <div className="mt-24 products">
      <div className="theContainer">
        <div className="flex justify-center p-4 bg-white rounded-md dark:bg-darkCard sectionWrapper">
          <ProductsControl
            data={data}
            categoryHandler={categoryHandler}
            productsLeft={productsLeft}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            setSort={setSort}
            productsLeftControl={productsLeftControl}
          />
          <div className="products-right">
            <img
              src={categoryCover}
              alt=""
              className="hidden object-cover w-full h-64 shadow-lg md:block mb-14 skeleton"
            />
            <Items
              priceRange={priceRange}
              catId={id}
              sort={sort}
              subCat={selectedSubCat}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
