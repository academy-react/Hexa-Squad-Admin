// ** React Imports
import { Fragment, useState, useRef } from "react";

// ** Reactstrap Imports
import {
  Card,
  Modal,
  Button,
  CardBody,
  CardText,
  CardTitle,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Custom Components
import Wizard from "@components/wizard";

// ** Icons Imports
import {
  Book,
  Package,
  Command,
  CreditCard,
  Check,
  BookOpen,
  FileText,
  Edit,
  AlignCenter,
  Image,
} from "react-feather";
// ** Styles
import "@styles/react/pages/modal-create-app.scss";
import instance from "../../../utility/interceptor";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CreateCourse from "../createCourseWizard";

const CreateCourseModal = () => {
  // ** Ref
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

  // ** States
  const [show, setShow] = useState(false);

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
    } catch (error) {
      console.log(error);
    }
    console.log(obj);
  };

  return (
    <Fragment>
      <Button
        color="primary"
        onClick={() => setShow(!show)}
        className="d-flex gap-1 align-items-center"
      >
        ساخت دوره جدید
        <BookOpen />
      </Button>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="pb-3 px-sm-3">
          <h1 className="text-center mb-1">ایجاد دوره جدید</h1>
          <p className="text-center mb-2">
            برای ایجاد دوره تمام فیلد های خواسته شده را پر کنید{" "}
          </p>
          <Link to={"/Course/create"} className="text-center d-block">
            رفتن به صفحه ایجاد دوره
          </Link>
          <CreateCourse type={"vertical"} isModal={true} />
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default CreateCourseModal;
