import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import Avatar from "../avatar";
import {
  Edit,
  Eye,
  Trash2,
  MoreVertical,
  Trash,
  UserMinus,
  UserCheck,
  Check,
  CheckSquare,
  XCircle, CheckCircle 
} from "react-feather";
import GregorianToSolar from "../../../utility/GregorianToSolar/GregorianToSolar"
import { Navigate, useNavigate } from "react-router-dom";
import DeleteCourse from "../../../utility/api/DeleteData";
import activeAndDeActiveCourse from "../../../utility/api/PutData/activeAndDeActiveCourse";
import DeleteUser from "../../../utility/api/DeleteData/DeleteUser";
import ActiveUser from "../../../utility/api/PutData/ActiveUser";

export const serverSideColumns = [
  {
    sortable: true,
    name: "نام دوره",
    sortField: "Title",
    minWidth: "200px",
    selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.tumbImageAddress && <Avatar img={row.tumbImageAddress} />}
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">{row.title}</span>
          <small>{row.typeName}</small>
        </div>
      </div>
    ),
  },
  {
    sortable: true,
    name: "نام مدرس",
    sortField: "FullName",
    minWidth: "55px",
    selector: (row) => row.fullName,
  },
  {
    sortable: true,
    name: "قیمت دوره",
    sortField: "Cost",
    minWidth: "130px",
    selector: (row) => row.cost,
  },
  {
    sortable: true,
    name: "وضعیت برگذاری",
    sortField: "StatusName",
    minWidth: "150px",
    selector: (row) => row.statusName,
  },
  {
    sortable: true,
    name: "سطح دوره",
    sortField: "LevelName",
    minWidth: "120px",
    selector: (row) => row.levelName,
    link: (row) => row.id,
  },
  {
    sortable: true,
    name: "وضعیت",
    sortField: "IsActive",
    minWidth: "50px",
    selector: (row) => row.isActive,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.isActive ? (
              <Badge color="light-success">فعال</Badge>
            ) : (
              <Badge color="light-danger">غیر فعال</Badge>
            )}
          </span>
        </div>
      </div>
    ),
  },
  {
    sortable: true,
    name: "وضعیت حذف",
    sortField: "IsActive",
    minWidth: "150px",
    selector: (row) => row.isdelete,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.isdelete ? (
              <Badge color="light-danger">حذف شده</Badge>
            ) : (
              <Badge color="light-success">حذف نشده</Badge>
            )}
          </span>
        </div>
      </div>
    ),
  },
  {
    sortable: false,
    name: "انجام عملیات",
    minWidth: "330px",
    selector: (row) => row.isActive,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate d-flex gap-1">
            <Link to={"/Course/detail/" + row.courseId}>
              <Eye color="#7367f0" className="cursor-pointer" />
            </Link>
            <Link to={"/Course/update/" + row.courseId}>
              <Edit color="#fffa" className="cursor-pointer" />
            </Link>

            {row.isdelete ? (
              <div
                className="cursor-pointer "
                onClick={() => {
                  DeleteCourse(row.courseId, "/TeacherCourses", false);
                }}
                style={{ color: "#28c76f", width: "4rem" }}
              >
                لغو حذف
                <Trash color="#28c76f" />
              </div>
            ) : (
              <div style={{ width: "4rem" }}>
                <Trash
                  color="#ff4949"
                  className="cursor-pointer"
                  onClick={() => {
                    DeleteCourse(row.courseId, "/TeacherCourses", true);
                  }}
                />
              </div>
            )}
            {row.isActive ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  activeAndDeActiveCourse(
                    row.courseId,
                    "/TeacherCourses",
                    false
                  );
                }}
                style={{ color: "red" }}
              >
                <XCircle
                  color="#ff4949"
                  className="cursor-pointer"
                  style={{ margin: " 0 5px" }}
                />
                غیر فعال کردن دوره
              </div>
            ) : (
              <div
                className="cursor-pointer"
                onClick={() => {
                  activeAndDeActiveCourse(
                    row.courseId,
                    "/TeacherCourses",
                    true
                  );
                }}
                style={{ color: "#28c76f" }}
              >
                <CheckCircle
                  color="#28c76f"
                  className="cursor-pointer "
                  style={{ margin: " 0 5px" }}
                />
                فعال کردن دوره
              </div>
            )}
          </span>
        </div>
      </div>
    ),
  },
];
export const userListColumns = [
  {
    sortable: true,
    name: "نام ",
    minWidth: "250px",

    // selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {/* {row.tumbImageAddress && <Avatar img={row.tumbImageAddress} />} */}
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.fname} {row.lname}{" "}
          </span>
          {/* <small>{row.typeName}</small> */}
        </div>
      </div>
    ),
  },
  {
    sortable: true,
    name: "ایمیل",
    minWidth: "250px",
    selector: (row) => row.gmail,
  },
  {
    sortable: false,
    name: "شماره موبایل",
    minWidth: "200px",
    selector: (row) => row.phoneNumber,
  },
  {
    sortable: true,
    name: "تاریخ",
    minWidth: "150px",
    selector: (row) => GregorianToSolar(row.insertDate),
    link: (row) => row.id,
  },
  {
    sortable: false,
    name: "وضعیت ",
    minWidth: "100px",
    selector: (row) => row.active,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.active === "True" ? (
              <Badge color="light-success">فعال</Badge>
            ) : (
              <Badge color="light-danger">غیر فعال</Badge>
            )}
          </span>
        </div>
      </div>
    ),
  },
  {
    sortable: false,
    name: "مدیریت",
    minWidth: "150px",
    selector: (row) => row.active,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate d-flex gap-1">
            <Link to={"/user/userInfo/" + row.id}>
              <Eye className="text-muted cursor-pointer" />
            </Link>
            <Link to={"/user/userInfoEdit/" + row.id}>
              <Edit className="text-primary cursor-pointer" />
            </Link>

            {row.active === "True" ? (
              <Trash2 
                className="text-danger cursor-pointer" 
                onClick={() => DeleteUser(row.id)}
              />
              ) : (
                <CheckSquare 
                  className="text-primary cursor-pointer" 
                  onClick={() => ActiveUser(row.id)}
                />
              )
            }
            {/* <Trash2 className="text-danger cursor-pointer" /> */}
          </span>
        </div>
      </div>
    ),
  },
];

