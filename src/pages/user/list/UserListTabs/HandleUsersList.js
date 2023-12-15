import { Fragment, useEffect, useState } from "react";
import { User, Trash2 } from "react-feather";
import { Col, Row } from "reactstrap";
import TableServerSide from "../../TableServerSide/TableServerSide";
import { userListColumns } from "../../../../@core/components/tableServerSide/data";
import StatsHorizontal from "../../../../@core/components/StatsHorizontal";
import instance from "../../../../utility/interceptor";
import {handleDeleteUser} from "../../../../utility/api/DeleteData/DeleteUser";
import BreadCrumbs from "../../../../@core/components/breadcrumbs";
import AddUSer from "../AddUser";

const HandleUsersList = ({
    role,
    activeUserCount,
    deletedUserCount,
    activeStatTitle,
    deletedStatTitle,
    addUserBtn
}) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [sort, setSort] = useState("DESC");
  const [sortColumn, setSortColumn] = useState("InsertDate");
  const [currentPage, setCurrentPage] = useState(1);
  const [roleId, setRoleId] = useState(role);
  const [isActiveUser, setIsActiveUser] = useState(true);
  const [isDeleteUser, setIsDeleteUser] = useState(false);
  const [isALLData, setIsALLData] = useState(true);

  const [allDeletedUsers, setAllDeletedUsers] = useState([]);
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [allActiveUsers, setAllActiveUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [totalCount, setTotalCount] = useState()

  const getData = () => {
    if (isALLData) {
      return data;
    } else if (isActiveUser) {
      return activeUsers;
    } else if (isDeleteUser) {
      return deletedUsers;
    }
  };
  // const getAllData = () => {
  //   if (isALLData) {
  //     return allData;
  //   } else if (isActiveUser) {
  //     return allActiveUsers;
  //   } else if (isDeleteUser) {
  //     return allDeletedUsers;
  //   }
  // };
  const getTitle = () => {
    if (isActiveUser) {
      return activeUserCount+totalCount;
    } else if (isDeleteUser) {
      return deletedUserCount+totalCount;
    }
  };

  const userParams = {
    PageNumber: 1,
    RowsOfPage: 1000,
    SortingCol: sort,
    SortType: sortColumn,
    Query: searchValue,
    IsActiveUser: isActiveUser,
    IsDeletedUser: isDeleteUser,
    roleId: roleId,
  };
  const getUserList = async () => {
    try {
      const result = await instance.get("/User/UserMannage", {
        params: userParams,
      });
      setData(result.listUser);
      setAllData(result.listUser);
      setTotalCount(result.totalCount)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserList();
  }, [searchValue, currentPage, rowsPerPage, roleId, isActiveUser, isDeleteUser]);
  useEffect(() => {
    let isActive =
      data.length !== 0 &&
      data.filter((user) => {
        return user.active === "True";
      });
    let deleted =
      data.length !== 0 &&
      data.filter((user) => {
        return user.active === 'False';
      });
    setActiveUsers(isActive);
    setDeletedUsers(deleted);
  }, [data]);

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection.toUpperCase());
    setSortColumn(column.sortField);
  };

  // Delete User
  const deleteUser = () => {
    selectedRows.map((user) => {
      handleDeleteUser(user.id, "/userList");
    });
  };

  // Add User Role
  // const userRole = () => {
  //   console.log("selectedRows", selectedRows);
  //   selectedRows.map((user) => {
  //     AddUserRole(user.id, "/userList");
  //   });
  // };

  return (
    <div>
      <Row>
        {/* <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={isALLData && "#0002"}
            className=" cursor-pointer rounded"
            icon={<User size={21} />}
            color="primary"
            onclick={() => {
              setIsALLData(true);
              setIsActiveUser(false);
              setIsDeleteUser(false);
            }}
            stats={data.length}
            statTitle="همه ی کاربران شما"
          />
        </Col> */}
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
            // stats={activeUsers.length}
            statTitle={activeStatTitle}
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
            // stats={deletedUsers.length}
            statTitle={deletedStatTitle}
          />
        </Col>
      </Row>
      <TableServerSide
        // allData={getAllData()}
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
        // BtnTitle={"اضافه کردن کاربر"}
        // BtnIcon={<User />}
        btn={addUserBtn}
        totalCount={totalCount}
      />
    </div>
  );
};

export default HandleUsersList;