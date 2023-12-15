import { Fragment, useEffect, useState } from "react";
// import TableServerSide from "../../@core/components/tableServerSide/TableServerSide";
import NewsTable from "./NewsTable";
import { NewsListColumns } from "../../@core/components/tableServerSide/data";
import instance from "../../utility/interceptor";
import StatsHorizontal from "../../@core/components/StatsHorizontal";
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
import BreadCrumbs from "../../@core/components/breadcrumbs";

const NewsList = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  // const [sortColumn, setSortColumn] = useState("InsertDate");

  const Btn = () => (
    <Link to={"/AddNews"}>
      <Button color="primary" className="d-flex gap-1 align-items-center">
        {"اضافه کردن خبر جدید"}
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

  const NewsParams = {
    PageNumber: 1,
    RowsOfPage: 1000,
    Query: searchValue,
  };
  const getTitle = () => {
    if (activeTab) {
      return "لیست اخبار فعال";
    } else {
      return "لیست اخبار غیرفعال";
    }
  };
  const getNewsList = async () => {
    try {
      const News = await instance.get("/News/AdminNewsFilterList", {
        params: NewsParams,
      });
      setData(News.news);
      setAllData(News.news);
      setNewsList(News.news);
    } catch (error) {
      console.log(error);
    }
  };
  const getEnabledNews = async () => {
    const NotActive = {
      PageNumber: 1,
      RowsOfPage: 1000,
      Query: searchValue,
    };
    try {
      const News = await instance.get("/News/AdminNewsFilterList", {
        params: NotActive,
      });
      console.log(News.news);
      setNewsList(News.news);
      setEnableNewsCount(News.news?.length);
      return News.news;
    } catch (error) {
      console.log(error);
    }
  };
  const getDisabledNews = async () => {
    const NotActive = {
      PageNumber: 1,
      RowsOfPage: 1000,
      Query: searchValue,
      // SortType: sortColumn,
      IsActive: false,
    };
    try {
      const News = await instance.get("/News/AdminNewsFilterList", {
        params: NotActive,
      });
      setDisableNewsCount(News.news?.length);
      return News.news;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getEnabledNews();
    getDisabledNews();
  }, []);

  const handleEnableFilter = async () => {
    const data = await getEnabledNews();
    setNewsList(data);
    setActiveTab(true);
  };

  const handleDisableFilter = async () => {
    const data = await getDisabledNews();
    setNewsList(data);
    setActiveTab(false);
  };

  const handleSearch = async (query) => {
    const Params = {
      PageNumber: 1,
      RowsOfPage: 1000,
      Query: query,
    };

    try {
      const News = await instance.get("/News/AdminNewsFilterList", {
        params: Params,
      });
      setNewsList(News.news);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <BreadCrumbs
        title={"لیست اخبار هگزا اسکواد"}
        data={[{ title: "لیست اخبار", link: "/NewsList" }]}
      />
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={activeTab && "#0002"}
            className=" cursor-pointer rounded"
            icon={<BookOpen size={21} />}
            color="primary"
            onclick={handleEnableFilter}
            stats={enableNewsCount}
            statTitle=" اخبار فعال"
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            // theme={selectThemeColors}
            backGroundColor={!activeTab && "#0002"}
            className=" cursor-pointer rounded"
            icon={<BookOpen size={21} />}
            color="success"
            onclick={handleDisableFilter}
            stats={disableNewsCount}
            statTitle="اخبار غیرفعال"
          />
        </Col>
      </Row>
      <NewsTable
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
        serverSideColumns={NewsListColumns}
        // title={"اخبار شما"}
        title={getTitle()}
        btn={<Btn />}
      />
    </Fragment>
  );
};

export default NewsList;
