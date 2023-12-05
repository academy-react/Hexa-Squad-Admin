import {  Home, List } from "react-feather";

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
    navLink: "/TeacherCourses",
  },
];
