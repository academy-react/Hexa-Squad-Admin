import { Fragment, useEffect, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import SelectComponent from "../../../@core/components/CreatableSelect";
import FormikInput from "../../../@core/components/FormikInput";
import { ArrowLeft, ArrowRight } from "react-feather";
import { fillCourseData } from "../../../utility/fillCourseData";

const ChangeProperties = ({
  setTypeNameId,
  setClassRoomNameId,
  typeNameState,
  levelNameState,
  classRoomNameState,
  teacherNameState,
  termNameState,
  setTermNameId,
  setLevelNameId,
  setTeacherNameId,
  stepper,
  DefaultTypeName,
  DefaultLevelName,
  DefaultClassRoomName,
  DefaultTeacherName,
  DefaultTermName,
  setCourseTypeId,
  setCourseLvlId,
  setClassId,
  setTeacherId,
  setTremId,
}) => {
  return (
    <Fragment>
      <Row className="mt-1">
        <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
          {DefaultTypeName && typeNameState && (
            <SelectComponent
              defaultValue={DefaultTypeName.label}
              options={typeNameState}
              onChange={(e) => {
                setTypeNameId(e);
                setCourseTypeId();
              }}
            >
              سطح برگذاری دوره
            </SelectComponent>
          )}
        </Col>
        <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
          {DefaultClassRoomName && classRoomNameState && (
            <SelectComponent
              defaultValue={DefaultClassRoomName.label}
              options={classRoomNameState}
              onChange={(e) => {
                setClassRoomNameId(e);
                setClassId();
              }}
            >
              کلاس دوره
            </SelectComponent>
          )}
        </Col>
        <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
          {DefaultTermName && termNameState && (
            <SelectComponent
              defaultValue={DefaultTermName.label}
              options={termNameState}
              onChange={(e) => {
                setTermNameId(e);
                setTremId();
              }}
            >
              ترم دوره
            </SelectComponent>
          )}
        </Col>
      </Row>
      <Row className="mt-1">
        <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
          {DefaultLevelName && levelNameState && (
            <SelectComponent
              defaultValue={DefaultLevelName.label}
              options={levelNameState}
              onChange={(e) => {
                setLevelNameId(e);
                setCourseLvlId();
              }}
            >
              سطح برگذاری دوره
            </SelectComponent>
          )}
        </Col>
        <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
          {DefaultTeacherName && teacherNameState && (
            <SelectComponent
              defaultValue={DefaultTeacherName.label}
              options={teacherNameState}
              onChange={(e) => {
                setTeacherNameId(e);
                setTeacherId();
              }}
            >
              مدرس دوره
            </SelectComponent>
          )}
        </Col>
        <FormikInput
          name={"UniqeUrlString"}
          addClass={"col-md-4 col-sm-12"}
          labelClassName={"my-1 form-label"}
        >
          لینک کوتاه
        </FormikInput>
      </Row>

      <div className="d-flex justify-content-between mt-3">
        <Button
          className="btn-prev"
          color="primary"
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

export default ChangeProperties;
