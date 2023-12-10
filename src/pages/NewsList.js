import { useEffect, useState } from "react";
import TableServerSide from "../@core/components/tableServerSide/TableServerSide";
import { NewsListColumns } from "../@core/components/tableServerSide/data";
import instance from "../utility/interceptor";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const Courses = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const Btn = () => (
    <Link to={"/AddNews"}>
      <Button color="primary" className="d-flex gap-1 align-items-center">
        {"اضافه کردن بلاگ"}
      </Button>
    </Link>
  );
  console.log(data);
  const NewsParams = {
    PageNumber: 1,
    RowsOfPage: 1000,
    Query: searchValue,
  };
  const getNewsList = async () => {
    try {
      const News = await instance.get("/News/AdminNewsFilterList", {
        params: NewsParams,
      });
      setData(News.news);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNewsList();
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
        setSelectedRows={setSelectedRows}
        serverSideColumns={NewsListColumns}
        title={"اخبار شما"}
        btn={<Btn />}
      />
    </div>
  );
};

export default Courses;
