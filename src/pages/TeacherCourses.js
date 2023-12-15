import { useEffect, useState } from "react";
import TableServerSide from "../@core/components/tableServerSide/TableServerSide";
import { serverSideColumns } from "../@core/components/tableServerSide/data";
import instance from "../utility/interceptor";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import { Book, BookOpen, Trash2 } from "react-feather";
import { Col, Row } from "reactstrap";
import DeleteCourse from "../utility/api/DeleteData";
import BreadCrumbs from "../@core/components/breadcrumbs";
import CreateCourse from "../@core/components/modals/CreateCourse";

const TeacherCourses = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [sort, setSort] = useState("DESC");
  const [sortColumn, setSortColumn] = useState("Id");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [activeCourses, setActiveCourses] = useState([]);
  const [deletedCourses, setDeletedCourses] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [allActiveCourses, setAllActiveCourses] = useState([]);
  const [allDeletedCourses, setAllDeletedCourses] = useState([]);
  const [allCurrentCourses, setAllCurrentCourses] = useState([]);
  const [isALLData, setIsALLData] = useState(true);
  const [isActiveData, setIsActiveData] = useState(false);
  const [isDeletedData, setIsDeletedData] = useState(false);
  const [isCurrentData, setIsCurrentData] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const getData = () => {
    if (isALLData) {
      return data;
    } else if (isActiveData) {
      return activeCourses;
    } else if (isDeletedData) {
      return deletedCourses;
    } else if (isCurrentData) {
      return currentCourses;
    }
  };
  const getAllData = () => {
    if (isALLData) {
      return allData;
    } else if (isActiveData) {
      return allActiveCourses;
    } else if (isDeletedData) {
      return allDeletedCourses;
    } else if (isCurrentData) {
      return allCurrentCourses;
    }
  };
  const getTitle = () => {
    if (isALLData) {
      return "همه دوره های شما";
    } else if (isActiveData) {
      return "دوره های فعال شما";
    } else if (isDeletedData) {
      return "دوره های حذف شده شما";
    } else if (isCurrentData) {
      return "دوره های در حال برگذاری";
    }
  };

  const getTeacherCourses = async () => {
    const coursesParams = {
      PageNumber: 1,
      RowsOfPage: 1000,
      Query: searchValue,
      SortingCol: sort,
      SortType: sortColumn,
    };
    try {
      const courses = await instance.get("/Course/TeacherCourseList", {
        params: coursesParams,
      });
      setData(courses.teacherCourseDtos);
      setAllData(courses.teacherCourseDtos);
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
  }, [currentPage, searchValue, 1000, sort, sortColumn]);
  useEffect(() => {
    let active =
      data.length !== 0 &&
      data.filter((course) => {
        return course.isActive === true;
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
    setActiveCourses(active);
    setAllActiveCourses(active);
    setDeletedCourses(deleted);
    setAllDeletedCourses(deleted);
    setCurrentCourses(itsStatus);
    setAllCurrentCourses(itsStatus);
  }, [data]);

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection.toUpperCase());
    setSortColumn(column.sortField);
    console.log("sortField", column.sortField);
    console.log("sortDirection", sortDirection);
  };
  return (
    <div>
      <BreadCrumbs
        title={"لیست دوره های استاد"}
        data={[
          { title: "لیست دوره های استاد", link: "/Course/TeacherCourses" },
        ]}
      />
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isALLData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<BookOpen size={21} />}
            color="warning"
            onclick={() => {
              setIsALLData(true);
              setIsActiveData(false);
              setIsCurrentData(false);
              setIsDeletedData(false);
            }}
            stats={<h3> {data.length}</h3>}
            statTitle="همه دوره های شما"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isActiveData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<BookOpen size={21} />}
            color="success"
            onclick={() => {
              setIsALLData(false);
              setIsActiveData(true);
              setIsCurrentData(false);
              setIsDeletedData(false);
            }}
            stats={<h3> {activeCourses.length}</h3>}
            statTitle="دوره های فعال شما"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={ThemeColors}
            backGroundColor={isDeletedData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<Trash2 size={21} />}
            color="danger"
            onclick={() => {
              setIsALLData(false);
              setIsActiveData(false);
              setIsCurrentData(false);
              setIsDeletedData(true);
            }}
            stats={<h3> {deletedCourses.length}</h3>}
            statTitle="دوره های حذف شده"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isCurrentData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<Book size={21} />}
            color="primary"
            onclick={() => {
              setIsALLData(false);
              setIsActiveData(false);
              setIsCurrentData(true);
              setIsDeletedData(false);
            }}
            stats={<h3> {currentCourses.length}</h3>}
            statTitle="دوره های در حال برگذاری"
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
        onSort={handleSort}
        setCurrentPage={setCurrentPage}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        serverSideColumns={serverSideColumns}
        title={getTitle()}
        btn={<CreateCourse/>}
        trashTitle={"حذف دوره"}
      />
    </div>
  );
};

export default TeacherCourses;
