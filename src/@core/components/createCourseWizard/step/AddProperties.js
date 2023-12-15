import { Fragment, useEffect, useState } from "react";
import { Button, CardHeader, Col, Row } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
import SelectComponent from "../../CreatableSelect";
import instance from "../../../../utility/interceptor";
import { fillCourseData } from "../../../../utility/fillCourseData";
const AddProperties = ({
  stepper,
  setTypeNameId,
  setLevelNameId,
  setClassRoomNameId,
  setTeacherNameId,
  setTermNameId,
  shortLink,
  setShortLink,
  setTechNameState,
  isModal,
}) => {
  const [typeNameState, setTypeNameState] = useState([]);
  const [levelNameState, setLevelNameState] = useState([]);
  const [classRoomNameState, setClassRoomNameState] = useState([]);
  const [teacherNameState, setTeacherNameState] = useState([]);
  const [termNameState, setTermNameState] = useState([]);
  const getCreate = async () => {
    try {
      const create = await instance.get("/Course/GetCreate");
      setTypeNameState(fillCourseData(create.courseTypeDtos));
      setLevelNameState(fillCourseData(create.courseLevelDtos));
      setClassRoomNameState(fillCourseData(create.classRoomDtos));
      setTeacherNameState(fillCourseData(create.teachers));
      setTermNameState(fillCourseData(create.termDtos));
      setTechNameState(fillCourseData(create.technologyDtos));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCreate();
  }, []);

  return (
    <Fragment>
      <CardHeader className="my-2 mb-4">
        <h2>ویژگی های دوره را وارد کنید</h2>
      </CardHeader>
      {isModal ? (
        <Fragment>
          <Row className="my-1 position-relative">
            <Col className="mb-1 d-flex flex-column gap-1 " md="6" sm="12">
              <SelectComponent options={typeNameState} onChange={setTypeNameId}>
                نحوه برگذاری
              </SelectComponent>
            </Col>
            <Col className="mb-1 d-flex flex-column gap-1 " md="6" sm="12">
              <SelectComponent
                options={levelNameState}
                onChange={setLevelNameId}
              >
                سطح برگذاری دوره
              </SelectComponent>
            </Col>
          </Row>
          <Row className="my-1 position-relative">
            <Col className="mb-1 d-flex flex-column gap-1  " md="6" sm="12">
              <SelectComponent
                options={classRoomNameState}
                onChange={setClassRoomNameId}
              >
                نام کلاس
              </SelectComponent>
            </Col>
            <Col className="mb-1 d-flex flex-column gap-1 " md="6" sm="12">
              <SelectComponent
                options={teacherNameState}
                onChange={setTeacherNameId}
              >
                انتخاب معلم
              </SelectComponent>
            </Col>
          </Row>
          <Row className="my-1 position-relative">
            <Col className="mb-1 d-flex flex-column gap-1 " md="6" sm="12">
              <SelectComponent options={termNameState} onChange={setTermNameId}>
                ترم دوره
              </SelectComponent>
            </Col>
            <Col className="mb-1 d-flex flex-column gap-1 " md="6" sm="12">
              <label htmlFor="shortLink" className="form-label m-0 my-1">لینک کوتاه دوره</label>
              <input
                className="form-control"
                id="shortLink"
                placeholder="لینک کوتاه دوره را وارد کنید"
                defaultValue={shortLink}
                onChange={(v) => {
                  setShortLink(v.target.value);
                }}
              />
            </Col>
          </Row>
        </Fragment>
      ) : (
        <Fragment>
          <Row className="my-1 position-relative ">
            <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="6">
              <SelectComponent options={typeNameState} onChange={setTypeNameId}>
                نحوه برگذاری
              </SelectComponent>
            </Col>
            <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="6">
              <SelectComponent
                options={levelNameState}
                onChange={setLevelNameId}
              >
                سطح برگذاری دوره
              </SelectComponent>
            </Col>
            <Col className="mb-1 d-flex flex-column gap-1  " md="4" sm="12">
              <SelectComponent
                options={classRoomNameState}
                onChange={setClassRoomNameId}
              >
                نام کلاس
              </SelectComponent>
            </Col>
          </Row>
          <Row className="my-1 position-relative">
            <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
              <SelectComponent
                options={teacherNameState}
                onChange={setTeacherNameId}
              >
                انتخاب معلم
              </SelectComponent>
            </Col>
            <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
              <SelectComponent options={termNameState} onChange={setTermNameId}>
                ترم دوره
              </SelectComponent>
            </Col>
            <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
              <label htmlFor="shortLink" className="form-label m-0 my-1">
                لینک کوتاه دوره
              </label>
              <input
                className="form-control"
                id="shortLink"
                placeholder="لینک کوتاه دوره را وارد کنید"
                defaultValue={shortLink}
                onChange={(v) => {
                  setShortLink(v.target.value);
                }}
              />
            </Col>
          </Row>
        </Fragment>
      )}
      <div className="d-flex justify-content-between">
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

export default AddProperties;
