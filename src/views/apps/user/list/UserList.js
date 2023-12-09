
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
import DeleteUser from "../../../../utility/api/DeleteData/DeleteUser";
import BreadCrumbs from "../../../../@core/components/breadcrumbs";


const UserList = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [sort, setSort] = useState("DESC");
  const [sortColumn, setSortColumn] = useState("InsertDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleId, setRoleId] = useState(3)
  const [isActiveUser, setIsActiveUser] = useState(false)
  const [isDeleteUser, setIsDeleteUser] = useState(false)

  const [allDeletedUsers, setAllDeletedUsers] = useState([])
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [allActiveUsers, setAllActiveUsers] = useState([]);
  const [isALLData, setIsALLData] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  const getData = () => {
    if (isALLData) {
      return data;
    } else if (isActiveUser) {
      return activeUsers;
    } else if (isDeleteUser) {
      return deletedUsers;
    }
  };
  const getAllData = () => {
    if (isALLData) {
      return allData;
    } else if (isActiveUser) {
      return allActiveUsers;
    } else if (isDeleteUser) {
      return allDeletedUsers;
    }
  };
  const getTitle = () => {
    if (isALLData) {
      return "همه ی کاربران شما";
    } else if (isActiveUser) {
      return "کاربران فعال شما";
    } else if (isDeleteUser) {
      return "کاربران حذف شده";
    }
  };

  const userParams = {
    PageNumber: currentPage,
    RowsOfPage: rowsPerPage,
    SortingCol: sort,
    SortType: sortColumn,
    Query: searchValue,
    IsActiveUser: isActiveUser,
    IsDeletedUser: isDeleteUser,
    roleId: roleId
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
  }, [searchValue, currentPage, rowsPerPage, isActiveUser, isDeleteUser, roleId]);
  useEffect(() => {
    let isActive =
      data.length !== 0 &&
      data.filter((user) => {
        return user.active === "True";
      });
    let deleted =
      data.length !== 0 &&
      data.filter((user) => {
        return user.active === "False";
      });
    setActiveUsers(isActive);
    setAllActiveUsers(isActive);
    setDeletedUsers(deleted);
    setAllDeletedUsers(deleted);
  }, [data]);

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection.toUpperCase());
    setSortColumn(column.sortField);
    console.log("sortField", column.sortField);
    console.log("sortDirection", sortDirection);
  };

  // Delete User
  const deleteUser = () => {
    console.log("selectedRows", selectedRows);
    selectedRows.map((user) => {
      DeleteUser(user.id, "/user/userList");
    });
  };

  return (
    <div>
      <BreadCrumbs
        title={"لیست کاربران هگزا اسکواد"}
        data={[{ title: "لیست کاربران", link: "/user/userList" }]}
      />
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isALLData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<User size={21} />}
            color="primary"
            onclick={() => {
              setIsALLData(true);
              setIsActiveUser(true);
              setIsDeleteUser(false);
            }}
            stats={data.length}
            statTitle="همه ی کاربران شما"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isActiveUser && "#0002"}
            className=" cursor-pointer rounded"
            icon={<User size={21} />}
            color="success"
            onclick={() => {
              setIsALLData(false);
              setIsActiveUser(true);
              setIsDeleteUser(false);
            }}
            stats={activeUsers.length}
            statTitle="کاربران فعال شما"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isDeleteUser && "#0002"}
            className=" cursor-pointer rounded"
            icon={<Trash2 size={21} />}
            color="danger"
            onclick={() => {
              setIsALLData(false);
              setIsActiveUser(false);
              setIsDeleteUser(true);
            }}
            stats={deletedUsers.length}
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
        setRoleId={setRoleId}

        setSelectedRows={setSelectedRows}
        onSort={handleSort}
        setCurrentPage={setCurrentPage}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        serverSideColumns={userListColumns}
        deleteOject={deleteUser}

        title={getTitle()}
        BtnTitle={"اضافه کردن کاربر"}
        BtnIcon={<User/>}
      />
    </div>
  );
};

export default UserList;