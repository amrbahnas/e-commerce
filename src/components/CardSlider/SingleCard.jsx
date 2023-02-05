import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { dowunloadImage } from "../../Firebase/Store";

//icon
import EditIcon from "@mui/icons-material/Edit";
const SingleCard = ({ item }) => {
  const { admin } = useSelector((store) => store.AuthSlice);
  const [img1, setImg1] = useState(null);
  useEffect(() => {
    const path = "products-images/";
    dowunloadImage(path + item.img).then((img) => {
      setImg1(img);
    });
  }, []);
  return (
    <>
      <Link
        to={"/product/" + item.id}
        className="w-full p-4 overflow-hidden rounded-md shadow-md miniCard h-72 hover:scale-105 hover:shadow-lg"
      >
        <img
          src={img1}
          alt=""
          className="object-cover w-full rounded-md bg-img h-2/3 skeleton"
        />
        <div className="p-2 overflow-hidden info h-2/5 ">
          <h3 className="mb-2 whitespace-nowrap ">{item.title}</h3>
          <span className="block text-lg font-bold">${item.price}</span>
          <span className="text-sm text-gray-500 line-through ">
            ${+item.price + 20}
          </span>
        </div>
      </Link>
      {admin && (
        <Link to={"/admin/edditproduct/" + item.id} target="_blank">
          <div className="editProduct">
            <EditIcon />
          </div>
        </Link>
      )}
    </>
  );
};

export default SingleCard;
