// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";
import { getUserData } from "../../utility/Utils";
import TeacherCourses from "../../pages/TeacherCourses";
import NewsList from "../../pages/News/NewsList";
import CreateCourse from "../../pages/CreateCourse/CreateCourse";
// import  from "../../views/apps/user/profile/index";
import Profile from '../../pages/user/profile';
import EditProfile from "../../pages/user/profile/EditProfile/EditProfile";

import NewsDetails from "../../pages/News/NewsDetails";
import UpdateCourse from "../../pages/UpdateCourse/UpdateCourse";
import DetailCourse from "../../pages/DetailCourse/DetailCourse";
import AddNews from "../../pages/News/AddNews"
import EditBlog from "../../pages/News/EditBlog/EditBlog"



import Courses from "../../pages/Courses";
import ReserveUsers from "../../pages/ReserveUsers";
const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s -  Admin Panel";

// ** Default Route
const DefaultRoute = "/home";

const Home = lazy(() => import("../../pages/Home"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));

const UserList = lazy(() => import("../../pages/user/list/UserList"));
const AdminList = lazy(() => import("../../pages/user/list/AdminList"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/Course/TeacherCourses",
    element: <TeacherCourses />,
  },
  {
    path: "/Course/Courses",
    element: <Courses />,
  },
  { path: "/Course/create", element: <CreateCourse /> },
  { path: "/reserveUsers", element: <ReserveUsers /> },
  {
    path: "/Course/edit",
    element: <UpdateCourse />,
    children: [{ path: "/Course/edit/:id", element: <UpdateCourse /> }],
  },
  {
    path: "/user",
    children: [{ path: "/user/:id" }],
  },
  {
    path: "/Course/detail",
    element: <DetailCourse />,
    children: [{ path: "/Course/detail/:id", element: <DetailCourse /> }],
  },

  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },

  {
    element: <UserList />,
    path: "/user/userList",
  },
  {
    element: <Profile />,
    path: "/user/userInfo",
    children: [{ path: "/user/userInfo/:id", element: <Profile /> }],
  },
  {
    element: <EditProfile />,
    path: "/user/userInfoEdit",
    children: [{ path: "/user/userInfoEdit/:id", element: <EditProfile /> }],
  },
  {
    element: <AdminList />,
    path: "/user/adminList",
  },

  {
    element: <NewsList />,
    path: "/NewsList",
  },
  {
    element: <AddNews/>,
    path: "/AddNews",
    children: [
      {path: "/AddNews/:id", element:<AddNews/>}
    ]
  },
  {
  
    element:<EditBlog/>,
    path: "/EditBlog",
    children: [
      {path: "/EditBlog/:id", element:<EditBlog/>}
    ]
  },
  {
    element: <NewsDetails />,
    path: "/NewsDetails",
    children: [
      {path: "/NewsDetails/:id", element:<NewsDetails/>}
    ]
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];
  const user = getUserData();
  const AllRoutes = [];
  const AllPrivetRoutes = [];
  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
    AllPrivetRoutes.push({
      path: "/",
      element: <Navigate to={"/login"} />,
      children: LayoutRoutes,
    });
  });
  if (user) {
    return AllRoutes;
  } else {
    return AllPrivetRoutes;
  }
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
