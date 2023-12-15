import { Button, CardBody, CardHeader, Row } from "reactstrap";
import FormikInput from "../../../../../@core/components/FormikInput";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import PersianDatePicker from "../../../../../@core/components/DatePicker/PersianDatePicker";
import { jalali_to_gregorian } from "../../../../../utility/jalaliToGregorian";

const AddUserInfo = ({
  stepper,
  setFirstName,
  setLastName,
  setUserAbout,
  setHomeAdderess,
  setNationalCode,
  setBirthDay,
  userInfo,
}) => {
  const [datePicker, setDatePicker] = useState("");
  const putUserInfo = (values) => {
    setFirstName(values.fName);
    setLastName(values.lName);
    setUserAbout(values.userAbout);
    setHomeAdderess(values.homeAdderess);
    setNationalCode(values.nationalCode);
    // setBirthDay(values.birthDay);
  };
  useEffect(() => {
    datePicker &&
      setBirthDay(
        jalali_to_gregorian(datePicker.year, datePicker.month, datePicker.day)
      );
  }, [datePicker]);
  return (
    <Fragment>
      <CardHeader className="my-2 mb-4">
        <h2>ویرایش اطلاعات کاربر </h2>
      </CardHeader>
      <Formik
        initialValues={{
          fName: userInfo.fName,
          lName: userInfo.lName,
          userAbout: userInfo.userAbout,
          homeAdderess: userInfo.homeAdderess,
          nationalCode: userInfo.nationalCode,
          // birthDay: userInfo.birthDay
        }}
        enableReinitialize={true}
        onSubmit={(e) => {
          putUserInfo(e);
        }}
      >
        {(form) => {
          setFirstName(form.values.fName);
          setLastName(form.values.lName);
          setUserAbout(form.values.userAbout);
          setHomeAdderess(form.values.homeAdderess);
          setNationalCode(form.values.nationalCode);
          return (
            <CardBody className="cursor-pointer">
              <Row className="my-1">
                <FormikInput
                  name={"fName"}
                  placeholder={"نام کاربر را وارد کنید"}
                  label={"نام:"}
                  addClass={"col-md-4"}
                  type={"text"}
                />
                <FormikInput
                  name={"lName"}
                  placeholder={"نام خانوادگی کاربر را وارد کنید"}
                  label={"نام خانوادگی:"}
                  addClass={"col-md-4"}
                  type={"text"}
                />
                <FormikInput
                  name={"nationalCode"}
                  placeholder={"کدملی کاربر را وارد کنید"}
                  type={"text"}
                  label={"کدملی:"}
                  addClass={"col-md-4"}
                />
              </Row>
              <Row>
                <FormikInput
                  name={"userAbout"}
                  placeholder={" توضیحاتی درباره کاربر وارد کنید"}
                  label={"درباره ی کاربر:"}
                  addClass={"col-md-4"}
                  as={"textarea"}
                />
                <FormikInput
                  as={"textarea"}
                  name={"homeAdderess"}
                  placeholder={"آدرس کاربر را وارد کنید"}
                  label={"آدرس:"}
                  addClass={"col-sm-4"}
                />
                <div className="col-sm-4 d-flex flex-column gap-1 ">
                  <label>تاریخ تولد :</label>
                  <PersianDatePicker
                    setDatePicker={setDatePicker}
                    userInfo={userInfo}
                  />
                </div>
              </Row>
            </CardBody>
          );
        }}
        {/* </Form> */}
      </Formik>

      <div className="d-flex my-2  justify-content-between ">
        <Button color="secondary" className="btn-prev" outline disabled>
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

export default AddUserInfo;
