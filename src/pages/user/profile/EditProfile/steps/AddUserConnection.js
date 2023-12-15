import { Button, CardBody, CardHeader, Row } from "reactstrap";
import FormikInput from "../../../../../@core/components/FormikInput";
import { Form, Formik } from "formik";
import { Fragment, useState } from "react";
import { ArrowLeft } from "react-feather";

const AddUserConnection = ({
  stepper,
  setEmail,
  setPhoneNumber,
  setLinkdin,
  setTelegram,
  userInfo,
  onSubmit
}) => {
  const putUserInfo = (values) => {
    setEmail(values.gmail);
    setPhoneNumber(values.phoneNumber);
    setLinkdin(values.linkdinProfile);
    setTelegram(values.telegramLink);
  };
  return (
    <Fragment>
      <CardHeader className="my-2 mb-4">
        <h2>ویرایش راه ها ارتباطی کاربر </h2>
      </CardHeader>
      <Formik
        initialValues={{
          gmail: userInfo.gmail,
          phoneNumber: userInfo.phoneNumber,
          linkdinProfile: userInfo.linkdinProfile,
          telegramLink: userInfo.telegramLink,
        }}
        enableReinitialize={true}
        onSubmit={(e) => {
            putUserInfo(e);
        }}
      >
        {(form) => {
         setEmail(form.values.gmail);
          setPhoneNumber(form.values.phoneNumber);
          setLinkdin(form.values.linkdinProfile);
          setTelegram(form.values.telegramLink);
          return (
            <CardBody className="cursor-pointer">
              <Row className="my-1">
                <FormikInput
                  name={"gmail"}
                  placeholder={"ایمیل کاربر را وارد کنید"}
                  label={"ایمیل:"}
                  addClass={"col-md-6"}
                  type={"text"}
                />
                <FormikInput
                  name={"phoneNumber"}
                  placeholder={"شماره موبایل کاربر را وارد کنید"}
                  label={"شماره موبایل:"}
                  addClass={"col-md-6"}
                  type={"number"}
                />
              </Row>
              <Row>
                <FormikInput
                    name={"linkdinProfile"}
                    placeholder={"لینکدین کاربر را وارد کنید"}
                    type={"text"}
                    label={"لینکدین:"}
                    addClass={"col-md-6"}
                />
                <FormikInput
                    name={"telegramLink"}
                    placeholder={"تلگرام کاربر را وارد کنید"}
                    type={"text"}
                    label={"تلگرام:"}
                    addClass={"col-md-6"}
                />
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
        <Button color="success" className="btn-submit" onClick={onSubmit}>
          ویرایش اطلاعات
        </Button>
      </div>
    </Fragment>
  );
};

export default AddUserConnection;
