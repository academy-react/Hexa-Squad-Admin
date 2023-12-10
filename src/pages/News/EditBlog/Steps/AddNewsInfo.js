import { Button, CardBody, CardHeader, Row } from "reactstrap";
import FormikInput from "../../.././../@core/components/FormikInput";
import { Form, Formik } from "formik";
import { Fragment, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "react-feather";
import PickerRange from "../../../../@core/components/PickerRange";
import DatePicker from "react-multi-date-picker";
import { jalali_to_gregorian } from "../../../../utility/jalaliToGregorian";

const AddNewsInfo = ({
  stepper,
  setTitle,
  setDescribe,
  setMiniDescribe,
  setKeyword,
  setNewsCatregoryId,
  newsInfo
}) => {

  const putNewsInfo = (values) => {
    setTitle(values.Title);
    setDescribe(values.Describe);
    setMiniDescribe(values.MiniDescribe);
    setKeyword(values.Keyword);
    setNewsCatregoryId(values.NewsCatregoryId);
    
  };
  return (
    <Fragment>
      <CardHeader className="my-2 mb-4">
        <h2>ویرایش اطلاعات اخبار </h2>
      </CardHeader>
      <Formik
        initialValues={{
          title: newsInfo.title,
          describe: newsInfo.describe,
          keyword: newsInfo.keyword,
          miniDescribe: newsInfo.miniDescribe,
          newsCatregoryId: newsInfo.newsCatregoryId,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          putNewsInfo(values);
        }}
      >
        {(form) => {

          setTitle(form.values.title);
          setDescribe(form.values.describe);
          setMiniDescribe(form.values.miniDescribe);
          setKeyword(form.values.keyword);
          setNewsCatregoryId(form.values.newsCatregoryId);
          return (
            <CardBody className="cursor-pointer">
              <Row className="my-1">
                <FormikInput
                  name={"title"}
                  placeholder={" عنوان را وارد کنید"}
                  label={"عنوان:"}
                  addClass={"col-md-4"}
                  type={"text"}
                />
                <FormikInput
                  name={"miniDescribe"}
                  placeholder={"  توضیح کوتاه را وارد کنید"}
                  label={" توضیح کوتاه:"}
                  addClass={"col-md-4"}
                  type={"text"}
                />
                <FormikInput
                    name={"keyword"}
                    placeholder={" کلمات کلیدی را وارد کنید"}
                    type={"text"}
                    label={"کلمات کلیدی:"}
                    addClass={"col-md-4"}
                />
              </Row>
              <Row>
                <FormikInput
                  name={"describe"}
                  placeholder={" توضیحات را وارد کنید"}
                  label={" توضیحات:"}
                  addClass={"col-lg-10"}
                  rows="10"
                  as={"textarea"}
                 
                />
                <FormikInput
                  type={"number"}
                  name={"newsCatregoryId"}
                  placeholder={" عدد دسته بندی"}
                  label={"دسته بندی:"}
                  addClass={"col-sm-2"}
                />
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

export default AddNewsInfo;
