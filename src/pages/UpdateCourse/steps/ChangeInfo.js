import { Fragment } from "react";
import { Button, Row } from "reactstrap";
import FormikInput from "../../../@core/components/FormikInput";
import SeparationPrice from "../../../utility/SeparationPrice/SeparationPrice";
import PickerRange from "../../../@core/components/PickerRange";
import { ArrowDownLeft, ArrowLeft, ArrowRight } from "react-feather";

const ChangeInfo = ({ cost, setDateRange, picker, stepper }) => {
  return (
    <Fragment>
      <Row>
        <FormikInput
          name={"Title"}
          addClass={"col-md-4"}
          labelClassName={"my-1 form-label"}
        >
          نام دوره
        </FormikInput>
        <div className="col-md-4 position-relative">
          {cost && (
            <span
              className="position-absolute"
              style={{ top: "15px", left: "15px" }}
            >
              {" "}
              {SeparationPrice(cost) + " "}
              تومان
            </span>
          )}
          <FormikInput
            name={"Cost"}
            type={"number"}
            labelClassName={"my-1 form-label"}
          >
            قیمت دوره
          </FormikInput>
        </div>
        <FormikInput
          name={"Capacity"}
          type={"number"}
          addClass={"col-md-4"}
          labelClassName={"my-1 form-label"}
        >
          ظرفیت دوره
        </FormikInput>
      </Row>
      <Row className="mt-1">
        <FormikInput
          name={"MiniDescribe"}
          as={"textarea"}
          addClass={"col-md-4"}
          labelClassName={"my-1 form-label"}
        >
          توضیحات کوتاه دوره
        </FormikInput>
        <FormikInput
          name={"SessionNumber"}
          type={"number"}
          addClass={"col-md-4"}
          labelClassName={"my-1 form-label"}
        >
          تعداد جلسات دوره
        </FormikInput>
        <div className="col-sm-4 d-flex flex-column gap-1 ">
          <label className="my-1 form-label">زمان برگذاری :</label>
          <PickerRange setDateRange={setDateRange} picker={picker} />
        </div>
      </Row>
      <div className="d-flex my-2 justify-content-between mt-3">
        <Button
          color="primary"
          className="btn-prev"
          onClick={() => stepper.previous()}
        >
          <ArrowLeft
            size={14}
            className="align-middle me-sm-25 me-0"
          ></ArrowLeft>
          <span className="align-middle d-sm-inline-block d-none">
            قدم قبلی
          </span>
        </Button>
        <Button
          color="primary"
          className="btn-next"
          onClick={() => stepper.next()}
        >
          <span className="align-middle d-sm-inline-block d-none">
            قدم بعدی
          </span>
          <ArrowRight
            size={14}
            className="align-middle ms-sm-25 ms-0"
          ></ArrowRight>
        </Button>
      </div>
    </Fragment>
  );
};

export default ChangeInfo;
