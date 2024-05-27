import React from "react";
import {
    createBrowserRouter,
    useParams,    
  } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import List from "../pages/List";


const AppRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        
        path: "dashboard",
        element: <Dashboard />,        
    },
    {        
        path: "list/:type",
        element: <List />,            
    }
]);


export default AppRoutes;
