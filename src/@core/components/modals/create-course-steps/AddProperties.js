import { Fragment, useEffect, useState } from "react";
import { Button, CardHeader, Col, Row } from "reactstrap";
import SelectComponent from "../../CreatableSelect";
import { ArrowLeft, ArrowRight } from "react-feather";
import instance from "../../../../utility/interceptor";

const AddProperties = ({
  stepper,
  setTypeNameId,
  setLevelNameId,
  setClassRoomNameId,
  setTeacherNameId,
  setTermNameId,
}) => {
  const [typeNameState, setTypeNameState] = useState([]);
  const [levelNameState, setLevelNameState] = useState([]);
  const [classRoomNameState, setClassRoomNameState] = useState([]);
  const [teacherNameState, setTeacherNameState] = useState([]);
  const [termNameState, setTermNameState] = useState([]);
  const getCreate = async () => {
    try {
      const create = await instance.get("/Course/GetCreate");
      let typeName = [];
      let levelName = [];
      let classRoomName = [];
      let teacherName = [];
      let termName = [];
      //   let techName = [];
      create.courseTypeDtos.map((item) => {
        typeName = [...typeName, { value: item.id, label: item.typeName }];
        setTypeNameState([...typeName]);
      });
      create.courseLevelDtos.map((item) => {
        levelName = [...levelName, { value: item.id, label: item.levelName }];
        setLevelNameState([...levelName]);
      });
      create.classRoomDtos.map((item) => {
        classRoomName = [
          ...classRoomName,
          { value: item.id, label: item.classRoomName },
        ];
        setClassRoomNameState([...classRoomName]);
      });
      create.teachers.map((item) => {
        teacherName = [
          ...teacherName,
          { value: item.userId, label: item.fullName },
        ];
        setTeacherNameState([...teacherName]);
      });
      create.termDtos.map((item) => {
        termName = [...termName, { value: item.id, label: item.termName }];
        setTermNameState([...termName]);
      });
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
      <Row className="my-1 position-relative z-4 ">
        <Col className="mb-1 d-flex flex-column gap-1 " md="6" sm="6">
          <SelectComponent options={typeNameState} onChange={setTypeNameId}>
            نحوه برگذاری
          </SelectComponent>
        </Col>
        <Col className="mb-1 d-flex flex-column gap-1 " md="6" sm="6">
          <SelectComponent options={levelNameState} onChange={setLevelNameId}>
            سطح برگذاری دوره
          </SelectComponent>
        </Col>
      </Row>
      <Row className="my-1 position-relative z-2">
        <Col className="mb-1 d-flex flex-column gap-1  " md="6" sm="12">
          <SelectComponent
            options={classRoomNameState}
            onChange={setClassRoomNameId}
          >
            نام کلاس
          </SelectComponent>
        </Col>
        <Col className="mb-1 d-flex flex-column gap-1 " md="6" sm="12">
          <SelectComponent options={termNameState} onChange={setTermNameId}>
            ترم دوره
          </SelectComponent>
        </Col>
      </Row>
      <Row className="my-1 position-relative z-1">
        <Col className="mb-1 d-flex flex-column gap-1 " sm="12">
          <SelectComponent
            options={teacherNameState}
            onChange={setTeacherNameId}
          >
            انتخاب معلم
          </SelectComponent>
        </Col>
      </Row>
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
