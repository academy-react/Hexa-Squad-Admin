
import { useEffect, useState } from "react";
import TableServerSide from "../../../../@core/components/tableServerSide/TableServerSide";
import { userListColumns } from "../../../../@core/components/tableServerSide/data";
import instance from "../../../../utility/interceptor";
import { User } from "react-feather";

const UserList = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const userParams = {
    PageNumber: currentPage,
    RowsOfPage: rowsPerPage,
    SortingCol: "DESC",
    SortType: "InsertDate",
    Query: searchValue,
    IsActiveUser: "true",
    IsDeletedUser: "true",
    roleId: 3
  };
  const getUserList = async () => {
    try {
      const result = await instance.get("/User/UserMannage", {
        params: userParams,
      });
      setData(result.listUser);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserList();
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
        serverSideColumns={userListColumns}
        title={"لیست کاربران"}
        BtnTitle={"اضافه کردن کاربر"}
        BtnIcon={<User/>}
      />
    </div>
  );
};

export default UserList;
