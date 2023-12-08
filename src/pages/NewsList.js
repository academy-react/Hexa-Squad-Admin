import { useEffect, useState } from "react";
import TableServerSide from "../@core/components/tableServerSide/TableServerSide";
import { NewsListColumns } from "../@core/components/tableServerSide/data";
import instance from "../utility/interceptor";

const Courses = () => {
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  const NewsParams = {
    PageNumber: currentPage,
    RowsOfPage: rowsPerPage,
    // Query: searchValue,
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
        serverSideColumns={NewsListColumns}
        title={ "اخبار شما" }
        
      />
    </div>
  );
};

export default Courses;
