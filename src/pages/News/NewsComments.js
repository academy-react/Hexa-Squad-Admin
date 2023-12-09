// ** Reactstrap Imports
import { Badge, Card, CardHeader, Progress, Row } from "reactstrap";

// ** Third Party Components
import { CheckCircle, ChevronDown, Trash, X, XCircle } from "react-feather";
import DataTable from "react-data-table-component";

// ** Custom Components
import Avatar from "@components/avatar";
import instance from '../../utility/interceptor'
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
import { useParams } from 'react-router-dom'

const MySwal = withReactContent(Swal);
export const handleSuspendedClick = (id) => {
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
        "/Course/detail/" 
      );
      console.log(deleteCourse);
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
    minWidth: "200px",
    name: "عنوان نظر",
    selector: (row) => row.title,
    cell: (row) => {
      return (
        <div className="d-flex justify-content-left align-items-center">
          <div className="avatar-wrapper">
            <Avatar
              className="me-1"
              img={row.pictureAddress}
              alt={row.title}
              imgWidth="32"
            />
          </div>
          <div className="d-flex flex-column">
            <span className="text-truncate fw-bolder">{row.title}</span>
            <small className="text-muted">{row.subtitle}</small>
          </div>
        </div>
      );
    },
  },
  {
    name: "تعداد لایک ها",
    selector: (row) => row.likeCount,
  },
  {
    name: "وضعیت تایید",
    minWidth: "150px",
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
    minWidth: "325px",
    cell: (row) => {
      return (
        <Row className="col-12  px-0">
          {row.accept ? (
            <div
              className=" d-flex gap-1 cursor-pointer col-6 px-0"
              style={{ color: "#ff4949" }}
              onClick={() => {
                // RejectComment(row.id, "/Course/detail/");
              }}
            >
              <XCircle color="#ff4949" className="px-0" />
              <span className="mr-1">لغو نظر</span>
            </div>
          ) : (
            <div
              className=" d-flex  gap-1 cursor-pointer  col-6 px-0"
              style={{ color: "#28c76f" }}
              onClick={() => {
                // AcceptComment(row.id, "/Course/detail/");
              }}
            >
              <CheckCircle color="#28c76f" className="px-0" />
              <span className="mr-1">تایید نظر</span>
            </div>
          )}
          <Row
            className="cursor-pointer col-4 px-0"
            style={{ color: "#ff4949" }}
            onClick={() => {
              // DeleteCourseComment(row.id, "/Course/detail/" + row.courseId);
              handleSuspendedClick(row.id);
            }}
          >
            <Trash color="#ff4949" size="20" />
          </Row>
        </Row>
      );
    },
  },
];

const NewsComments = ({ NewsId }) => {
  const [comments, setComments] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const countInPage = 5;
  const endOffset = itemOffset + countInPage;
  const currentItems = comments.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(comments.length / countInPage);

  // const NewsParams = {
  //   NewsId: NewsId,

  // };
  // const getComments = async () => {
  //   // const result = await GetCourseComments(detail.courseId);
  //   // console.log("getComments result : ", result);
  //   // setComments(result);
       
  //   try {
  //     const News = await instance.get(`/News/GetAdminNewsComments?NewsId=`, {
  //       params: NewsParams,
  //   });
  //     setComments(News);
  //     console.log(News)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //  getComments();
  // }, []);
  const NewsParams = useParams()
const fetchNewsData= async() => {
   
      try {
        const News = await instance.get(`/News/${NewsParams.id}`);
        setComments(News.commentDtos);
        console.log(News)
      } catch (error) {
        console.log(error);
      }
    }
useEffect(() => {
fetchNewsData()
}, [])
    

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
      <CardHeader tag="h4">نظرات کاربران</CardHeader>
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
