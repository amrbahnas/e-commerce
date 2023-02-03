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
        className="miniCard  w-full rounded-md shadow-md h-72 overflow-hidden p-4 hover:scale-105 hover:shadow-lg"
      >
        <img
          src={img1}
          alt=""
          className=" bg-img h-2/3  w-full object-cover rounded-md"
        />
        <div className="info p-2 h-2/5 overflow-hidden ">
          <h3 className=" whitespace-nowrap mb-2">{item.title}</h3>
          <span className="block font-bold text-lg">${item.price}</span>
          <span className=" text-gray-500 text-sm line-through">
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
