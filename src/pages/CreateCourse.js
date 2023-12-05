import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import EditorJsComponent from "../@core/components/EditorJs";
import instance from "../utility/interceptor";
import FormikInput from "../@core/components/FormikInput";
import { selectThemeColors } from "../utility/Utils";
import SelectComponent from "../@core/components/CreatableSelect";
import FileUploaderSingle from "../@core/components/FileUploaderSingle";
import PickerRange from "../@core/components/PickerRange";
import * as moment from "jalali-moment";
import { jalali_to_gregorian } from "../utility/jalaliToGregorian";
import toast from "react-hot-toast";
const CreateCourse = () => {
  const [typeNameState, setTypeNameState] = useState([]);
  const [typeNameId, setTypeNameId] = useState();
  const [levelNameState, setLevelNameState] = useState([]);
  const [levelNameId, setLevelNameId] = useState();
  const [statusNameState, setStatusNameState] = useState([]);
  const [statusNameId, setStatusNameId] = useState();
  const [classRoomNameState, setClassRoomNameState] = useState([]);
  const [classRoomNameId, setClassRoomNameId] = useState();
  const [teacherNameState, setTeacherNameState] = useState([]);
  const [teacherNameId, setTeacherNameId] = useState();
  const [termNameState, setTermNameState] = useState([]);
  const [termNameId, setTermNameId] = useState();

  const [dateRange, setDateRange] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [picker, setPicker] = useState(new Date());
  const [describe, setDescribe] = useState([]);

  const [files, setFiles] = useState([]);
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
  const getCreate = async () => {
    try {
      const create = await instance.get("/Course/GetCreate");
      let typeName = [];
      let levelName = [];
      let statusName = [];
      let classRoomName = [];
      let teacherName = [];
      let termName = [];
      let techName = [];
      create.courseTypeDtos.map((item) => {
        typeName = [...typeName, { value: item.id, label: item.typeName }];
        setTypeNameState([...typeName]);
      });
      create.courseLevelDtos.map((item) => {
        levelName = [...levelName, { value: item.id, label: item.levelName }];
        setLevelNameState([...levelName]);
      });
      create.statusDtos.map((item) => {
        statusName = [
          ...statusName,
          { value: item.id, label: item.statusName },
        ];
        setStatusNameState([...statusName]);
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
      create.technologyDtos.map((item) => {
        techName = [...techName, { value: item.id, label: item.techName }];
        setTechNameState([...techName]);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const createCourse = (value) => {
    console.log(value);
    console.log(describe);
  };

  const postCourse = async (value) => {
    const obj = {
      Title: value.Title,
      Describe: describe,
      MiniDescribe: value.MiniDescribe,
      Capacity: value.Capacity,
      CourseTypeId: typeNameId,
      TremId: termNameId,
      SessionNumber: value.SessionNumber,
      ClassId: classRoomNameId,
      CourseLvlId: levelNameId,
      TeacherId: teacherNameId,
      Cost: value.Cost,
      Image: files[0],
      StartTime: startDate,
      EndTime: endDate,
      GoogleSchema: value.MiniDescribe,
      GoogleTitle: value.Title,
      // CoursePrerequisiteId: "",
      ShortLink: value.ShortLink,
      TumbImageAddress: files[0],
      ImageAddress: files[0],
    };
    try {
      const result = await instance.post("/Course", obj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.errors[0]);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    console.log(obj);
  };
  useEffect(() => {
    getCreate();
  }, []);

  return (
    <Card className="p-2">
      <CardHeader className="pr-2 h1">ساختن دوره جدید</CardHeader>
      <Formik
        initialValues={{
          Title: "",
          MiniDescribe: "",
          Capacity: "",
          SessionNumber: "",
          Cost: "",
          Image: "",
          ShortLink: "",
        }}
        onSubmit={(v) => {
          postCourse(v);
        }}
      >
        <Form className="px-3 py-1">
          <CardBody className="cursor-pointer">
            <FileUploaderSingle
              files={files}
              Title={"عکس دوره"}
              setFiles={setFiles}
            />
          </CardBody>
          <CardBody className="cursor-pointer">
            <Row className="my-1">
              <FormikInput
                name={"Title"}
                placeholder={"نام دوره را وارد کنید"}
                label={"نام دوره"}
                addClass={"col-md-4"}
                type={"text"}
              />
              <FormikInput
                name={"Cost"}
                placeholder={"قیمت دوره را وارد کنید"}
                type={"number"}
                label={"قیمت دوره"}
                addClass={"col-md-4"}
              />
              <FormikInput
                name={"Capacity"}
                placeholder={"ظرفیت دوره را وارد کنید"}
                label={"ظرفیت دوره"}
                type={"number"}
                addClass={"col-md-4"}
              />
            </Row>
            <Row className="my-1 position-relative z-4 ">
              <Col className="mb-1 d-flex flex-column gap-1 " md="3" sm="6">
                <SelectComponent
                  options={typeNameState}
                  onChange={setTypeNameId}
                >
                  نحوه برگذاری
                </SelectComponent>
              </Col>
              <Col className="mb-1 d-flex flex-column gap-1 " md="3" sm="6">
                <SelectComponent
                  options={levelNameState}
                  onChange={setLevelNameId}
                >
                  سطح برگذاری دوره
                </SelectComponent>
              </Col>
              <Col className="mb-1 d-flex flex-column gap-1 " md="3" sm="6">
                <SelectComponent
                  options={statusNameState}
                  onChange={setStatusNameId}
                >
                  وضعیت برگذاری
                </SelectComponent>
              </Col>
              <Col className="mb-1 d-flex flex-column gap-1 " md="3" sm="6">
                <SelectComponent
                  options={classRoomNameState}
                  onChange={setClassRoomNameId}
                >
                  نام کلاس
                </SelectComponent>
              </Col>
            </Row>
            <Row className="my-1 position-relative z-2">
              <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
                <SelectComponent
                  options={teacherNameState}
                  onChange={setTeacherNameId}
                >
                  انتخاب معلم
                </SelectComponent>
              </Col>
              <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
                <SelectComponent
                  options={termNameState}
                  onChange={setTermNameId}
                >
                  ترم دوره
                </SelectComponent>
              </Col>
              <FormikInput
                name={"SessionNumber"}
                placeholder={" تعداد جلسات دوره را وارد کنید"}
                label={"تعداد جلسات دوره"}
                type={"number"}
                addClass={"col-md-4"}
              />
              {/* const [techName, setTechNameState] = useState([]); 
              const [techNameId, setTechNameId] = useState(); */}
              {/* <Col className="mb-1 d-flex flex-column gap-1 " md="4" sm="12">
                <Label className="form-label m-0"> دسته بندی های دوره</Label>
                <Select
                  isClearable={true}
                  theme={selectThemeColors}
                  isMulti
                  name="colors"
                  options={techName}
                  onChange={setTechNameId}
                  className="react-select z-3 position-relative"
                  classNamePrefix="select"
                />
              </Col> */}
            </Row>
            <Row>
              <FormikInput
                as={"textarea"}
                name={"MiniDescribe"}
                placeholder={"توضیحات مخصتر درباره دوره را وارد کنید"}
                label={"توضیحات مخصتر درباره دوره"}
                addClass={"col-sm-4"}
              />
              <FormikInput
                dir={"ltr"}
                name={"ShortLink"}
                placeholder={"/ShortLink"}
                label={"لینک کوتاه دوره"}
                addClass={"col-sm-4"}
              />
              <div className="col-sm-4 d-flex flex-column gap-1 ">
                {" "}
                <label>زمان برگذاری :</label>
                <PickerRange setDateRange={setDateRange} picker={picker} />
              </div>
            </Row>
            <Card className="col-8 mx-auto block ">
              <CardHeader className="h3">توضیحات دوره</CardHeader>
              <EditorJsComponent setDescribe={setDescribe} />
            </Card>
          </CardBody>
          <Button color="success" className="w-100 my-2">
            ساخت دوره جدید
          </Button>
        </Form>
      </Formik>
    </Card>
  );
};

export default CreateCourse;
