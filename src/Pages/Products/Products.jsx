import React, { useState, useEffect, useRef } from "react";
import "./Products.css";
import Items from "./../../components/Items/Items";
import { useParams } from "react-router-dom";
//fire base
import { category } from "../../Firebase/index";
import { onSnapshot, query, where } from "firebase/firestore";
import { dowunloadCategoryImage } from "../../Firebase/Store";
/// end firebase
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
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
    dowunloadCategoryImage(id).then((img) => {
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

  const catHandler = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedSubCat(
      isChecked
        ? [...selectedSubCat, value]
        : selectedSubCat.filter((el) => el !== value)
    );
  };
  return (
    <div className="products mt-24">
      <div className="theContainer">
        <div className="sectionWrapper flex justify-center bg-white p-4 rounded-md">
          <div className="products-left" ref={productsLeft}>
            <div className="left-setion mt-16 md:mt-0">
              <h2>product categores</h2>
              {data.sub_category?.length > 0
                ? data?.sub_category?.map((item) => {
                    return (
                      <div className="item" key={item}>
                        <input
                          type="checkbox"
                          className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200  align-top bg-no-repeat bg-center bg-contain float-left mr-1 cursor-pointer"
                          value={item}
                          id={item}
                          onChange={(e) => catHandler(e)}
                        />
                        <label
                          htmlFor={item}
                          className=" capitalize cursor-pointer form-check-label inline-block text-gray-800"
                        >
                          {item}
                        </label>
                      </div>
                    );
                  })
                : "soon.."}
            </div>
            <div className="left-setion ">
              <h2>filter by price</h2>
              <div className="flex flex-col items-start justify-start">
                <div>
                  <span>0</span>
                  <input
                    type="range"
                    name="priceRange"
                    value={priceRange}
                    id="price"
                    onChange={(e) => setPriceRange(e.target.value)}
                    step={1}
                    min={1}
                    max={1000}
                  />
                  <span>{priceRange}</span>
                </div>
                <div className="flex items-center justify-center gap-6 mt-2">
                  <button
                    onClick={(e) =>
                      setPriceRange(
                        priceRange > 1 ? parseInt(priceRange) - 50 : priceRange
                      )
                    }
                    className=" w-6 h-6 bg-slate-400 text-center rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={(e) =>
                      setPriceRange(
                        priceRange < 1000
                          ? parseInt(priceRange) + 50
                          : priceRange
                      )
                    }
                    className=" w-6 h-6 bg-slate-400 text-center rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="left-setion">
              <h2>sort by</h2>
              <div className="item">
                <input
                  type="radio"
                  name="price"
                  id="asc"
                  value="asc"
                  onChange={() => setSort("desc")}
                />
                <label htmlFor="asc">price (Higher first)</label>
              </div>
              <div className="item">
                <input
                  type="radio"
                  name="price"
                  id="desc"
                  value="desc"
                  onChange={() => setSort("asc")}
                />
                <label htmlFor="desc">price (Lowest first)</label>
              </div>
            </div>
            <div
              className="products-left-control"
              onClick={productsLeftControl}
            >
              <SettingsIcon />
            </div>
            <div
              className="products-left-control2"
              onClick={productsLeftControl}
            >
              close
              <CloseIcon />
            </div>
          </div>
          <div className="products-right">
            <img
              src={categoryCover}
              alt=""
              className=" hidden md:block w-full h-64 object-cover shadow-lg mb-14"
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
