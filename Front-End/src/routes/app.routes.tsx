import React from "react";
import {
    createBrowserRouter,    
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
        path: "list/:movimentType",
        element: <List />,            
    }
]);


export default AppRoutes;
