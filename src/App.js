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
import AddProduct from "./Pages/AddProduct/AddProduct";
import Cart from './Pages/Cart/Cart';


/////////////Home page///////////////////
const Layout = () => {
  return (
    <div className="app">
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
    path: "/admin",
    element: <AddProduct />,
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
