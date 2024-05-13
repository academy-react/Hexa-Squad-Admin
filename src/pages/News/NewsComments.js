// ** Reactstrap Imports
import {
  Badge,
  Card,
  CardHeader,
  Progress,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  Input,
} from "reactstrap";

// ** Third Party Components
import {
  CheckCircle,
  ChevronDown,
  Trash,
  X,
  XCircle,
  Mail,
} from "react-feather";
import DataTable from "react-data-table-component";
import FormikInput from "../../@core/components/FormikInput";
import { Form, Formik } from "formik";
// ** Custom Components
import Avatar from "@components/avatar";
import instance from "../../utility/interceptor";
import replyNewsComment from "../../utility/api/GetData/GetNewsReplyComment/replyNewsComment";
// ** Styles
import "@styles/react/libs/tables/react-dataTable-component.scss";
import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useParams } from "react-router-dom";
import AddReply from "../../utility/api/PostData/AddNewsReply/AddNewsReply";
import toast from "react-hot-toast";

// const MySwal = withReactContent(Swal);
// export const handleSuspendedClick = (id) => {
//   return MySwal.fire({
//     title: "از حذف کامنت مطمئن هستید ؟",
//     text: "با حذف کامنت دیگر نمیتوانید به آن دسترسی داشته باشید !",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonText: "بله مطمئنم !",
//     cancelButtonText: "نمیخواهم حذف کنم",
//     customClass: {
//       confirmButton: "btn btn-primary",
//       cancelButton: "btn btn-outline-danger ms-1",
//     },
//     buttonsStyling: false,
//   }).then(async (result) => {
//     if (result.value) {
//       const deleteCourse = await DeleteCourseComment(id, "/Course/detail/");
//       console.log(deleteCourse);
//       MySwal.fire({
//         icon: "success",
//         title: "موفقیت آمیز !",
//         text: "کامنت با موفقیت حذف شد .",
//         customClass: {
//           confirmButton: "btn btn-success",
//         },
//       });
//     } else if (result.dismiss === MySwal.DismissReason.cancel) {
//       MySwal.fire({
//         title: "کامنت حذف نشد",
//         text: "حذف کامنت لغو شد :)",
//         icon: "error",
//         customClass: {
//           confirmButton: "btn btn-success",
//         },
//       });
//     }
//   });
// };

export const columns = [
  {
    sortable: true,
    minWidth: "300px",
    name: "اکانت",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1 bg-primary opacity-50"
              alt={row.autor}
              // img={row.pictureAddress}
              imgWidth="32"
            ></Avatar>
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">
              {row.autor ? row.autor : "نام کاربر"}
            </span>
            {/* <small className="text-muted">{row.subtitle}</small> */}
          </div>
        </div>
      );
    },
  },
  {
    minWidth: "300px",
    name: " متن کامنت",
    selector: (row) => row.title,
  },
  {
    name: "تعداد لایک ها",
    selector: (row) => row.likeCount,
  },

  {
    name: " دسترسی",
    minWidth: "150px",
    // selector: (row) => row.progress,
    sortable: true,
    cell: (row) => {
      const [centeredModal, setCenteredModal] = useState(false);
      const [describe, setDescribe] = useState();

      const initialValues = {
        describe: row.describe,
      };
      const AddReply = async () => {
        try {
          const AddReplyNews = await instance.post(
            "/News/CreateNewsReplyComment",
            {
              NewsId: row.newsId,
              parentId: row.id,
              title: "title testt",
              describe: "description",
            }
          );
          if(AddReplyNews.success){
            toast.success(AddReplyNews.message)
          } else {
            toast.error(AddReplyNews.errors)
          }
          console.log(AddReplyNews);
        } catch (error) {
          console.log(error);
        }
      };
      const postNewsInfo = (values) => {
        setDescribe(values.describe);
      };

      return (
        <div className="vertically-centered-modal">
          <Button
            color="primary"
            outline
            onClick={() => setCenteredModal(!centeredModal)}
          >
            مشاهده{" "}
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
            {/* <Formik
              initialValues={initialValues}
              enableReinitialize={true}
              onSubmit={(values) => {
                postNewsInfo(values);
              }}
            >
              {(form) => {
                setDescribe(form.values.describe);
                <ModalBody className={"me-2"}>
                  <Form className="mt-2">
                    <FormikInput
                      name={"describe"}
                      placeholder={" توضیحات را وارد کنید"}
                      id="describe"
                    />
                  </Form>
                  ;
                </ModalBody>;
              }}
            </Formik> */}
            <ModalBody>
              <Input
                initialValues={initialValues}
                name={"describe"}
                type="text"
                id="describe"
                placeholder={"ریپلای را وارد کنید"}
                label={"googleDescribe:"}
                className={"fs-6"}
                onSubmit={(values) => {
                  setDescribe(values.describe);
                }}
                // onSubmit={(e) => AddReply(e)}
                // type={"text"}
              />
            </ModalBody>{" "}
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                onClick={(e) => AddReply(e)}
                // onClick={() => AddReply(row.newsId, row.id, describe)}
              >
                ارسال
              </Button>{" "}
            </ModalFooter>
          </Modal>
        </div>
      );
    },
  },
  // {
  //   name: " دسترسی",
  //   minWidth: "150px",
  //   // selector: (row) => row.progress,
  //   sortable: true,
  //   cell: (row) => {
  //     return (
  //       <Fragment>
  //         <Button
  //           color="primary"
  //           outline
  //           // onClick={() => replyNewsComment(row.id)}
  //         >
  //           la{" "}
  //         </Button>
  //         {/* <div className="bg-danger">{replyNewsComment(row.id)}</div> */}
  //       </Fragment>
  //     );
  //   },
  // },
];

const NewsComments = ({ NewsId }) => {
  const [comments, setComments] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const countInPage = 8;
  const endOffset = itemOffset + countInPage;
  const currentItems = comments.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(comments.length / countInPage);

  const NewsParams = useParams();
  const fetchNewsData = async () => {
    try {
      const News = await instance.get(
        `/News/GetAdminNewsComments?NewsId=${NewsParams.id}`
      );
      // const comments = News;
      setComments(News);
      console.log(News);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNewsData();
  }, []);

  const handlePagination = (page) => {
    const newOffset = (page.selected * countInPage) % comments.length;
    setItemOffset(newOffset);
    // setCurrentPage(page.selected + 1);
  };

  const CustomPagination = () => {
    // const count = Math.ceil(detail.length / 5);
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        renderOnZeroPageCount={null}
        activeClassName="active"
        // forcePage={pageCount !== 0 && pageCount }
        onPageChange={handlePagination}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };
  return (
    <Card>
      <CardHeader tag="h4">
        <h4 className="d-flex gap-1 align-items-center">
          <Mail></Mail> نظرات کاربران
        </h4>
      </CardHeader>
      <div className="react-dataTable user-view-account-projects">
        <DataTable
          noHeader
          pagination
          paginationServer
          paginationComponent={CustomPagination}
          responsive
          columns={columns}
          data={currentItems}
          className="react-dataTable"
          sortIcon={<ChevronDown size={10} />}
        />
      </div>
    </Card>
  );
};

export default NewsComments;
