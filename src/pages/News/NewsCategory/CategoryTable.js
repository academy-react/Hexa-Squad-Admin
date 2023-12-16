// ** React Imports
import { useRef, Fragment, useState, useEffect, memo, forwardRef } from "react";

// ** Table Columns
// import { serverSideColumns } from "./data";
import { serverSideColumns } from "../../../@core/components/tableServerSide/data";

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
const CategoryTable = ({
  serverSideColumns,
  title,
  setRowsPerPage,
  rowsPerPage,
  currentPage,
  setCurrentPage,
  searchValue,
  setSearchValue,
  allData,
  data,
  BtnTitle,
  BtnIcon,
  BtnLink,
  onSort,
  deleteOject,
  setSelectedRows,
  trashTitle,
  btn,
}) => {
  const searchRef = useRef();
  const [isChecked, setIsChecked] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + rowsPerPage;
  const currentItems = data?.slice(itemOffset, endOffset);
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
        activeClassName="active"
        pageCount={Math.ceil(count) || 1}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Table data to render

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">{title}</CardTitle>
          <CardTitle tag="h4">{btn}</CardTitle>
        </CardHeader>
        <Row className="mx-0 mt-1 mb-50">
          <Col sm="6">
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
              {/* <Label for='sort-select'>عدد</Label> */}
            </div>
          </Col>
          <Col sm="6">
            <Row>
              <Col
                className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                xs="4"
              >
                {isChecked ? (
                  <Button
                    color="danger"
                    className="d-flex align-items-center justify-content-center gap-1 "
                    style={{ padding: "8px 10px" }}
                    onClick={deleteOject}
                  >
                    <Trash size={18} />
                    {trashTitle}
                  </Button>
                ) : (
                  ""
                )}
              </Col>
              <Col
                className="d-flex align-items-center justify-content-sm-end mt-sm-0 mt-1"
                xs="8"
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
          </Col>
        </Row>
        <Card className=" overflow-hidden">
          <div className="react-dataTable position-relative">
            {currentItems?.length == 0 ? (
              <div className="py-3 text-center">لیست مد نظر شما خالی است</div>
            ) : (
              <DataTable
                noHeader
                pagination
                paginationServer
                // selectableRows
                sortServer
                responsive
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
      </Card>
    </Fragment>
  );
};

export default memo(CategoryTable);
