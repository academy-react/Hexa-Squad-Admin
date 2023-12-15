import { Button, CardBody, CardHeader, Row } from "reactstrap";
// import FormikInput from "../../../../../../@core/components/FormikInput";
import FormikInput from "../../.././../@core/components/FormikInput";
import { Form, Formik } from "formik";
import { Fragment, useState } from "react";
import { ArrowLeft } from "react-feather";

const AddNewsPhoto = ({
  stepper,
  setGoogleTitle,
  setGoogleDescribe,
  setCurrentImageAddress,
  setCurrentImageAddressTumb,
  setImage,
  newsInfo,
  onSubmit,
}) => {
  const putNewsInfo = (values) => {
    setGoogleTitle(values.GoogleTitle);
    setGoogleDescribe(values.GoogleDescribe);
    setCurrentImageAddress(values.CurrentImageAddress);
    // setCurrentImageAddressTumb(values.CurrentImageAddressTumb);
    setImage(values.Image);
  };
  const onChange = (e) => {
    const files = e.target.files;
    setImage(files);
    console.log("imageeeee=", files);
  };
  return (
    <Fragment>
      <CardHeader className="my-2 mb-4">
        <h2>ویرایش جزییات اخبار </h2>
      </CardHeader>
      <Formik
        initialValues={{
          googleTitle: newsInfo.googleTitle,
          googleDescribe: newsInfo.googleDescribe,
          currentImageAddress: newsInfo.currentImageAddress,
          currentImageAddressTumb: newsInfo.currentImageAddressTumb,
          Image: newsInfo.Image,
        }}
        enableReinitialize={true}
        onSubmit={(e) => {
          putNewsInfo(e);
        }}
      >
        {(form) => {
          setGoogleTitle(form.values.googleTitle);
          setGoogleDescribe(form.values.googleDescribe);
          setCurrentImageAddress(form.values.currentImageAddress);
          setCurrentImageAddressTumb(form.values.currentImageAddressTumb);
          setImage(form.values.Image);
          return (
            <CardBody className="cursor-pointer">
              <Row className="my-1">
                <FormikInput
                  name={"googleTitle"}
                  placeholder={" googleTitle را وارد کنید"}
                  label={"googleTitle:"}
                  addClass={"col-md-4"}
                  type={"text"}
                />
                <FormikInput
                  name={"googleDescribe"}
                  placeholder={"GoogleDescribe را وارد کنید"}
                  label={"googleDescribe:"}
                  addClass={"col-md-4"}
                  type={"text"}
                />
              </Row>
              <Row>
                <FormikInput
                  name={"Image"}
                  placeholder={" تصویر جدید را وارد کنید"}
                  type={"file"}
                  label={"تصویر جدید:"}
                  addClass={"col-md-4"}
                  onChange={(e) => console.log("image=",e.target.files)}
                />
              </Row>
            </CardBody>
          );
        }}
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

export default AddNewsPhoto;
