import { Mail, Home, Airplay, Circle, List, User } from "react-feather";

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
    title: "کاربران",
    icon: <User size={20} />,
    children: [
      {
        id: "list",
        title: "لیست کاربران",
        icon: <List size={12} />,
        navLink: "/apps/user/userList",
      },
      {
        id: "list",
        title: "لیست مدیران",
        icon: <List size={12} />,
        navLink: "/apps/user/adminList",
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
