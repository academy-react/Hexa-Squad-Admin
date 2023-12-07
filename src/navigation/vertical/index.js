import { Home, Circle, List, User, Edit } from "react-feather";

export default [
  {
    id: "home",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "Course",
    title: "دوره ها",
    icon: <List size={20} />,
    navLink: "/Course",
    children: [
      {
        id: "Courses",
        title: "لیست دوره های شما",
        icon: <List size={20} />,
        navLink: "/TeacherCourses",
      },
      {
        id: "createCourse",
        icon: <Edit />,
        title: "ساخت دوره جدید",
        navLink: "/Course/create",
      },
    ],
  },
  {
    id: "users",
    title: "کاربران",
    icon: <User size={20} />,
    children: [
      {
        id: "usersList",
        title: "لیست کاربران",
        icon: <List size={12} />,
        navLink: "/user/userList",
      },
      {
        id: "adminList",
        title: "لیست مدیران",
        icon: <List size={12} />,
        navLink: "/user/adminList",
      },
      // {
      //   id: "view",
      //   title: "View",
      //   icon: <Circle size={12} />,
      //   navLink: "/apps/user/view",
      // },
    ],
  },
  {
    id: "News",
    title: " اخبار",
    icon: <List size={20} />,
    navLink: "/News",
    children: [
      {
        id: "NewsList",
        title: "لیست اخبار",
        icon: <List size={20} />,
        navLink: "/NewsList",
      },

    ],
  },
];
