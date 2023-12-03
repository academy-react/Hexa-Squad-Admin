import { useEffect, useState } from "react";
import TableServerSide from "../@core/components/tableServerSide/TableServerSide";
import { serverSideColumns } from "../@core/components/tableServerSide/data";
import instance from "../utility/interceptor";

const Courses = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const coursesParams = {
    PageNumber: currentPage,
    RowsOfPage: rowsPerPage,
    // Query: searchValue,
  };
  const getTeacherCourses = async () => {
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
  }, [searchValue, currentPage, rowsPerPage]);

  return (
    <div>
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
        BtnLink={'/Course/create'}
        BtnTitle={"اضافه کردن دوره"}
      />
    </div>
  );
};

export default Courses;
