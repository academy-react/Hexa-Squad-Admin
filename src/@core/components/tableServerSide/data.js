import { Badge } from "reactstrap";
import Avatar from "../avatar";
import { Edit, Eye, Link, MoreVertical } from "react-feather";
import { Navigate } from "react-router-dom";

export const serverSideColumns = [
  {
    sortable: true,
    name: "نام دوره",
    minWidth: "225px",
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
    minWidth: "250px",
    selector: (row) => row.fullName,
  },
  {
    sortable: true,
    name: "قیمت دوره",
    minWidth: "250px",
    selector: (row) => row.cost,
  },
  {
    sortable: true,
    name: "سطح دوره",
    minWidth: "150px",
    selector: (row) => row.levelName,
    link: (row) => row.id,
  },
  {
    sortable: false,
    name: "وضعیت فعال بودن",
    minWidth: "150px",
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
    sortable: false,
    name: "انجام عملیات",
    minWidth: "150px",
    selector: (row) => row.isActive,
    cell: (row) => (
      <div className="d-flex align-items-center">
        <div className="user-info text-truncate ms-1">
          <span className="d-block fw-bold text-truncate d-flex gap-1">
            <Eye/>
            <Edit/>
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