export const NewsListColumns = [
  {
    sortable: true,
    name: "نام بلاگ",
    minWidth: "225px",
    // selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {/* {row.tumbImageAddress && <Avatar img={row.tumbImageAddress} />} */}
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">{row.title}</span>
          {/* <small>{row.typeName}</small> */}
        </div>
      </div>
    ),
  },
  {
    sortable: true,
    name: "دسته بندی",
    minWidth: "150px",
    selector: (row) => row.newsCatregoryName,
  },
  {
    sortable: true,
    name: " نویسنده",
    minWidth: "380px",
    selector: (row) => row.addUserFullName,
  },
  
  {
    sortable: true,
    name: " اخرین اپدیت ",
   
    minWidth: "150px",
    selector: (row) => GregorianToSolar(row.updateDate),
   
  },

  {
    sortable: true,
    name: "  تعداد بازدید",
   
    minWidth: "150px",
    selector: (row) => row.currentView,

  },

  {
    sortable: false,
    name: "انجام عملیات",
    minWidth: "330px",
    
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate d-flex gap-1">
         <Link to={'/NewsDetails/'+row.id}> <Eye color="blue" className="cursor-pointer" /></Link>
            <Edit className="cursor-pointer" />
            {row.isdelete ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  DeleteCourse(row.courseId, "/TeacherCourses", false);
                }}
                style={{ color: "green" }}
              >
                لغو حذف
                <Trash color="green" />
              </div>
            ) : (
              <Trash
                color="red"
                className="cursor-pointer"
                onClick={() => {
                  DeleteCourse(row.courseId, "/TeacherCourses", true);
                }}
              />
            )}


             
          </span>
        </div>
      </div>
    ),
  },
  // {
  //   sortable: true,
  //   name: "Salary",
  //   minWidth: "150px",
  //   selector: (row) => row.salary,
  // },
];