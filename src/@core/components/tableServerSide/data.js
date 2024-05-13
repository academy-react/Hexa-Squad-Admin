import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap";
import { Navigate, useNavigate, Link } from "react-router-dom";
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
  XCircle,
  CheckCircle,
  Archive,
  FileText,
  X,
  Star,
  UserPlus,
} from "react-feather";
import Avatar from "../avatar";
import React from "react";
import GregorianToSolar from "../../../utility/GregorianToSolar/GregorianToSolar";
import DeleteCourse from "../../../utility/api/DeleteData";
import activeAndDeActiveCourse from "../../../utility/api/PutData/activeAndDeActiveCourse";
import { handleDeleteUser } from "../../../utility/api/DeleteData/DeleteUser/handleDeleteUser";
import ActiveUser from "../../../utility/api/PutData/ActiveUser";
import DeleteCourseReserve from "../../../utility/api/DeleteData/DeleteCourseReserve/DeleteCourseReserve";
import AcceptCourseReserves from "../../../utility/api/PostData/AcceptCourseReserve/AcceptCourseResever";
import GetCourseDetail from "../../../utility/api/GetData/GetCourseGroups copy/GetCourseDetail";
import DataImage from "../DataImage/DataImage";
import UserImage from "../UserImage/UserImage";
import Reservers from "../modals/Reservers";
import SeparationPrice from "../../../utility/SeparationPrice/SeparationPrice";
import ActiveNews from "../../../utility/api/PutData/ActiveNews";
import UserRoleModal from "../../../pages/user/list/UserRoleModal";
import pic from "../../../assets/images/icons/piclogo.svg";
import EditCategory from "../../../pages/News/NewsCategory/EditCategory";

