import { useNavigate, useParams } from "react-router-dom";
import instance from "../../utility/interceptor";
import { Fragment, useEffect, useRef, useState } from "react";
import { Form, Formik } from "formik";
import { fillCourseData } from "../../utility/fillCourseData";
import Wizard from "../../@core/components/wizard";
import ChangeImage from "./steps/ChangeImage";
import ChangeInfo from "./steps/ChangeInfo";
import ChangeProperties from "./steps/ChangeProperties";
import { AlignCenter, Edit, FileText, Image } from "react-feather";
import ChangeDescribe from "./steps/ChangeDescribe";
import BreadCrumbs from "../../@core/components/breadcrumbs";
import GetDashboardReport from "../../utility/api/GetData/GetDashboardReport";
import { jalali_to_gregorian } from "../../utility/jalaliToGregorian";
import toast from "react-hot-toast";

const UpdateCourse = () => {
  const urlParams = useParams();
  const navigator = useNavigate();
  const ref = useRef(null);
  const [editCourseData, setEditCourseData] = useState([]);
  const [cost, setCost] = useState();
  const [files, setFiles] = useState();
  const [image, setImage] = useState();
  const [describe, setDescribe] = useState();
  const [picker, setPicker] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [stepper, setStepper] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [typeNameId, setTypeNameId] = useState([]);
  const [levelNameId, setLevelNameId] = useState([]);
  const [classRoomNameId, setClassRoomNameId] = useState([]);
  const [teacherNameId, setTeacherNameId] = useState([]);
  const [termNameId, setTermNameId] = useState([]);

  const [courseTypeId, setCourseTypeId] = useState();
  const [courseLvlId, setCourseLvlId] = useState();
  const [classId, setClassId] = useState();
  const [teacherId, setTeacherId] = useState();
  const [tremId, setTremId] = useState();
  const [typeNameState, setTypeNameState] = useState();
  const [levelNameState, setLevelNameState] = useState();
  const [classRoomNameState, setClassRoomNameState] = useState();
  const [teacherNameState, setTeacherNameState] = useState();
  const [termNameState, setTermNameState] = useState();

  const [DefaultTypeName, setDefaultTypeName] = useState();
  const [DefaultLevelName, setDefaultLevelName] = useState();
  const [DefaultClassRoomName, setDefaultClassRoomName] = useState();
  const [DefaultTeacherName, setDefaultTeacherName] = useState();
  const [DefaultTermName, setDefaultTermName] = useState();

  const steps = [
    {
      id: "course-image",
      title: "اضافه کردن عکس دوره",
      subtitle: "تصویر دوره را وارد کنید .",
      icon: <Image size={18} />,
      content: (
        <ChangeImage
          image={image}
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
        <ChangeInfo
          cost={cost}
          setDateRange={setDateRange}
          picker={picker}
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
        <ChangeProperties
          setTypeNameId={setTypeNameId}
          setCourseTypeId={setCourseTypeId}
          setCourseLvlId={setCourseLvlId}
          setClassId={setClassId}
          setTeacherId={setTeacherId}
          setTremId={setTremId}
          setClassRoomNameId={setClassRoomNameId}
          typeNameState={typeNameState}
          levelNameState={levelNameState}
          classRoomNameState={classRoomNameState}
          teacherNameState={teacherNameState}
          termNameState={termNameState}
          setTermNameId={setTermNameId}
          setLevelNameId={setLevelNameId}
          setTeacherNameId={setTeacherNameId}
          DefaultTypeName={DefaultTypeName}
          DefaultLevelName={DefaultLevelName}
          DefaultClassRoomName={DefaultClassRoomName}
          DefaultTeacherName={DefaultTeacherName}
          DefaultTermName={DefaultTermName}
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
        <ChangeDescribe
          stepper={stepper}
          setOriginalDescribe={setDescribe}
          describe={describe}
        />
      ),
    },
  ];
  useEffect(() => {
    console.log("typeNameState", typeNameState);
  }, [typeNameState]);
  // get data from api
  const getEditCourse = async () => {
    try {
      const course = await instance.get(
        "/Course/GetEditCourse?CourseId=" + urlParams.id
      );
      setEditCourseData(course);
      console.log("course", course);
    } catch (error) {
      console.log(error);
    }
  };

  // get select option data
  const linkCourseData = () => {
    setTypeNameState(
      fillCourseData(editCourseData.getCourseFor.courseTypeDtos)
    );
    setLevelNameState(
      fillCourseData(editCourseData.getCourseFor.courseLevelDtos)
    );
    setClassRoomNameState(
      fillCourseData(editCourseData.getCourseFor.classRoomDtos)
    );
    console.log("linkCourseData", editCourseData.getCourseFor);
    setTeacherNameState(fillCourseData(editCourseData.getCourseFor.teachers));
    setTermNameState(fillCourseData(editCourseData.getCourseFor.termDtos));
    editCourseData.imageAddress && setImage(editCourseData.imageAddress);
    editCourseData.startTime &&
      setPicker([
        new Date(editCourseData.startTime),
        new Date(editCourseData.endTime),
      ]);
    console.log("teacherId", editCourseData.teacherId);
    editCourseData.startTime && setDescribe(editCourseData.describe);
    editCourseData.startTime && setCourseTypeId(editCourseData.courseTypeId);
    editCourseData.startTime && setCourseLvlId(editCourseData.courseLvlId);
    editCourseData.startTime && setClassId(editCourseData.classId);
    editCourseData.startTime && setTeacherId(editCourseData.teacherId);
    editCourseData.startTime && setTremId(editCourseData.tremId);
  };

  // get default selected object for select option from api
  const fillSelectOptions = (array, id, setState) => {
    const obj = array.filter((item) => {
      return item.value === id;
    });
    setState(obj[0]);
  };

  // link to fill select options function
  const selectOptions = () => {
    fillSelectOptions(typeNameState, courseTypeId, setDefaultTypeName);
    fillSelectOptions(levelNameState, courseLvlId, setDefaultLevelName);
    fillSelectOptions(classRoomNameState, classId, setDefaultClassRoomName);
    fillSelectOptions(teacherNameState, teacherId, setDefaultTeacherName);
    fillSelectOptions(termNameState, tremId, setDefaultTermName);
  };

  //submit Form
  const onSubmitForm = async (values) => {
    const obj = {
      Id: urlParams.id,
      Title: values.Title,
      Describe: describe || values.Describe,
      MiniDescribe: values.MiniDescribe,
      Capacity: values.Capacity,
      CourseTypeId: courseTypeId || typeNameId,
      SessionNumber: values.SessionNumber,
      TremId: tremId || termNameId,
      ClassId: classId || classRoomNameId,
      CourseLvlId: courseLvlId || levelNameId,
      TeacherId: teacherId || teacherNameId,
      Cost: values.Cost,
      UniqeUrlString: values.UniqeUrlString,
      Image: (files && files[0]) || values.ImageAddress,
      StartTime: startDate || values.EndTime,
      EndTime: endDate || values.StartTime,
      GoogleSchema: values.MiniDescribe,
      GoogleTitle: values.Title,
      TumbImageAddress: (files && files[0]) || image,
      ImageAddress: (files && files[0]) || image,
    };
    try {
      const result = await instance.put("/Course", obj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "multipart/form-data",
        },
      });
      if (result.success) {
        toast.success(result.message);
        navigator("/Course/detail/" + urlParams.id);
      } else {
        toast.error(result.errors[0]);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffects functions

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

  useEffect(() => {
    getEditCourse();
  }, []);

  // fill default upload image
  useEffect(() => {
    files
      ? setImage()
      : editCourseData.imageAddress && setImage(editCourseData.imageAddress);
  }, [files, editCourseData]);

  // call get select option api function
  useEffect(() => {
    console.log("length", editCourseData.imageAddress);
    editCourseData.getCourseFor && linkCourseData();
  }, [editCourseData]);

  // call selectOptions function
  useEffect(() => {
    console.log(tremId);
    tremId && selectOptions();
  }, [typeNameState]);

  return (
    <div>
      <BreadCrumbs
        title={"ویرایش کردن دوره"}
        data={[
          { title: "دوره ها", link: "/Courses" },
          {
            title: editCourseData.title,
            link: "/Course/detail/" + editCourseData.id,
          },
          { title: "ویرایش دوره", link: "/Course/edit/" + editCourseData.id },
        ]}
      />
      <Formik
        initialValues={{
          Title: editCourseData.title,
          Describe: editCourseData.describe,
          MiniDescribe: editCourseData.miniDescribe,
          Capacity: editCourseData.capacity,
          // CourseTypeId: editCourseData.courseTypeId,
          SessionNumber: Number(editCourseData.sessionNumber),
          // TremId: editCourseData.tremId,
          // ClassId: editCourseData.classId,
          // TeacherId: editCourseData.teacherId,
          Cost: editCourseData.cost,
          UniqeUrlString: editCourseData.uniqeUrlString,
          // CourseLvlId: editCourseData.courseLvlId,
          ImageAddress: editCourseData.ImageAddress,
          StartTime: editCourseData.startTime,
          EndTime: editCourseData.endTime,
        }}
        onSubmit={(value) => {
          onSubmitForm(value);
        }}
        enableReinitialize
      >
        {(form) => {
          setCost(form.values.Cost);
          return (
            <Form className="modern-horizontal-wizard">
              <Wizard
                type={"modern-horizontal"}
                ref={ref}
                steps={steps}
                options={{
                  linear: false,
                }}
                contentClassName="shadow-none"
                className="bg-transparent create-app-wizard shadow-none"
                instance={(el) => setStepper(el)}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UpdateCourse;
