import { Button, CardBody, CardHeader, Row } from "reactstrap";
import FormikInput from "../../FormikInput";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import PickerRange from "../../PickerRange";
import { jalali_to_gregorian } from "../../../../utility/jalaliToGregorian";

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
              <Row className="my-1">
                <FormikInput
                  name={"Title"}
                  placeholder={"نام دوره را وارد کنید"}
                  label={"نام دوره"}
                  addClass={"col-md-6"}
                  type={"text"}
                />
                <FormikInput
                  name={"Cost"}
                  placeholder={"قیمت دوره را وارد کنید"}
                  type={"number"}
                  label={"قیمت دوره"}
                  addClass={"col-md-6"}
                />
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
                  addClass={"col-sm-6"}
                />
                <FormikInput
                  name={"SessionNumber"}
                  placeholder={" تعداد جلسات دوره را وارد کنید"}
                  label={"تعداد جلسات دوره"}
                  type={"number"}
                  addClass={"col-md-6"}
                />
                <div className="col-sm-4 d-flex flex-column gap-1 ">
                  <label>زمان برگذاری :</label>
                  <PickerRange setDateRange={setDateRange}  picker={picker} />
                </div>
              </Row>
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
