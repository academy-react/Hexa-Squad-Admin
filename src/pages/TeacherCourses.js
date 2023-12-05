import { useEffect, useState } from "react";
import TableServerSide from "../@core/components/tableServerSide/TableServerSide";
import { serverSideColumns } from "../@core/components/tableServerSide/data";
import instance from "../utility/interceptor";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import { Book, BookOpen, Cpu, GitBranch, Trash, Trash2 } from "react-feather";
import { Col, Row } from "reactstrap";
import { selectThemeColors } from "../utility/Utils";

const TeacherCourses = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [activeCourses, setActiveCourses] = useState([]);
  const [expireCourses, setExpireCourses] = useState([]);
  const [deletedCourses, setDeletedCourses] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const getTeacherCourses = async () => {
    const coursesParams = {
      PageNumber: currentPage,
      RowsOfPage: rowsPerPage,
      Query: searchValue,
    };
    try {
      const courses = await instance.get("/Course/TeacherCourseList", {
        params: coursesParams,
      });
      setData(courses.teacherCourseDtos);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeacherCourses();
  }, [currentPage, searchValue, rowsPerPage]);
  useEffect(() => {
    let active =
      data.length !== 0 &&
      data.filter((course) => {
        return course.isActive === true;
      });
    let expire =
      data.length !== 0 &&
      data.filter((course) => {
        return course.isExpire === true;
      });
    let deleted =
      data.length !== 0 &&
      data.filter((course) => {
        return course.isdelete === true;
      });
    let itsStatus =
      data.length !== 0 &&
      data.filter((course) => {
        return course.statusName === "درحال برگذاری";
      });
      setActiveCourses(active)
      setExpireCourses(expire)
      setDeletedCourses(deleted)
      setCurrentCourses(itsStatus)
  }, [data]);

  return (
    <div>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            theme={selectThemeColors}
            className=" rounded"
            icon={<BookOpen size={21} />}
            color="success"
            stats={activeCourses.length}
            statTitle="دوره های تایید شده شما"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            theme={selectThemeColors}
            className=" rounded"
            icon={<Trash size={21} />}
            color="warning"
            stats={expireCourses.length}
            statTitle="دوره های منقضی شده"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            theme={selectThemeColors}
            className=" rounded"
            icon={<Trash2 size={21} />}
            color="danger"
            stats={deletedCourses.length}
            statTitle='دوره های حذف شده'
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            theme={selectThemeColors}
            className=" rounded"
            icon={<Book size={21} />}
            color="primary"
            stats={currentCourses.length}
            statTitle='دوره های در حال برگذاری'
          />
        </Col>
      </Row>
      <TableServerSide
        allData={data}
        data={data}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        serverSideColumns={serverSideColumns}
        title={"دوره های شما"}
        BtnLink={"/Course/create"}
        BtnTitle={"اضافه کردن دوره"}
        BtnIcon={<Book/>}
      />
    </div>
  );
};

export default TeacherCourses;
