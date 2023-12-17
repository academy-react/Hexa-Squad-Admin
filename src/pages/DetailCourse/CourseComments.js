// ** Reactstrap Imports
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
  Row,
} from "reactstrap";

// ** Third Party Components
import { CheckCircle, ChevronDown, Trash, X, XCircle } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Label Images
// import xdLabel from "@src/assets/images/icons/brands/xd-label.png";
// import vueLabel from "@src/assets/images/icons/brands/vue-label.png";
// import htmlLabel from "@src/assets/images/icons/brands/html-label.png";
// import reactLabel from "@src/assets/images/icons/brands/react-label.png";
// import sketchLabel from "@src/assets/images/icons/brands/sketch-label.png";

// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { useEffect, useState } from "react";
import GetCourseComments from "../../utility/api/GetData/GetCourseComments";
import ReactPaginate from "react-paginate";
import AcceptComment from "../../utility/api/PostData/AcceptComment";
import RejectComment from "../../utility/api/PostData/RejectComment";
import DeleteCourseComment from "../../utility/api/DeleteData/DeleteCourseComment";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import TableServerSide from "../../@core/components/tableServerSide/TableServerSide";
import instance from "../../utility/interceptor";
import toast from "react-hot-toast";

// const projectsArr = [
//   {
//     progress: 60,
//     hours: "210:30h",
//     progressColor: "info",
//     totalTasks: "233/240",
//     subtitle: "React Project",
//     title: "BGC eCommerce App",
//     img: reactLabel,
//   },
//   {
//     hours: "89h",
//     progress: 15,
//     totalTasks: "9/50",
//     progressColor: "danger",
//     subtitle: "UI/UX Project",
//     title: "Falcon Logo Design",
//     img: xdLabel,
//   },
//   {
//     progress: 90,
//     hours: "129:45h",
//     totalTasks: "100/190",
//     progressColor: "success",
//     subtitle: "Vuejs Project",
//     title: "Dashboard Design",
//     img: vueLabel,
//   },
//   {
//     hours: "45h",
//     progress: 49,
//     totalTasks: "12/86",
//     progressColor: "warning",
//     subtitle: "iPhone Project",
//     title: "Foodista mobile app",
//     img: sketchLabel,
//   },

//   {
//     progress: 73,
//     hours: "67:10h",
//     totalTasks: "234/378",
//     progressColor: "info",
//     subtitle: "React Project",
//     title: "Dojo React Project",
//     img: reactLabel,
//   },
//   {
//     progress: 81,
//     hours: "108:39h",
//     totalTasks: "264/537",
//     title: "HTML Project",
//     progressColor: "success",
//     subtitle: "Crypto Website",
//     img: htmlLabel,
//   },
//   {
//     progress: 78,
//     hours: "88:19h",
//     totalTasks: "214/627",
//     progressColor: "success",
//     subtitle: "Vuejs Project",
//     title: "Vue Admin template",
//     img: vueLabel,
//   },
// ];

