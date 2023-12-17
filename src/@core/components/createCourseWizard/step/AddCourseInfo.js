import { Button, CardBody, CardHeader, Row } from "reactstrap";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import FormikInput from "../../FormikInput";
import { jalali_to_gregorian } from "../../../../utility/jalaliToGregorian";
import PickerRange from "../../PickerRange";
import SeparationPrice from "../../../../utility/SeparationPrice/SeparationPrice";
const AddCourseInfo = ({
  stepper,
  setTitle,
  setMiniDescribe,
  setCapacity,
  setSessionNumber,
  setCost,
  title,
  miniDescribe,
  capacity,
  sessionNumber,
  cost,
  setStartDate,
  setEndDate,
  isModal,
}) => {
  const [dateRange, setDateRange] = useState("");
  const [picker, setPicker] = useState(new Date());
  const postCourse = (values) => {
    setTitle(values.Title);
    setMiniDescribe(values.MiniDescribe);
    setCapacity(values.Capacity);
    setSessionNumber(values.SessionNumber);
    setCost(values.Cost);
  };
  useEffect(() => {
    console.log(dateRange[0]);
    dateRange[0] &&
      setStartDate(
        jalali_to_gregorian(
          dateRange[0].year,
          dateRange[0].month,
          dateRange[0].day
        )
      );
    dateRange[1] &&
      setEndDate(
        jalali_to_gregorian(
          dateRange[1].year,
          dateRange[1].month,
          dateRange[1].day
        )
      );
  }, [dateRange]);
  return (
    <Fragment>
      <CardHeader className="my-2 mb-4">
        <h2>اضافه کردن اطلاعات دوره </h2>
      </CardHeader>
      <Formik
        initialValues={{
          Title: title,
          MiniDescribe: miniDescribe,
          Capacity: capacity,
          SessionNumber: sessionNumber,
          Cost: cost,
        }}
        enableReinitialize={true}
        onSubmit={(v) => {
          postCourse(v);
        }}
      >
        {/* <Form className="px-3 py-1"> */}
        {(form) => {
          setTitle(form.values.Title);
          setMiniDescribe(form.values.MiniDescribe);
          setCapacity(form.values.Capacity);
          setSessionNumber(form.values.SessionNumber);
          setCost(form.values.Cost);
          return (
            <CardBody className="cursor-pointer">
              {isModal ? (
                <Fragment>
                  <Row className="my-1">
                    <FormikInput
                      name={"Title"}
                      placeholder={"نام دوره را وارد کنید"}
                      label={"نام دوره"}
                      addClass={"col-md-6"}
                      type={"text"}
                    />

                    <div className="col-md-6 position-relative">
                      {cost && (
                        <span
                          className="position-absolute"
                          style={{ top: "-8px", left: "15px" }}
                        >
                          {" "}
                          {SeparationPrice(cost) + " "}
                          تومان
                        </span>
                      )}
                      <FormikInput
                        name={"Cost"}
                        placeholder={"قیمت دوره را وارد کنید"}
                        type={"number"}
                        label={"قیمت دوره"}
                      />
                    </div>
                  </Row>
                  <Row>
                    <FormikInput
                      name={"Capacity"}
                      placeholder={"ظرفیت دوره را وارد کنید"}
                      label={"ظرفیت دوره"}
                      type={"number"}
                      addClass={"col-md-6"}
                    />

                    <FormikInput
                      as={"textarea"}
                      name={"MiniDescribe"}
                      placeholder={"توضیحات مخصتر درباره دوره را وارد کنید"}
                      label={"توضیحات مخصتر درباره دوره"}
                      addClass={"col-md-6"}
                    />
                  </Row>
                  <Row className="mt-1">
                    <FormikInput
                      name={"SessionNumber"}
                      placeholder={" تعداد جلسات دوره را وارد کنید"}
                      label={"تعداد جلسات دوره"}
                      type={"number"}
                      addClass={"col-md-6"}
                    />
                    <div className="col-md-6  d-flex flex-column gap-1 ">
                      <label>زمان برگذاری :</label>
                      <PickerRange
                        setDateRange={setDateRange}
                        picker={picker}
                      />
                    </div>
                  </Row>
                </Fragment>
              ) : (
                <Fragment>
                  <Row className="my-1">
                    <FormikInput
                      name={"Title"}
                      placeholder={"نام دوره را وارد کنید"}
                      children={"نام دوره"}
                      addClass={"col-md-4"}
                      type={"text"}
                    />
                    <div className="col-md-4 position-relative">
                      {cost && (
                        <span
                          className="position-absolute"
                          style={{ top: "-8px", left: "15px" }}
                        >
                          {" "}
                          {SeparationPrice(cost) + " "}
                          تومان
                        </span>
                      )}
                      <FormikInput
                        name={"Cost"}
                        placeholder={"قیمت دوره را وارد کنید"}
                        type={"number"}
                        children={"قیمت دوره"}
                      />
                    </div>
                    <FormikInput
                      name={"Capacity"}
                      placeholder={"ظرفیت دوره را وارد کنید"}
                      children={"ظرفیت دوره"}
                      type={"number"}
                      addClass={"col-md-4"}
                    />
                  </Row>
                  <Row>
                    <FormikInput
                      as={"textarea"}
                      name={"MiniDescribe"}
                      placeholder={"توضیحات مخصتر درباره دوره را وارد کنید"}
                      children={"توضیحات مخصتر درباره دوره"}
                      addClass={"col-sm-4"}
                    />
                    <FormikInput
                      name={"SessionNumber"}
                      placeholder={" تعداد جلسات دوره را وارد کنید"}
                      children={"تعداد جلسات دوره"}
                      type={"number"}
                      addClass={"col-md-4"}
                    />
                    <div className="col-sm-4 d-flex flex-column gap-1 ">
                      <label>زمان برگذاری :</label>
                      <PickerRange
                        setDateRange={setDateRange}
                        picker={picker}
                      />
                    </div>
                  </Row>
                </Fragment>
              )}
            </CardBody>
          );
        }}
        {/* </Form> */}
      </Formik>

      <div className="d-flex my-2 justify-content-between">
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

export default AddCourseInfo;
