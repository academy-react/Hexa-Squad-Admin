// ** React Imports
import { Fragment, useEffect, useRef, useState } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Modal,
  Label,
  Input,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  InputGroup,
  ModalHeader,
  FormFeedback,
  InputGroupText,
} from "reactstrap";

// ** Third Party Components
import classnames from "classnames";
// import Cleave from "cleave.js/react";
import { Check, X, CreditCard, ChevronDown } from "react-feather";
import DataTable from "react-data-table-component";
import { reservesColumns } from "../tableServerSide/data";
import ReactPaginate from "react-paginate";
import GetCourseReserves from "../../../utility/api/GetData/GetCourseReserves/GetCourseReserves";

const Reservers = ({ courseId }) => {
  // ** States
  const searchRef = useRef(null);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([{}]);
  const [searchValue, setSearchValue] = useState(null);
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + 7;
  const [currentPage, setCurrentPage] = useState(1);
  const currentItems = data?.slice(itemOffset, endOffset);

  const handlePagination = (page) => {
    setCurrentPage(page.selected + 1);
    const newOffset = (page.selected * 7) % data.length;
    setItemOffset(newOffset);
  };

  const getReservers = async () => {
    const data = await GetCourseReserves(courseId);
    setData(data);
  };
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
  const CustomPagination = () => {
    const count = Math.ceil(data.length / 7);
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
  useEffect(() => {
    getReservers();
  }, []);

  return (
    <Fragment>
      <Button onClick={() => setShow(true)} color="info" size="sm">
        رزرو ها
      </Button>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-5 mx-50 pb-5">
          <div className="d-flex align-items-center my-2 justify-content-sm-end mt-sm-0 mt-1">
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
          </div>
          <DataTable
            noHeader
            pagination
            paginationServer
            responsive
            className="react-dataTable"
            columns={reservesColumns}
            sortIcon={<ChevronDown size={10} />}
            paginationComponent={CustomPagination}
            data={currentItems}
            paginationDefaultPage={currentPage + 1}
          />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Reservers;
