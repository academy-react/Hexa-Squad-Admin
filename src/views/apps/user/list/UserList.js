
import { useEffect, useState } from "react";
import TableServerSide from "../TableServerSide/TableServerSide";
import { userListColumns } from "../../../../@core/components/tableServerSide/data";
import StatsHorizontal from "../../../../@core/components/StatsHorizontal";
import instance from "../../../../utility/interceptor";
import { User, BookOpen, Cpu, GitBranch, Trash, Trash2 } from "react-feather";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";

const UserList = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [sort, setSort] = useState("DESC");
  const [sortColumn, setSortColumn] = useState("InsertDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [IsActiveUser, setIsActiveUser] = useState(null)
  const [searchValue, setSearchValue] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [deletedCourses, setDeletedCourses] = useState([]);
  const [currentCourses, setCurrentCourses] = useState([]);
  const [allActiveUsers, setAllActiveUsers] = useState([]);
  const [allDeletedCourses, setAllDeletedCourses] = useState([]);
  const [allCurrentCourses, setAllCurrentCourses] = useState([]);
  const [isALLData, setIsALLData] = useState(true);
  const [isActiveData, setIsActiveData] = useState(false);
  const [isDeletedData, setIsDeletedData] = useState(false);
  const [isCurrentData, setIsCurrentData] = useState(false);

  const getData = () => {
    if (isALLData) {
      return data;
    } else if (isActiveData) {
      return activeUsers;
    // } else if (isDeletedData) {
    //   return deletedCourses;
    } else if (isCurrentData) {
      return currentCourses;
    }
  };
  const getAllData = () => {
    if (isALLData) {
      return allData;
    } else if (isActiveData) {
      return allActiveUsers;
    // } else if (isDeletedData) {
    //   return allDeletedCourses;
    } else if (isCurrentData) {
      return allCurrentCourses;
    }
  };
  const getTitle = () => {
    if (isALLData) {
      return "همه ی کاربران شما";
    } else if (isActiveData) {
      return "کاربران فعال شما";
    // } else if (isDeletedData) {
    //   return "دوره های حذف شده شما";
    } else if (isCurrentData) {
      return "کاربران حذف شده";
    }
  };

  const userParams = {
    PageNumber: currentPage,
    RowsOfPage: rowsPerPage,
    SortingCol: sort,
    SortType: sortColumn,
    Query: searchValue,
    IsActiveUser: IsActiveUser,
    IsDeletedUser: "true",
    roleId: 3
  };
  const getUserList = async () => {
    try {
      const result = await instance.get("/User/UserMannage", {
        params: userParams,
      });
      setData(result.listUser);
      setAllData(result.listUser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserList();
  }, [searchValue, currentPage, rowsPerPage]);
  useEffect(() => {
    let isActive =
      data.length !== 0 &&
      data.filter((user) => {
        return user.active === true;
      });
    // let deleted =
    //   data.length !== 0 &&
    //   data.filter((course) => {
    //     return course.isdelete === true;
    //   });
    // let itsStatus =
    //   data.length !== 0 &&
    //   data.filter((course) => {
    //     return course.statusName === "درحال برگذاری";
    //   });
    setActiveUsers(isActive);
    setAllActiveUsers(isActive);
    // setDeletedCourses(deleted);
    // setAllDeletedCourses(deleted);
    // setCurrentCourses(itsStatus);
    // setAllCurrentCourses(itsStatus);
  }, [data]);

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection.toUpperCase());
    setSortColumn(column.sortField);
    console.log("sortField", column.sortField);
    console.log("sortDirection", sortDirection);
  };

  return (
    <div>
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isALLData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<User size={21} />}
            color="warning"
            onclick={() => {
              setIsALLData(true);
              setIsActiveData(false);
              setIsCurrentData(false);
              // setIsDeletedData(false);
            }}
            stats={data.length}
            statTitle="همه ی کاربران شما"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isActiveData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<User size={21} />}
            color="success"
            onclick={() => {
              setIsALLData(false);
              setIsActiveData(true);
              setIsCurrentData(false);
              // setIsDeletedData(false);
            }}
            stats={activeUsers.length}
            statTitle="کاربران فعال شما"
          />
        </Col>
        {/* <Col lg="3" sm="6">
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
              // setIsDeletedData(true);
            }}
            stats={deletedCourses.length}
            statTitle="دوره های حذف شده"
          />
        </Col> */}
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isCurrentData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<Trash2 size={21} />}
            color="primary"
            onclick={() => {
              setIsALLData(false);
              setIsActiveData(false);
              setIsCurrentData(true);
              // setIsDeletedData(false);
            }}
            stats={currentCourses.length}
            statTitle="کاربران حذف شده"
          />
        </Col>
      </Row>
      <TableServerSide
        allData={getAllData()}
        data={getData()}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        // setSelectedRows={setSelectedRows}
        onSort={handleSort}
        setCurrentPage={setCurrentPage}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        serverSideColumns={userListColumns}
        // BtnLink={"/Course/create"}
        title={getTitle()}
        BtnTitle={"اضافه کردن کاربر"}
        BtnIcon={<User/>}
      />
    </div>
  );
};

export default UserList;
