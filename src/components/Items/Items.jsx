import React, { useState, useEffect } from "react";
import Card from "./../Card/Card";
import styles from "./Items.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/fetchSlice";
import Loading from "../Loading/Loading";

const Items = ({ subCat, sort, catId, priceRange }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { loading, error } = useSelector((store) => store.fetchSlice);

  useEffect(() => {
    const customUrl = `/products?populate=*&[filters][categories][id]=${catId}${subCat?.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${priceRange}${sort && `&sort=price:${sort}`}`;

    dispatch(fetchProducts(customUrl)).then((action) => {
      setData(action.payload.data);
    });
  }, [dispatch, catId, subCat, priceRange, sort]);

  return (
    <div
      className={`${styles.items} flex flex-wrap  items-center  justify-center gap-10`}
    >
      {error ? (
        "something went error"
      ) : loading ? (
        <Loading/>
      ) : data.length > 0 ? (
        data?.map((item) => <Card item={item} key={item.id} />)
      ) : (
        <div className=" capitalize">no data available</div>
      )}
    </div>
  );
};

export default Items;
