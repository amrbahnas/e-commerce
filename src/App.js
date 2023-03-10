import React from "react";
import { store, persistor } from "./store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./Firebase/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Products from "./Pages/Products/Products";
import Product from "./Pages/Product/Product";
import Home from "./Pages/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Cart from "./Pages/Cart/Cart";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AddUpdateProduct from "./components/AddUpdateProduct/AddUpdateProduct";
import Myproducts from "./components/Myproducts/Myproducts";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import UserProfile from "./Pages/UserProfile/UserProfile";
import Confetti from "./Pages/Confetti/Confetti";
import User from "./Pages/User/User";
import CheckOut from "./Pages/CheckOut/CheckOut";
import ShippingAddress from "./components/ShippingAddress/ShippingAddress";
import Payment from "./components/Payment/Payment";
import Placeorder from './components/Placeorder/Placeorder';
import SearchResult from "./Pages/SearchResult/SearchResult";

/////////////Home page///////////////////
const Layout = () => {
  return (
    <div className="mainContent">
      <Navbar />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/Products/:id",
        element: <Products />,
      },
      {
        path: "/product/:id",
        element: <Product />,
      },
      {
        path: "/search/:value",
        element: <SearchResult/>,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
        children: [
          {
            path: "/checkout/shopingAddress",
            element: <ShippingAddress />,
          },
          {
            path: "/checkout/payment",
            element: <Payment/>,
          },
          {
            path: "/checkout/placeorder",
            element: <Placeorder />,
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    element: <User />,
    children: [
      {
        path: "/user/login",
        element: <Login />,
      },
      {
        path: "/user/Register",
        element: <Register />,
      },
      {
        path: "/user/successaccount",
        element: <Confetti />,
      },
      {
        path: "/user/resetpassword",
        element: <ResetPassword />,
      },
    ],
  },

  {
    path: "/admin",
    element: <Dashboard />,
    children: [
      { index: true, element: <Myproducts /> },
      { path: "/admin/myproducts", element: <Myproducts /> },
      { path: "/admin/addproduct", element: <AddUpdateProduct /> },
      { path: "/admin/edditproduct/:id", element: <AddUpdateProduct /> },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={"loading"} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
