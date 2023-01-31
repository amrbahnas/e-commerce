import { Link } from "react-router-dom";
import React from "react";
import "./Categories.css";
const Categories = () => {
  return (
    <div className="categories hidden lg:grid grid-cols-4 grid-rows-2 md:h-screen my-8 mx-2 gap-2">
      <div className="sale col-start-1 col-span-1">
        <img
          src="https://images.pexels.com/photos/220455/pexels-photo-220455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <button>
          <Link to="/products/children">children</Link>
        </button>
      </div>

      <div className="woman col-start-1 col-span-1 row-start-2 row-span-1">
        <img
          src="https://images.pexels.com/photos/5745781/pexels-photo-5745781.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <button>
          <Link to="/products/woman">woman</Link>
        </button>
      </div>
      <div className="newseason col-start-2 col-span-1 row-start-1 row-span-2">
        <img
          src="https://images.pexels.com/photos/6408292/pexels-photo-6408292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <button>
          <Link to="/products/new-season">new season</Link>
        </button>
      </div>
      <div className="men col-start-3 col-span-1 row-start-1 row-span-1">
        <img
          src="https://images.pexels.com/photos/5264897/pexels-photo-5264897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <button>
          <Link to="/products/men">men</Link>
        </button>
      </div>
      <div className="accessories col-end-5 col-span-1">
        <img
          src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <button>
          <Link to="/products/accessories">accessories</Link>
        </button>
      </div>
      <div className="shoes col-end-5 col-span-2">
        <img
          src="https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        />
        <button>
          <Link to="/products/shoes">shoes</Link>
        </button>
      </div>
    </div>
  );
};

export default Categories;
