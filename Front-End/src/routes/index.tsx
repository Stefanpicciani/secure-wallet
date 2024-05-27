import React from "react";
import Layout from "../components/Layout";
import AppRoutes from "./app.routes";
import { RouterProvider } from "react-router-dom";

const Routes: React.FC = () =>  {
    return(
        <Layout>
            <RouterProvider router={AppRoutes} />
        </Layout> 
    );
}



export default Routes;