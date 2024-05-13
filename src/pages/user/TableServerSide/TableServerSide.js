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
  Label,
  Row,
  Col,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));
const DataTableServerSide = ({
  serverSideColumns,
  title,
  setRowsPerPage,
  rowsPerPage,
  currentPage,
  setCurrentPage,
  setSearchValue,
  allData,
  data,
  onSort,
  deleteOject,
  setSelectedRows,
  btn,
  totalCount
}) => {
  // Function to toggle sidebar // Add User Toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Select Role
  // const [currentRole, setCurrentRole] = useState({
  //   value: "",
  //   label: "Select Role",
  // });
  // const roleOptions = [
  //   { value: "", label: "Select Role" },
  //   { value: "admin", label: "Administrator" },
  //   { value: "author", label: "Teacher" },
  //   { value: "editor", label: "Student" },
  //   { value: "maintainer", label: "CourseAssistance" },
  //   { value: "subscriber", label: "EmployeeAdmin" },
  // ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const searchRef = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + rowsPerPage;
  const currentItems = data.length > 0 && data.slice(itemOffset, endOffset);

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

  // ** Table data to render
  // const dataToRender = () => {
  //   const filters = {
  //     role: currentRole.value,
  //     q: searchValue,
  //   };

  //   const isFiltered =
  //     searchValue &&
  //     Object.keys(filters).some(function (k) {
  //       return filters[k].length > 0;
  //     });

  //   if (data.length > 0) {
  //     return data;
  //   } else if (data.length === 0 && isFiltered) {
  //     return [];
  //   } else {
  //     return allData.slice(0, rowsPerPage);
  //   }
  // };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">{title}</CardTitle>
          <CardTitle tag="h4">{btn}</CardTitle>
          {/* <CardTitle tag="h4">
            <Button
              color="primary"
              className="d-flex gap-1 align-items-center"
              onClick={toggleSidebar}
            >
              {BtnTitle}
              {BtnIcon}
            </Button>
          </CardTitle> */}
        </CardHeader>
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="2">
            <div className="d-flex gap-1 align-items-center">
              <Label for="sort-select" className="text-nowrap">
                تعداد در صفحه{" "}
              </Label>
              <Input
                className="dataTable-select"
                type="select"
                id="sort-select"
                style={{ width: "5rem" }}
                value={rowsPerPage}
                onChange={(e) => handlePerPage(e)}
              >
                <option value={7}>7</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={75}>75</option>
                <option value={100}>100</option>
              </Input>
            </div>
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="4"
          >
            {isChecked ? (
              <Button
                color="danger"
                className="d-flex align-items-center justify-content-center gap-1 "
                style={{ padding: "8px 10px" }}
                onClick={deleteOject}
              >
                <Trash size={18} />
                حذف کاربر
              </Button>
            ) : (
              ""
            )}
          </Col>
          <Col
            className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
            sm="6"
          >
            <Label className="me-1" for="search-input">
              جستجو
            </Label>
            <Input
              className="dataTable-filter"
              type="text"
              bsSize="sm"
              id="search-input"
              // value={searchValue}
              onChange={handleFilter}
            />
          </Col>
        </Row>
        <div className="react-dataTable position-relative">
          {currentItems?.length == 0 || totalCount == 0 ? (
            <div style={{ background: "#fff" }} className="py-3 text-center">
              لیست مد نظر شما خالی است!
            </div>
          ) : (
            <DataTable
              noHeader
              pagination
              paginationServer
              selectableRows
              className="react-dataTable"
              columns={serverSideColumns}
              onSort={onSort}
              sortIcon={<ChevronDown size={10} />}
              paginationComponent={CustomPagination}
              data={currentItems}
              paginationDefaultPage={currentPage + 1}
              selectableRowsComponent={BootstrapCheckbox}
              onSelectedRowsChange={onSelectedCheckbox}
            />
          )}
        </div>
      </Card>
      {/* <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
    </Fragment>
  );
};

export default memo(DataTableServerSide);
