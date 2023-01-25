import { useEffect, useState } from "react";
import { products, deleteProduct } from "../../Firebase/index";
import { onSnapshot, query, orderBy, where } from "firebase/firestore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

import styles from "./Myproducts.module.css";
import { Link } from "react-router-dom";
const Myproducts = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // const q = query(products, orderBy("createdAt"));
    const q = query(products);
    setData([]);
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
    });
  }, []);

  const deleteHandler = (id) => {
    setData((prev) => prev.filter((doc) => doc.id !== id));
    deleteProduct(id);
  };

  return (
    <div className={styles.Myproducts}>
    <span className=" capitalize">{data.length} items found</span>
      {data.length === 0 ? (
        <div className=" text-center capitalize">no Products found</div>
      ) : (
        data?.map((item) => {
          return (
            <div
              className="item w-full flex items-center justify-center gap-4  p-2 hover:shadow-lg "
              key={item.id}
            >
              <img src={item.img} alt="" className=" w-6 basis-1/6 bg-white" />
              <div className="info flex-1">
                <Link to={"/product/" + item.id} target="_blank">
                  <h3 className="mb-3 capitalize underline decoration-1 underline-offset-4 cursor-pointer hover:text-buttonBg">
                    {item.title}
                  </h3>
                </Link>

                <p className="text-gray-500">{item.des?.substring(0, 50)}</p>
                <span className="price text-sky-700 text-md">
                  ${item.price}
                </span>
              </div>
              <div className="delete basis-1/6 text-center flex gap-10 ">
                <Link to={"edditproduct/" + item.id}>
                  <EditIcon className="text-white cursor-pointer hover:scale-105" />
                </Link>
                <DeleteOutlineIcon
                  className="text-red-600 cursor-pointer hover:scale-105 "
                  onClick={(e) => deleteHandler(item.id)}
                />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Myproducts;
