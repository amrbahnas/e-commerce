import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/fetchSlice";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

import "./FeaturedProducts.css";
const FeaturedProducts = ({ title, type }) => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((store) => store.fetchSlice);

  const [data, setData] = useState([]);

  useEffect(() => {
    const customUrl = `/products?populate=*&filters[type][$eq]=${type}`;
    dispatch(fetchProducts(customUrl)).then((action) =>
      setData(action.payload.data)
    );
  }, [dispatch, type]);

  return (
    <div className="FeaturedProducts">
      <div className="theContainer">
        <div className="FeaturedProductsTop flex flex-col md:flex-row">
          <h2 className="mb-3 md:mb-0">{title}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            delectus perspiciatis numquam earum, ab quisquam, quibusdam
            temporibus animi harum eaque autem eum voluptate. Obcaecati corporis
            quisquam ullam ipsam vero aliquid.
          </p>
        </div>
        <div className="FeaturedProductsBottom">
          {error ? (
            "something went wrong!"
          ) : loading ? (
            <Loading/>
          ) : (
            data?.map((item) => <Card item={item} key={item.id} />)
          )}
        </div>
      </div>
      .
    </div>
  );
};

export default FeaturedProducts;
