// ** React Imports
import { useRef, Fragment, useState, useEffect, memo, forwardRef } from "react";
import Select from "react-select";

// ** Table Columns
// import { serverSideColumns } from "../../../../@core/components/tableServerSide/data";

// ** Third Party Components
import ReactPaginate from "react-paginate";
import {
  Book,
  User,
  ChevronDown,
  PenTool,
  PhoneOutgoing,
  Trash,
} from "react-feather";
import DataTable from "react-data-table-component";

// Side Bar Input
import Sidebar from "../list/Sidebar";
import AddUSer from "../list/AddUser";

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  Input,
} from "reactstrap";
import { Link } from "react-router-dom";

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));
const TabTable = ({
  serverSideColumns,
  title,
  setRowsPerPage,
  rowsPerPage,
  currentPage,
  setCurrentPage,
  setSearchValue,
  data,
  onSort,
  setSelectedRows,
  btn,
}) => {
  // Function to toggle sidebar // Add User Toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const searchRef = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + rowsPerPage;
  const currentItems = data.length > 0 && data.slice(itemOffset, endOffset);
  console.log("currentItems", currentItems);
  console.log("data", data);
  // ** Function to handle filter
  const handleFilter = (e) => {
    const value = e.target.value;
    clearTimeout(searchRef.current);
    const timeOut = setTimeout(() => {
      if (value !== "") {
        setSearchValue(value);
      } else {
        setSearchValue(null);
      }
    }, 1000);
    searchRef.current = timeOut;
  };

  const onSelectedCheckbox = (value) => {
    console.log(value);
    setSelectedRows(value.selectedRows);
    if (value.selectedCount > 0) {
      setIsChecked(true);
    } else if (value.selectedCount == 0) {
      setIsChecked(false);
    }
  };
  // ** Function to handle Pagination and get data
  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
    const newOffset = (page.selected * rowsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  // ** Function to handle per page
  const handlePerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value));
  };

  // ** Custom Pagination
  const CustomPagination = () => {
    const count = Math.ceil(data.length / rowsPerPage);

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={Math.ceil(count) || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName="page-item"
        breakClassName="page-item"
        nextLinkClassName="page-link"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        previousLinkClassName="page-link"
        nextClassName="page-item next-item"
        previousClassName="page-item prev-item"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1"
        }
      />
    );
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">{title}</CardTitle>
          <CardTitle tag="h4">{btn}</CardTitle>
        </CardHeader>
        <div className="react-dataTable position-relative  ">
          {currentItems?.length == 0 || currentItems === false ? (
            <div style={{ background: "#fff" }} className="py-3 text-center">
              لیست مد نظر شما خالی است!
            </div>
          ) : (
            <DataTable
              noHeader
              pagination
              paginationServer
              // selectableRows
              className="react-dataTable"
              columns={serverSideColumns}
              onSort={onSort}
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              data={currentItems}
              paginationDefaultPage={currentPage + 1}
              // selectableRowsComponent={BootstrapCheckbox}
              // onSelectedRowsChange={onSelectedCheckbox}
            />
          )}
        </div>
      </Card>
      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  );
};

export default memo(TabTable);
