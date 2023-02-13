import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import "./ProductsControl.css"
const ProductsControl = ({
  data,
  categoryHandler,
  productsLeft,
  priceRange,
  setPriceRange,
  setSort,
  productsLeftControl,
}) => {
  return (
    <div className="products-left" ref={productsLeft}>
      {categoryHandler && (
        <div className="mt-16 left-setion md:mt-0">
          <h2>product categores</h2>
          {data?.sub_category?.length > 0
            ? data?.sub_category?.map((item) => {
                return (
                  <div className="item" key={item}>
                    <input
                      type="checkbox"
                      className="float-left w-4 h-4 mr-1 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm cursor-pointer checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
                      value={item}
                      id={item}
                      onChange={(e) => categoryHandler(e)}
                    />
                    <label
                      htmlFor={item}
                      className="inline-block text-gray-800 capitalize cursor-pointer dark:text-darkPText form-check-label"
                    >
                      {item}
                    </label>
                  </div>
                );
              })
            : "soon.."}
        </div>
      )}
      <div className={`left-setion ${!categoryHandler&& "mt-24 md:mt-1 p-2"}`}>
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
              className="w-6 h-6 text-center rounded bg-slate-400"
            >
              -
            </button>
            <button
              onClick={(e) =>
                setPriceRange(
                  priceRange < 1000 ? parseInt(priceRange) + 50 : priceRange
                )
              }
              className="w-6 h-6 text-center rounded bg-slate-400"
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
      <div className="products-left-control" onClick={productsLeftControl}>
        <SettingsIcon />
      </div>
      <div className="products-left-control2" onClick={productsLeftControl}>
        close
        <CloseIcon />
      </div>
    </div>
  );
};

export default ProductsControl;
