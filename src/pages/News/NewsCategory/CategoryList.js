import { Fragment, useEffect, useState } from "react";
// import TableServerSide from "../../@core/components/tableServerSide/TableServerSide";
// import NewsTable from "./NewsTable";
import { CategoryListColumns } from "../../../@core/components/tableServerSide/data";
import instance from "../../../utility/interceptor";
// import StatsHorizontal from "../../@core/components/StatsHorizontal";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "reactstrap";
import {
  User,
  BookOpen,
  PlusSquare,
  Cpu,
  GitBranch,
  Trash,
  Trash2,
} from "react-feather";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import CategoryTable from "./CategoryTable";
// import { CategoryScale } from "chart.js";

const CategoryList = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [sortColumn, setSortColumn] = useState("InsertDate");

  const Btn = () => (
    <Link to={"/AddCategory"}>
      <Button color="primary" className="d-flex gap-1 align-items-center">
        {"ساخت دسته بندی جدید"}
        <PlusSquare />
      </Button>
    </Link>
  );

  const [activeNews, setActiveNews] = useState([]);
  const [notActiveNews, setNotActiveNews] = useState([]);
  const [isActiveNews, setIsActiveNews] = useState(false);
  const [isALLData, setIsALLData] = useState(true);
  const [newsList, setNewsList] = useState([]);
  const [disableNewsCount, setDisableNewsCount] = useState(0);
  const [enableNewsCount, setEnableNewsCount] = useState(0);
  const [activeTab, setActiveTab] = useState(true);

  const CategoryList = async (query) => {
    const Params = {
      PageNumber: 1,
      RowsOfPage: 1000,
      Query: query,
    };

    try {
      const News = await instance.get("/News/GetListNewsCategory", {
        params: Params,
      });
      console.log(News);
      setNewsList(News);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    CategoryList();
  }, []);

  const handleSearch = async () => {
    try {
      const News = await instance.get("/News/GetListNewsCategory");
      setNewsList(News);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <BreadCrumbs
        title={"لیست دسته بندی اخبار  "}
        data={[{ title: "لیست دسته بندی", link: "/CategoryList" }]}
      />

      <CategoryTable
        data={newsList}
        // allData={data}
        // data={data}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchValue={searchValue}
        setSearchValue={(e) => handleSearch(e)}
        setSelectedRows={setSelectedRows}
        serverSideColumns={CategoryListColumns}
        title={"لیست دسته بندی ها"}
        // title={getTitle()}
        btn={<Btn />}
      />
    </Fragment>
  );
};

export default CategoryList;
