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
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ResetPassword from "./Pages/ResetPassword/ResetPassword";

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
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/resetpassword",
    element: <ResetPassword />,
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
