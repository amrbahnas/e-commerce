import React, { useState, useEffect } from "react";
import "./Products.css";
import Items from "./../../components/Items/Items";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../store/fetchSlice";
import { useParams } from "react-router-dom";

const Products = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [priceRange, setPriceRange] = useState(1000);
  const [sort, setSort] = useState("");
  const [selectedSubCat, setSelectedSubCat] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const customUrl = `/sub-categories?[filters][categories][id]=${id}`;
    dispatch(fetchProducts(customUrl)).then((action) =>
      setData(action.payload.data)
    );
  }, [dispatch, id]);

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
    <div className="products flex px-5 justify-center">
      <div className="products-left hidden md:block">
        <div className="left-setion ">
          <h2>product categores</h2>
          {data.length > 0
            ? data?.map((item) => {
                return (
                  <div className="item" key={item.id}>
                    <input
                      type="checkbox"
                      value={item.id}
                      id={item.id}
                      onChange={(e) => catHandler(e)}
                    />
                    <label htmlFor={item.id}>{item.attributes.title}</label>
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
                    priceRange < 1000 ? parseInt(priceRange) + 50 : priceRange
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
      </div>
      <div className="products-right">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
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
  );
};

export default Products;
