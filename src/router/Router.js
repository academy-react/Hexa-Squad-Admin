// ** Router imports
import { Navigate, createBrowserRouter, useRoutes } from "react-router-dom";

// ** GetRoutes
import { getRoutes } from "./routes";

// ** Hooks Imports
import { useLayout } from "@hooks/useLayout";
import Login from "../pages/Login";
import { getUserData } from "../utility/Utils";
import Register from "../pages/Register";
import Home from "../pages/Home";

const Router = () => {
  // ** Hooks
  const { layout } = useLayout();

  const allRoutes = getRoutes(layout);
  const getHomeRoute = () => {
    const user = getUserData();
    // console.log(user);
    if (user) {
      return "/home";
    } else {
      return "/login";
    }
  };
  const routes = useRoutes([
    {
      path: "/",
      index: true,
      element: <Navigate replace to={getHomeRoute()} />,
    },
    {
      path: "/login",
      children: [{ path: "/login", element: <Login /> }],
    },
    {
      path: "/register",
      children: [{ path: "/register", element: <Register /> }],
    },
    ...allRoutes,
  ]);
  return routes;
};

// export const RouterPublic = createBrowserRouter([{path:'/login',element:}]);
export default Router;
