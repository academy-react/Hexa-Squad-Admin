// ** React Imports
import { useState, useEffect } from "react";

// ** Third Party Components
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";

// ** Reactstrap Imports
import { Card } from "reactstrap";
import TableServerSide from "../../@core/components/tableServerSide/TableServerSide";
import GetCourseReserves from "../../utility/api/GetData/GetCourseReserves/GetCourseReserves";
import { reserveColumns } from "../../@core/components/tableServerSide/data";
const InvoiceList = ({ detail }) => {
  const [allComments, setAllComments] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countInPage, setCountInPage] = useState(7);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchValue, setSearchValue] = useState(null);
  const filterSearch = (values) => {
    console.log("All data", allComments);
    let filteredData = allComments.filter((item) => {
      return item.title.indexOf(values) != -1;
    });
    setComments(filteredData);
  };

  const getComments = async () => {
    const result = await GetCourseReserves(detail.courseId);
    console.log("getComments result : ", result);
    setComments(result);
    setAllComments(result);
  };
  useEffect(() => {
    detail.courseId && getComments();
  }, [detail.courseId]);
  useEffect(() => {
    filterSearch();
  }, [searchValue]);
  return (
    <Card>
      <div className="react-dataTable user-view-account-projects">
        <TableServerSide
          allData={allComments}
          data={comments}
          rowsPerPage={countInPage}
          setRowsPerPage={setCountInPage}
          currentPage={currentPage}
          deleteOject={() => {}}
          setSelectedRows={setSelectedRows}
          onSort={() => {}}
          setCurrentPage={setCurrentPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          serverSideColumns={reserveColumns}
          title={""}
        />
      </div>
    </Card>
  );
};

export default InvoiceList;
