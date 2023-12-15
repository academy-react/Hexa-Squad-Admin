import { useEffect, useState } from "react";
import TableServerSide from "../@core/components/tableServerSide/TableServerSide";
import {
  reserveColumns,
  serverSideColumns,
} from "../@core/components/tableServerSide/data";
import instance from "../utility/interceptor";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import { Book, BookOpen, Trash2 } from "react-feather";
import { Col, Row } from "reactstrap";
import DeleteCourse from "../utility/api/DeleteData";
import BreadCrumbs from "../@core/components/breadcrumbs";

const ReserveUsers = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [acceptData, setAcceptCourses] = useState([]);
  const [notAcceptData, setNotAcceptCourses] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [sort, setSort] = useState("DESC");
  const [sortColumn, setSortColumn] = useState("Id");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [isALLData, setIsALLData] = useState(true);
  const [isAcceptData, setIsAcceptCourses] = useState(false);
  const [isNotAcceptData, setIsNotAcceptData] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const getData = () => {
    if (isALLData) {
      return data;
    } else if (isAcceptData) {
      return acceptData;
    } else if (isNotAcceptData) {
      return notAcceptData;
    }
  };
  const getAllData = () => {
    if (isALLData) {
      return allData;
    } else if (isAcceptData) {
      return acceptData;
    }else if (isNotAcceptData) {
      return notAcceptData;
    }
  };
  const getTitle = () => {
    if (isALLData) {
      return "همه رزرو ها";
    } else if (isAcceptData) {
      return "رزرو شده ها";
    } else if (isNotAcceptData) {
      return "رزرو شده ها";
    }
  };

  const getTeacherCourses = async () => {
    try {
      const courses = await instance.get("/CourseReserve");
      setData(courses);
      console.log(courses);
      setAllData(courses);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCourse = () => {
    console.log("selectedRows", selectedRows);
    selectedRows.map((course) => {
      DeleteCourse(course.courseId, "/TeacherCourses", true);
    });
  };

  useEffect(() => {
    getTeacherCourses();
  }, []);
  useEffect(() => {
    let accepted =
      data?.length !== 0 &&
      data?.filter((course) => {
        return course.accept === true;
      });
    let notAccepted =
      data?.length !== 0 &&
      data?.filter((course) => {
        return course.accept === false;
      });
    setAcceptCourses(accepted);
    setNotAcceptCourses(notAccepted);
  }, [data]);

  return (
    <div>
      <BreadCrumbs
        title={"لیست کاربران رزرو کرده"}
        data={[{ title: "لیست کاربران رزرو کرده", link: "/reserveUsers" }]}
      />
      <Row>
        <Col lg="4" sm="12">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isALLData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<BookOpen size={21} />}
            color="warning"
            onclick={() => {
              setIsALLData(true);
              setIsAcceptCourses(false);
              setIsNotAcceptData(false);
            }}
            stats={<h3> {data?.length}</h3>}
            statTitle="همه رزرو ها"
          />
        </Col>
        <Col lg="4" sm="12">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isAcceptData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<BookOpen size={21} />}
            color="success"
            onclick={() => {
              setIsALLData(false);
              setIsAcceptCourses(true);
              setIsNotAcceptData(false);
            }}
            stats={<h3> {acceptData?.length}</h3>}
            statTitle="رزرو های تایید شده"
          />
        </Col>
        <Col lg="4" sm="12">
          <StatsHorizontal
            // theme={ThemeColors}
            backGroundColor={isNotAcceptData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<Trash2 size={21} />}
            color="danger"
            onclick={() => {
              setIsALLData(false);
              setIsAcceptCourses(false);
              setIsNotAcceptData(true);
            }}
            stats={<h3> {notAcceptData?.length}</h3>}
            statTitle="رزرو های تایید نشده"
          />
        </Col>
      </Row>
      <TableServerSide
        allData={getAllData()}
        data={getData()}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        deleteOject={deleteCourse}
        setSelectedRows={setSelectedRows}
        onSort={()=>{}}
        setCurrentPage={setCurrentPage}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        serverSideColumns={reserveColumns}
        title={getTitle()}
        BtnLink={"/Course/create"}
        BtnTitle={"اضافه کردن دوره"}
        BtnIcon={<Book />}
        trashTitle={"حذف دوره"}
      />
    </div>
  );
};

export default ReserveUsers;