const MySwal = withReactContent(Swal);
export const handleSuspendedClick = (id, courseId) => {
  return MySwal.fire({
    title: "از حذف کامنت مطمئن هستید ؟",
    text: "با حذف کامنت دیگر نمیتوانید به آن دسترسی داشته باشید !",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله مطمئنم !",
    cancelButtonText: "نمیخواهم حذف کنم",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-danger ms-1",
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.value) {
      const deleteCourse = await DeleteCourseComment(
        id,
        "/Course/detail/" + courseId
      );
      deleteCourse.success &&
        MySwal.fire({
          icon: "success",
          title: "موفقیت آمیز !",
          text: "کامنت با موفقیت حذف شد .",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
    } else if (result.dismiss === MySwal.DismissReason.cancel) {
      MySwal.fire({
        title: "کامنت حذف نشد",
        text: "حذف کامنت لغو شد :)",
        icon: "error",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  });
};
export const columns = [
  {
    sortable: true,
    width: "150px",
    name: "عنوان نظر",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center text-nowrap overflow-hidden text-ellipsis  ">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.pictureAddress}
              alt={row.title}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column ">
            <span className="text-truncate fw-bolder">{row.title}</span>
            <small className="text-muted">{row.subtitle}</small>
          </div>
        </div>
      );
    },
  },
  {
    name: "تعداد لایک ",
    width: "100px",
    selector: (row) => row.likeCount,
  },
  {
    name: "وضعیت تایید",
    width: "150px",
    selector: (row) => row.progress,
    sortable: true,
    cell: (row) => {
      return (
        <Badge
          className="text-capitalize"
          color={row.accept ? "light-success" : "light-warning"}
        >
          {row.accept ? "تایید شده" : "تایید نشده"}
        </Badge>
      );
    },
  },
  {
    name: "انجام عملیات",
    width: "320px",
    cell: (row) => {
      const [centeredModal, setCenteredModal] = useState(false);
      const [describe, setDescribe] = useState();
      console.log(row);
      const AddReply = async () => {
        try {
          const AddReplyCourse = await instance.post(
            "/Course/AddReplyCourseComment",
            {
              CourseId: row.courseId,
              CommentId: row.id,
              Title: " ریپلای برای : " + row.title,
              Describe: describe,
            },
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          if (AddReplyCourse.success) {
              toast.success(AddReplyCourse.message)
          }else {
              toast.error(AddReplyCourse.message)
          }
        } catch (error) {
          console.log(error);
        }
      };
      return (
        <Row className="col-12  px-0">
          {row.accept ? (
            <div
              className=" d-flex gap-1 cursor-pointer col-4 px-0"
              style={{ color: "#ff4949" }}
              onClick={() => {
                RejectComment(row.id, "/Course/detail/" + row.courseId);
              }}
            >
              <XCircle color="#ff4949" className="px-0" />
              <span className="mr-1">لغو نظر</span>
            </div>
          ) : (
            <div
              className=" d-flex  gap-1 cursor-pointer  col-4 px-0"
              style={{ color: "#28c76f" }}
              onClick={() => {
                AcceptComment(row.id, "/Course/detail/" + row.courseId);
              }}
            >
              <CheckCircle color="#28c76f" className="px-0" />
              <span className="mr-1">تایید نظر</span>
            </div>
          )}

          <Button
            color="primary"
            outline
            className="col-4"
            onClick={() => setCenteredModal(!centeredModal)}
          >
            ریپلای
          </Button>
          <Modal
            isOpen={centeredModal}
            toggle={() => setCenteredModal(!centeredModal)}
            className="modal-dialog-centered"
          >
            <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
              <h6 className="my-1"> عنوان : {row.title}</h6>
            </ModalHeader>
            <ModalBody>
              <h6> متن پیام : {row.describe}</h6>
            </ModalBody>{" "}
            <ModalBody>
              <Input
                name={"describe"}
                type="text"
                id="describe"
                placeholder={"ریپلای را وارد کنید"}
                label={"googleDescribe:"}
                className={"fs-6"}
                onChange={(e) => {
                  setDescribe(e.target.value);
                }}
              />
            </ModalBody>{" "}
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                onClick={(e) => AddReply(e)}
              >
                ارسال
              </Button>{" "}
            </ModalFooter>
          </Modal>
          <Row
            className="cursor-pointer col-4 px-0"
            style={{ color: "#ff4949" }}
            onClick={() => {
              // DeleteCourseComment(row.id, "/Course/detail/" + row.courseId);
              handleSuspendedClick(row.id, row.courseId);
            }}
          >
            <Trash color="#ff4949" size="20" />
          </Row>
        </Row>
      );
    },
  },
];

const CourseComments = ({ detail }) => {
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countInPage, setCountInPage] = useState(7);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const deleteSelectedRows = async () => {
    selectedRows.map(async (item) => {
      const deleteCourse = await DeleteCourseComment(
        item.id,
        "/Course/detail/" + item.courseId
      );
    });
  };
  const filterSearch = (values) => {
    let filteredData = allComments.filter((item) => {
      return item.title.indexOf(values) != -1;
    });
    setComments(filteredData);
  };

  const getComments = async () => {
    const result = await GetCourseComments(detail.courseId);
    setComments(result);
    setAllComments(result);
  };
  useEffect(() => {
    detail.courseId && getComments();
  }, [detail.courseId]);
  useEffect(() => {
    filterSearch();
  }, [searchValue]);
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <TableServerSide
          allData={allComments}
          data={comments}
          rowsPerPage={countInPage}
          setRowsPerPage={setCountInPage}
          currentPage={currentPage}
          deleteOject={deleteSelectedRows}
          setSelectedRows={setSelectedRows}
          onSort={() => {}}
          setCurrentPage={setCurrentPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          serverSideColumns={columns}
          title={"نظرات کاربران"}
        />
      </div>
    </Card>
  );
};

export default CourseComments;
