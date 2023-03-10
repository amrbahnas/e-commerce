import React, { useState, useEffect } from "react";
import Card from "./../Card/Card";
import styles from "./Items.module.css";
// import Loading from "../Loading/Loading";
//fire base
import { products } from "../../Firebase/index";
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
import Pagination from "./../Pagination/Pagination";
/// end firebase
const Items = ({ subCat, sort, catId, priceRange }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState([]);
  useEffect(() => {
    setCurrentPosts(posts.slice(indexOfFirstPost, indexOfLastPost));
  }, [indexOfLastPost, indexOfFirstPost, posts]);
  useEffect(() => {
    let q = "";
    if (subCat) {
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
    } else if (sort) {
      q = query(
        products,
        where("price", "<=", +priceRange),
        where("sub_category", "==", catId.toLowerCase()),
        orderBy("price", sort)
      );
    } else {
      q = query(
        products,
        where("price", "<=", +priceRange),
        where("sub_category", "==", catId.toLowerCase())
      );
    }
    const fetchedData = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        fetchedData.push({ ...doc.data(), id: doc.id });
      });
      setPosts(fetchedData);
    });

    setCurrentPage(1);
  }, [subCat, sort, catId, priceRange]);

  return (
    <div>
      <div
        className={`${styles.items} flex flex-wrap  items-center  justify-center gap-10`}
      >
        {currentPosts.length > 0 ? (
          currentPosts?.map((item) => <Card item={item} key={item.id} />)
        ) : (
          <div className="capitalize ">no data available</div>
        )}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Items;