export const serverSideColumns = [
  {
    sortable: false,
    name: "نام دوره",
    sortField: "CourseName",
    minWidth: "180px",
    selector: (row) => row.title,
    cell: (row) => (
      <div
        data-tag="allowRowEvents"
        className="d-flex align-items-center "
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <Link to={"/Course/detail/" + row.courseId}>
          { <Avatar img={row.tumbImageAddress ? row.tumbImageAddress : pic} />}
        </Link>
        <div className="user-info text-truncate ms-1">
          <Link
            to={"/Course/detail/" + row.courseId}
            className="d-block fw-bold text-truncate"
          >
            {row.title}
          </Link>
          <small>{row.typeName}</small>
        </div>
      </div>
    ),
  },
  {
    sortable: false,
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
    cell: (row) => <span>{SeparationPrice(row.cost) + " تومان"}</span>,
  },
  {
    sortable: true,
    name: "وضعیت برگذاری",
    sortField: "StatusName",
    minWidth: "150px",
    selector: (row) => row.statusName,
  },
  // {
  //   sortable: true,
  //   name: "سطح دوره",
  //   sortField: "LevelName",
  //   minWidth: "120px",
  //   selector: (row) => row.levelName,
  //   link: (row) => row.id,
  // },
  {
    sortable: true,
    name: "وضعیت",
    sortField: "IsActive",
    minWidth: "40px",
    selector: (row) => row.isActive,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.isActive ? (
              <Badge
                color="light-success"
                className="cursor-pointer"
                onClick={() => {
                  activeAndDeActiveCourse(
                    row.courseId,
                    "/Course/Courses",
                    false
                  );
                }}
                // onClick={console.log("Disable")}
              >
                فعال
              </Badge>
            ) : (
              <Badge
                color="light-danger"
                className="cursor-pointer"
                onClick={() => {
                  activeAndDeActiveCourse(
                    row.courseId,
                    "/Course/Courses",
                    true
                  );
                }}
              >
                غیر فعال
              </Badge>
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
    minWidth: "140px",
    selector: (row) => row.isdelete,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.isdelete ? (
              <Badge
                color="light-danger"
                className="cursor-pointer"
                onClick={() => {
                  DeleteCourse(row.courseId, "/Course/Courses", false);
                }}
              >
                حذف شده
              </Badge>
            ) : (
              <Badge
                color="light-success"
                className="cursor-pointer"
                onClick={() => {
                  DeleteCourse(row.courseId, "/Course/Courses", true);
                }}
              >
                حذف نشده
              </Badge>
            )}
          </span>
        </div>
      </div>
    ),
  },
  {
    sortable: false,
    name: "انجام عملیات",
    minWidth: "150px",
    cell: (row) => (
      <div className="column-action d-flex">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu style={{ zIndex: 100 }}>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={"/Course/detail/" + row.courseId}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزئیات</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={"/Course/edit/" + row.courseId}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <Reservers courseId={row.courseId} />
      </div>
    ),
  },
];
export const userListColumns = [
  {
    sortable: true,
    name: "نام ",
    minWidth: "250px",
    cell: (row) => (
      <div className="d-flex align-items-center">
        {/* {row.tumbImageAddress && <Avatar img={row.tumbImageAddress} />} */}
        <div className="user-info text-truncate ms-1">
          <Link to={`/userList/userInfo/${row.id}`}>
            <div className="d-flex flex-row gap-1">
              <span className="d-block fw-bold text-truncate">
                {row.lname ? row.lname : "کاربر"}
              </span>
              <span className="d-block fw-bold text-truncate">
                {row.fname ? row.fname : "هگزا اسکواد"}
              </span>
            </div>
            {/* <span className="d-block fw-bold text-truncate">
              {row.fname} {row.lname}{" "}
            </span> */}
          </Link>
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
    width: "150px",
    selector: (row) => row.phoneNumber,
  },
  {
    sortable: true,
    name: "تاریخ",
    minWidth: "120px",
    selector: (row) => GregorianToSolar(row.insertDate),
    link: (row) => row.id,
  },
  {
    sortable: false,
    name: "وضعیت ",
    minWidth: "50px",
    with: "70px",
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
    minWidth: "250px",
    selector: (row) => row.active,
    cell: (row) => (
      <div className="column-action d-flex">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu style={{ zIndex: 100 }}>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={"/userList/userInfo/" + row.id}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">جزئیات</span>
            </DropdownItem>
            <DropdownItem
              tag={Link}
              to={"/userList/userInfoEdit/" + row.id}
              className="w-100"
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">ویرایش</span>
            </DropdownItem>
            {/* <DropdownItem
              // tag={}
              // to={"/userList/userInfoEdit/" + row.id}
              className="w-100"
              // onClick={AddUserRole(row.id)}
            >
              <AddUserRoleModal userId={row.id} />
              <UserPlus size={14} className="me-50" />
              <span className="align-middle">دسترسی</span>
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
        <div className="d-flex align-items-center">
          <div className="user-info text-truncate ms-2">
            {row.active === "True" ? (
              <Button
                onClick={() => handleDeleteUser(row.id, "/userList")}
                size="sm"
                color="danger"
              >
                حذف
              </Button>
            ) : (
              <Button
                onClick={() => ActiveUser(row.id, "/userList")}
                size="sm"
                color="primary"
              >
                فعال
              </Button>
            )}
            <UserRoleModal
              userId={row.id}
              isStudent={row.isStudent}
              isTeacher={row.isTeacher}
              userRoles={row.userRoles}
            />
            {/* <AddUserRoleModal userId={row.id} /> */}
          </div>
        </div>
      </div>
    ),
  },
];

export const NewsListColumns = [
  {
    // sortable: true,
    name: "نام بلاگ",
    minWidth: "340px",
    // selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {/* {row.tumbImageAddress && <Avatar img={row.tumbImageAddress} />} */}
        <div className="user-info text-truncate">
          <Link to={"/NewsDetails/" + row.id}>
            <span className="d-block fw-bold text-truncate">{row.title}</span>
          </Link>
          {/* <small>{row.typeName}</small> */}
        </div>
      </div>
    ),
  },
  {
    // sortable: true,
    name: "دسته بندی",
    minWidth: "100px",
    selector: (row) => row.newsCatregoryName,
  },

  {
    // sortable: true,
    name: " اخرین اپدیت ",
    minWidth: "100px",
    selector: (row) => GregorianToSolar(row.updateDate),
  },

  {
    // sortable: true,
    name: "تعداد بازدید",
    minWidth: "100px",
    selector: (row) => row.currentView,
  },
  {
    sortable: false,
    name: "وضعیت ",
    minWidth: "100px",
    selector: (row) => row.isActive,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.isActive === true ? (
              <Badge color="light-success">فعال </Badge>
            ) : (
              <Badge color="light-danger"> غیرفعال </Badge>
            )}
          </span>
        </div>
      </div>
    ),
  },

  {
    sortable: false,
    name: "انجام عملیات",
    minWidth: "120px",

    cell: (row) => (
      <div className="d-flex align-items-center">
        {/* <div className="user-info text-truncate ms-2">
          <span className="d-block fw-bold text-truncate d-flex gap-1"> */}
        {/* <Link to={"/NewsDetails/" + row.id}>
              {row.isActive === true ? (
                <Eye color="blue" className="cursor-pointer" />
              ) : (
                ""
              )}{" "}
            </Link> */}

        {row.isActive === true ? (
          <div className="column-action d-flex">
            <UncontrolledDropdown>
              <DropdownToggle tag="div" className="btn btn-sm">
                <MoreVertical size={14} className="cursor-pointer" />
              </DropdownToggle>
              <DropdownMenu style={{ zIndex: 100 }}>
                <DropdownItem
                  tag={Link}
                  className="w-100"
                  to={"/NewsDetails/" + row.id}
                >
                  <FileText size={14} className="me-50" />
                  <span className="align-middle">جزئیات</span>
                </DropdownItem>
                <DropdownItem
                  tag={Link}
                  className="w-100"
                  to={"/EditBlog/" + row.id}
                >
                  <Archive size={14} className="me-50" />
                  <span className="align-middle">ویرایش</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        ) : (
          ""
        )}

        {row.isActive === true ? (
          <React.Fragment>
            <XCircle
              color="red"
              className="cursor-pointer"
              id="UnControlledExample"
              onClick={() => ActiveNews("false", row.id)}
            ></XCircle>
            <UncontrolledTooltip placement="top" target="UnControlledExample">
              غیرفعال
            </UncontrolledTooltip>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CheckCircle
              color="lightGreen"
              className="cursor-pointer"
              id="UnControlledExample"
              onClick={() => ActiveNews("true", row.id)}
            ></CheckCircle>
            <UncontrolledTooltip placement="top" target="UnControlledExample">
              فعال سازی
            </UncontrolledTooltip>
          </React.Fragment>
        )}
        {/* {row.isdelete ? (
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
            )} */}
        {/* </span>
        </div> */}
      </div>
    ),
  },
];
export const CategoryListColumns = [
  {
    // sortable: true,
    name: "تصویر ",
    minWidth: "300px",
    // selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {row.iconAddress && <Avatar img={pic} className="bg-white shadow" />}

        <div className="user-info text-truncate mx-2">
          <span className="d-block fw-bold text-truncate">
            {"دسته بندی" + " " + row.categoryName}
          </span>
          {/* <small>{row.typeName}</small> */}
        </div>
      </div>
    ),
  },
  {
    // sortable: true,
    name: "عدد دسته بندی ",
    minWidth: "100px",
    // selector: (row) => row.title,
    cell: (row) => (
      <div className="d-flex align-items-center">
        {/* {row.tumbImageAddress && <Avatar img={row.tumbImageAddress} />} */}
        <div className="user-info text-truncate">
          <Avatar color="light-primary" content={row.id} />
          {/* <span className="d-block fw-bold text-truncate">{row.id}</span> */}
          {/* <small>{row.typeName}</small> */}
        </div>
      </div>
    ),
  },

  {
    // sortable: true,
    name: " نام دسته بندی ",
    minWidth: "100px",
    selector: (row) => row.categoryName,
    cell: (row) => (
      <Badge color="light-primary">
        <Star size={12} className="align-middle me-25" />
        <span className="align-middle">{row.categoryName}</span>
      </Badge>
    ),
  },

  {
    // sortable: true,
    name: " اخرین اپدیت ",
    minWidth: "100px",
    selector: (row) => GregorianToSolar(row.insertDate),
  },

  {
    sortable: false,
    name: "انجام عملیات",
    minWidth: "120px",

    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-2">
          <span className="d-block fw-bold text-truncate d-flex gap-1">
            <Link to={"/EditCategory/" + row.id}>
              <Edit className="cursor-pointer" />
            </Link>
          </span>
        </div>
      </div>
    ),
  },
];

