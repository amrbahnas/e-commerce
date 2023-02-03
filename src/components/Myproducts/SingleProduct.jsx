import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//Firebase
import { dowunloadImage } from "../../Firebase/Store";
//icon
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
const SingleProduct = ({ item, deleteHandler }) => {
  const [img, setImg] = useState(null);
  useEffect(() => {
    const path = "products-images/";
    dowunloadImage(path + item.img).then((img) => {
      setImg(img);
    });
  }, [item.img]);

  return (
    <div
      className="item w-full flex items-start justify-center gap-4  p-2 shadow-lg "
      key={item.id}
    >
      <img src={img} alt="" className=" w-6 basis-1/6 bg-white" />
      <div className="info flex-1">
      <Link to={"/product/" + item.id} target="_blank">
      <h3 className="mb-3 capitalize underline decoration-1 underline-offset-4 cursor-pointer hover:text-buttonBg">
      {item.title}
      </h3>
      </Link>
      
      <p className="text-gray-500">{item.des?.substring(0, 50)}</p>
      <span className="price text-sky-700 text-md">${item.price}</span>
      </div>
      <div className="delete basis-1/6 text-center flex gap-6 mg:gap-10 self-center">
      <Link to={"edditproduct/" + item.id}>
      <EditIcon className="text-white cursor-pointer hover:scale-110" />
        </Link>
        <DeleteOutlineIcon
          className="text-red-600 cursor-pointer hover:scale-110 "
          onClick={(e) => deleteHandler(item)}
          />
          </div>
          </div>
          );
        };
        
        export default SingleProduct;
        