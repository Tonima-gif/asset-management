import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import Home from "./Home";


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
      ]
    },
  ]);