export const reserveColumns = [
  {
    name: "نام دوره",
    sortable: false,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.courseName,
    cell: (row) => {
      return (
        <Link
          className="fw-bolder d-flex gap-1 align-items-center"
          to={"/Course/detail/" + row.courseId}
        >
          <DataImage courseId={row.courseId} />
          {row.courseName}
        </Link>
      );
    },
  },
  {
    name: "نام رزرو کننده",
    sortable: false,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.id,
    cell: (row) => (
      <Link
        to={`/userList/userInfo/${row.studentId}`}
      >{`${row.studentName}`}</Link>
    ),
  },
  {
    name: "زمان رزرو",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.total,
    cell: (row) => <span>{GregorianToSolar(row.reserverDate)}</span>,
  },
  {
    name: "وضعیت رزرو",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.total,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.accept === true ? (
              <Badge color="light-success">تایید شده</Badge>
            ) : (
              <Badge color="light-danger">تایید نشده</Badge>
            )}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "پذیرفتن رزرو",
    minWidth: "110px",
    cell: (row) =>
      row.accept === false && (
        <div className="column-action d-flex gap-2 align-items-center">
          <Check
            className="cursor-pointer"
            id={`accept-tooltip-${row.id}`}
            onClick={() => {
              AcceptCourseReserves(
                row.courseId,
                row.studentId,
                "/Course/detail/" + row.courseId
              );
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`accept-tooltip-${row.id}`}
          >
            تایید رزرو
          </UncontrolledTooltip>
          <X
            className="cursor-pointer"
            id={`reject-tooltip-${row.id}`}
            onClick={() => {
              DeleteCourseReserve(
                row.reserveId,
                "/Course/detail/" + row.courseId
              );
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`reject-tooltip-${row.id}`}
          >
            لغو رزرو
          </UncontrolledTooltip>
        </div>
      ),
  },
];

export const reservesColumns = [
  {
    name: "نام رزرو کننده",
    sortable: false,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.id,
    cell: (row) => (
      <Link to={`/userList/userInfo/${row.studentId}`} className="d-flex gap-1">
        <UserImage id={row.studentId} />
        {`${row.studentName}`}
      </Link>
    ),
  },
  {
    name: "زمان رزرو",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.total,
    cell: (row) => <span>{GregorianToSolar(row.reserverDate)}</span>,
  },
  {
    name: "وضعیت رزرو",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.total,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.accept === true ? (
              <Badge color="light-success">تایید شده</Badge>
            ) : (
              <Badge color="light-danger">تایید نشده</Badge>
            )}
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "پذیرفتن رزرو",
    minWidth: "110px",
    cell: (row) =>
      row.accept === false && (
        <div className="column-action d-flex gap-2 align-items-center">
          <Check
            className="cursor-pointer"
            id={`accept-tooltip-${row.id}`}
            onClick={() => {
              AcceptCourseReserves(
                row.courseId,
                row.studentId,
                "/Course/detail/" + row.courseId
              );
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`accept-tooltip-${row.id}`}
          >
            تایید رزرو
          </UncontrolledTooltip>
          <X
            className="cursor-pointer"
            id={`reject-tooltip-${row.id}`}
            onClick={() => {
              DeleteCourseReserve(
                row.reserveId,
                "/Course/detail/" + row.courseId
              );
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`reject-tooltip-${row.id}`}
          >
            لغو رزرو
          </UncontrolledTooltip>
        </div>
      ),
  },
];

export const UserReserve = [
  {
    name: "نام دوره",
    sortable: false,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.courseName,
    cell: (row) => {
      return <span> {row.courseName}</span>;
    },
  },
  {
    name: "نام رزرو کننده",
    sortable: false,
    sortField: "id",
    minWidth: "107px",
    selector: (row) => row.id,
    cell: (row) => <span>{row.studentName}</span>,
  },
  {
    name: "زمان رزرو",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.total,
    cell: (row) => <span>{GregorianToSolar(row.reserverDate)}</span>,
  },
  {
    name: "وضعیت رزرو",
    sortable: true,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.total,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate">
            {row.accept === true ? (
              <Badge color="light-success">تایید شده</Badge>
            ) : (
              <Badge color="light-danger">تایید نشده</Badge>
            )}
          </span>
        </div>
      </div>
    ),
  },
  {
    sortable: false,
    name: " نمایش جزییات",
    minWidth: "120px",

    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-2">
          <span className="d-block fw-bold text-truncate d-flex gap-1">
            <Link to={"/Course/detail/" + row.courseId}>
              <Eye color="blue" className="cursor-pointer" />
            </Link>
          </span>
        </div>
      </div>
    ),
  },
  {
    name: "پذیرفتن رزرو",
    minWidth: "110px",
    cell: (row) => (
      row.accept === false && (
        <div className="column-action d-flex gap-2 align-items-center">
          <Check
            className="cursor-pointer"
            id={`accept-tooltip-${row.id}`}
            onClick={() => {
              AcceptCourseReserves(
                row.courseId,
                row.studentId,
                "/userList/userInfo/" + row.id
              );
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`accept-tooltip-${row.id}`}
          >
            تایید رزرو
          </UncontrolledTooltip>
          <X
            className="cursor-pointer"
            id={`reject-tooltip-${row.id}`}
            onClick={() => {
              DeleteCourseReserve(
                row.reserveId,
                "/userList/userInfo/" + row.id
              );
            }}
          />
          <UncontrolledTooltip
            placement="top"
            target={`reject-tooltip-${row.id}`}
          >
            لغو رزرو
          </UncontrolledTooltip>
        </div>
      )
    ),
  },
];
export const UserFavorite = [
  {
    name: "تصویر دوره",
    sortable: false,
    minWidth: "150px",
    sortField: "total",
    selector: (row) => row.courseName,
    cell: (row) => {
      return (
        <span>
          {" "}
          {
            <Avatar
              img={row.tumbImageAddress ? row.tumbImageAddress : pic}
              className="bg-light-primary"
            />
          }
        </span>
      );
    },
  },
  {
    name: "نام دوره",
    sortable: false,
    minWidth: "100px",
    sortField: "total",
    selector: (row) => row.courseName,
    cell: (row) => {
      return <span> {row.title}</span>;
    },
  },
  {
    name: " اخرین اپدیت",
    sortable: true,
    minWidth: "100px",
    sortField: "total",
    selector: (row) => row.total,
    cell: (row) => <span>{GregorianToSolar(row.lastUpdate)}</span>,
  },

  {
    sortable: false,
    name: " نمایش جزییات",
    minWidth: "120px",

    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-2">
          <span className="d-block fw-bold text-truncate d-flex gap-1">
            <Link to={"/Course/detail/" + row.courseId}>
              <Eye color="blue" className="cursor-pointer" />
            </Link>
          </span>
        </div>
      </div>
    ),
  },
];
