
import { useEffect, useState } from "react";
import TableServerSide from "../../../@core/components/tableServerSide/TableServerSide";
import { userListColumns } from "../../../@core/components/tableServerSide/data";
import instance from "../../../utility/interceptor";
import { User } from "react-feather";

const AdminList = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
console.log(data);
  const userParams = {
    PageNumber: currentPage,
    RowsOfPage: 1000,
    SortingCol: "DESC",
    SortType: "InsertDate",
    Query: searchValue,
    IsActiveUser: "true",
    IsDeletedUser: "true",
    roleId: 1
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
        title={"لیست مدیران"}
        BtnTitle={"اضافه کردن مدیر"}
        BtnIcon={<User/>}
      />
    </div>
  );
};

export default AdminList;
