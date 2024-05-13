import { Fragment, useEffect, useState } from "react";
import { UserFavorite } from "../../../../@core/components/tableServerSide/data";
import TableServerSide from "../TabTable";
import { useParams } from "react-router-dom";
import instance from "../../../../utility/interceptor";

const userFavoriteTable = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [sortColumn, setSortColumn] = useState("InsertDate");

  // const Btn = () => (
  //   <Link to={"/AddNews"}>
  //     <Button color="primary" className="d-flex gap-1 align-items-center">
  //       {"ساخت دسته بندی جدید"}
  //       <PlusSquare />
  //     </Button>
  //   </Link>
  // );

  const urlParam = useParams();
  console.log(urlParam);
  const GetUserInfo = async () => {
    try {
      const response = await instance.get(`/User/UserDetails/${urlParam.id}`);
      const result = response.courses;
      setData(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, []);
  console.log("data", data);

  return (
    <Fragment>
      <TableServerSide
        data={data}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setSelectedRows={setSelectedRows}
        serverSideColumns={UserFavorite}
        title={"لیست علاقه مندی ها "}
      />
    </Fragment>
  );
};

export default userFavoriteTable;
