import { Mail, Home, Airplay, Circle, List } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "secondPage",
    title: "لیست دوره های شما",
    icon: <List size={20} />,
    navLink: "/Courses",
  },
  {
    id: "users",
    title: "User",
    icon: <User size={20} />,
    children: [
      {
        id: "list",
        title: "List",
        icon: <Circle size={12} />,
        navLink: "/apps/user/list",
      },
      // {
      //   id: "view",
      //   title: "View",
      //   icon: <Circle size={12} />,
      //   navLink: "/apps/user/view",
      // },
    ],
  },
];
