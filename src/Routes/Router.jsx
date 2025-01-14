import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "./Home";
import JoinAsHr from "../Auth/JoinAsHr";
import AddAssets from "./AddAssets";
import Private from "../Shared/Private";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children:[
        {
          path:"/",
          element:<Home></Home>
        },
        {
            path:"login",
            element:<Login></Login>,
        },
        {
            path:"register",
            element:<Register></Register>
        },
        {
            path:"registerAsHr",
            element:<JoinAsHr></JoinAsHr>
        },
        {
            path:"addAssets",
            element:<Private><AddAssets></AddAssets></Private>
        },
      ]
    },
  ]);