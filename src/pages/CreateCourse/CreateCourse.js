import { Fragment, useEffect, useRef, useState } from "react";
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
import EditorJsComponent from "../../@core/components/EditorJs";
import instance from "../../utility/interceptor";
import FormikInput from "../../@core/components/FormikInput";
import { selectThemeColors } from "../../utility/Utils";
import SelectComponent from "../../@core/components/CreatableSelect";
import FileUploaderSingle from "../../@core/components/FileUploaderSingle";
import PickerRange from "../../@core/components/PickerRange";
import * as moment from "jalali-moment";
import { jalali_to_gregorian } from "../../utility/jalaliToGregorian";
import toast from "react-hot-toast";
import { AlignCenter, Edit, FileText, Image } from "react-feather";
import Wizard from "../../@core/components/wizard";
import AddImage from "./steps/AddImage";
import AddCourseInfo from "./steps/AddCourseInfo";
import AddProperties from "./steps/AddProperties";
import AddCourseDescribe from "./steps/AddCourseDescribe";
import BreadCrumbs from "../../@core/components/breadcrumbs";
const CreateCourse = () => {
  const ref = useRef(null);
  const [title, setTitle] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [capacity, setCapacity] = useState();
  const [typeNameId, setTypeNameId] = useState();
  const [describe, setDescribe] = useState([]);
  const [termNameId, setTermNameId] = useState();
  const [sessionNumber, setSessionNumber] = useState();
  const [classRoomNameId, setClassRoomNameId] = useState();
  const [teacherNameId, setTeacherNameId] = useState();
  const [levelNameId, setLevelNameId] = useState();
  const [cost, setCost] = useState();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stepper, setStepper] = useState(null);

  const [files, setFiles] = useState([]);
  const postCourse = async () => {
    const obj = {
      Title: title, // step 2
      Describe: describe, // step 4
      MiniDescribe: miniDescribe, // step 2
      Capacity: capacity, // step 2
      CourseTypeId: typeNameId, // step 3
      TremId: termNameId, // step 3
      SessionNumber: sessionNumber, // step 2
      ClassId: classRoomNameId, // step 3
      CourseLvlId: levelNameId, // step 3
      TeacherId: teacherNameId, // step 3
      Cost: cost, // step 2
      Image: files[0], // step 1
      StartTime: startDate, // step 2
      EndTime: endDate, // step 2
      GoogleSchema: miniDescribe, // step 2
      GoogleTitle: title, // step 2
      TumbImageAddress: files[0], // step 1
      ImageAddress: files[0], // step 1
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
  const steps = [
    {
      id: "course-image",
      title: "اضافه کردن عکس دوره",
      subtitle: "تصویر دوره را وارد کنید .",
      icon: <Image size={18} />,
      content: (
        <AddImage
          stepper={stepper}
          files={files}
          setFiles={setFiles}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "course-info",
      title: "اطلاعات دوره",
      subtitle: "اضافه کردن اطلاعات دوره .",
      icon: <FileText size={18} />,
      content: (
        <AddCourseInfo
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setCost={setCost}
          setSessionNumber={setSessionNumber}
          setCapacity={setCapacity}
          setMiniDescribe={setMiniDescribe}
          setTitle={setTitle}
          cost={cost}
          sessionNumber={sessionNumber}
          capacity={capacity}
          miniDescribe={miniDescribe}
          title={title}
          stepper={stepper}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "step-address",
      title: "ویژگی های دوره",
      subtitle: "ویژگی های دوره را وارد کنید",
      icon: <Edit size={18} />,
      content: (
        <AddProperties
          setTypeNameId={setTypeNameId}
          setLevelNameId={setLevelNameId}
          setClassRoomNameId={setClassRoomNameId}
          setTeacherNameId={setTeacherNameId}
          setTermNameId={setTermNameId}
          stepper={stepper}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "course-describe",
      title: "توضیحات دوره",
      subtitle: "توضیحات دوره را وارد کنید",
      icon: <AlignCenter size={18} />,
      content: (
        <AddCourseDescribe
          onSubmit={postCourse}
          setDescribe={setDescribe}
          stepper={stepper}
          type="wizard-modern"
        />
      ),
    },
  ];

  return (
    <Fragment>
      {/* <BreadCrumbs
        title={"اضافه کردن دوره"}
        data={[
          { title: "دوره ها", link: "/Courses" },
          { title: "اضافه کردن دوره", link: "/Course/create" },
        ]}
      /> */}
      <div className="modern-horizontal-wizard">
        <Wizard
          type="modern-horizontal"
          ref={ref}
          steps={steps}
          options={{
            linear: false,
          }}
          instance={(el) => setStepper(el)}
        />
      </div>
    </Fragment>
  );
};

export default CreateCourse;
