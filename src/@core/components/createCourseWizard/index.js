import React, { Fragment, useEffect, useRef, useState } from "react";
import Wizard from "../wizard";
import AddCourseDescribe from "./step/AddCourseDescribe";
import AddTech from "./step/AddTech";
import { AlignCenter, Edit, FileText, Image } from "react-feather";
import AddProperties from "./step/AddProperties";
import AddCourseInfo from "./step/AddCourseInfo";
import AddImage from "./step/AddImage";
import instance from "../../../utility/interceptor";
import toast from "react-hot-toast";

const CreateCourse = ({ children, type, isModal, detail }) => {
  const ref = useRef(null);
  const [title, setTitle] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [capacity, setCapacity] = useState();
  const [typeNameId, setTypeNameId] = useState();
  const [techNameState, setTechNameState] = useState();
  const [describe, setDescribe] = useState([]);
  const [termNameId, setTermNameId] = useState();
  const [sessionNumber, setSessionNumber] = useState();
  const [classRoomNameId, setClassRoomNameId] = useState();
  const [techNameId, setTechNameId] = useState();
  const [teacherNameId, setTeacherNameId] = useState();
  const [levelNameId, setLevelNameId] = useState();
  const [cost, setCost] = useState();
  const [shortLink, setShortLink] = useState();
  const [courseId, setCourseId] = useState();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [stepper, setStepper] = useState(null);
  const [accessToTech, setAccessToTech] = useState(false);
  const [files, setFiles] = useState([]);
  const fillStates = () => {
    setTitle(detail.title);
    setDescribe(detail.describe);
    setMiniDescribe(detail.miniDescribe);
    setCapacity(detail.capacity);
    setTermNameId(detail.tremId);
    setSessionNumber(detail.sessionNumber);
  };
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
      UniqeUrlString: shortLink,
    };
    try {
      const result = await instance.post("/Course", obj,
       {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      }
      );
      if (result.success) {
        toast.success(result.message);
        setCourseId(result.id);
        stepper.next();
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
      subtitle: "اضافه کردن اطلاعات .",
      icon: <FileText size={18} />,
      content: (
        <AddCourseInfo
          isModal={isModal}
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
      subtitle: "ویژگی ها را وارد کنید",
      icon: <Edit size={18} />,
      content: (
        <AddProperties
          isModal={isModal}
          setTypeNameId={setTypeNameId}
          setLevelNameId={setLevelNameId}
          setClassRoomNameId={setClassRoomNameId}
          setTeacherNameId={setTeacherNameId}
          setTermNameId={setTermNameId}
          shortLink={shortLink}
          setTechNameState={setTechNameState}
          setShortLink={setShortLink}
          stepper={stepper}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "course-describe",
      title: "توضیحات دوره",
      subtitle: "توضیحات  را وارد کنید",
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
    {
      id: "course-tech",
      title: "تکنولوژی های دوره",
      subtitle: "تکنولوژی ها را وارد کنید",
      icon: <AlignCenter size={18} />,
      content:
        accessToTech == false ? (
          <AddTech
            onSubmit={postCourse}
            TechOptions={techNameState}
            stepper={stepper}
            courseId={courseId}
            type="wizard-modern"
          />
        ) : (
          ""
        ),
    },
  ];
  useEffect(() => {
    detail && fillStates();
  }, []);

  return (
    <Fragment>
      {children}
      <div className="modern-horizontal-wizard">
        <Wizard
          type={type}
          ref={ref}
          steps={steps}
          options={{
            linear: false,
          }}
          contentClassName="shadow-none"
          className="bg-transparent create-app-wizard shadow-none"
          instance={(el) => setStepper(el)}
        />
      </div>
    </Fragment>
  );
};

export default CreateCourse;
