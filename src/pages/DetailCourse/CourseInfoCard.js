// ** React Imports
import { useState, Fragment, useEffect } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  CardBody,
  Button,
  Badge,
  Modal,
  Input,
  Label,
  ModalBody,
  ModalHeader,
} from "reactstrap";

// ** Third Party Components
import Swal from "sweetalert2";
import Select from "react-select";
import { Check, Briefcase, X, UserCheck } from "react-feather";
import { useForm, Controller } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import { Link } from "react-router-dom";
import GetTeacher from "../../utility/api/GetData/GetTeacher";
import DeleteCourse from "../../utility/api/DeleteData";
import GetCourseGroups from "../../utility/api/GetData/GetCourseGroups/GetCourseGroups";
import toast from "react-hot-toast";
import activeAndDeActiveCourse from "../../utility/api/PutData/activeAndDeActiveCourse";
import SeparationPrice from "../../utility/SeparationPrice/SeparationPrice";

const MySwal = withReactContent(Swal);

const UserInfoCard = ({ detail }) => {
  const [teacherDetails, setTeacherDetails] = useState();
  const [courseGroup, setCourseGroup] = useState();
  const [isActive, setIsActive] = useState();
  const [teches, setTeches] = useState([]);
  // ** render user img
  const renderUserImg = () => {
    if (detail.imageAddress) {
      return (
        <img
          height="210"
          width="210"
          alt="user-avatar"
          src={detail.imageAddress}
          className="img-fluid rounded mt-3 mb-2"
        />
      );
    } else {
      return (
        <Avatar
          initials
          className="rounded mt-3 mb-2"
          content={detail.title}
          contentStyles={{
            borderRadius: 0,
            fontSize: "calc(48px)",
            width: "100%",
            height: "100%",
          }}
          style={{
            height: "110px",
            width: "110px",
          }}
        />
      );
    }
  };
  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: "از حذف دوره مطمئن هستید ؟",
      text: "با حذف دوره کاربران شما نمیتوانند دوره را مشاهده کنند !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله مطمئنم !",
      cancelButtonText: "نمیخواهم حدف کنم",
      customClass: {
        confirmButton: "btn btn-primary",
        cancelButton: "btn btn-outline-danger ms-1",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.value) {
        const deleteCourse = await DeleteCourse(
          detail.courseId,
          "/TeacherCourses",
          true
        );
        console.log(deleteCourse);
        MySwal.fire({
          icon: "success",
          title: "Suspended!",
          text: "User has been suspended.",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else if (result.dismiss === MySwal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Cancelled Suspension :)",
          icon: "error",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    });
  };
  const getTeacherDetails = async () => {
    const data = await GetTeacher(detail.teacherId);
    console.log(data);
    setTeacherDetails(data);
  };
  const getCourseGroups = async () => {
    const data = await GetCourseGroups(detail.teacherId, detail.courseId);
    console.log(data);
    setCourseGroup(data);
  };
  const reverseActiveStatus = async () => {
    const data = await activeAndDeActiveCourse(
      detail.courseId,
      "/Course/detail/" + detail.courseId,
      !isActive
    );
    console.log(data);
    data.success && setIsActive(!isActive);
  };
  console.log(courseGroup);
  useEffect(() => {
    detail.teacherId && getTeacherDetails();
    detail.teacherId && getCourseGroups();
    detail.courseTeches && setTeches(detail.courseTeches);
    detail.isActive && setIsActive(detail.isActive);
  }, [detail.teacherId]);

  return (
    <Fragment>
      <Card style={{ width: "110%" }}>
        <CardBody>
          <div className="user-avatar-section">
            <div className="d-flex align-items-center flex-column">
              {renderUserImg()}
              <div className="d-flex flex-column align-items-center text-center">
                <div className="user-info">
                  <h4>{detail !== null ? detail.title : ""}</h4>
                  {/* {detail !== null ? (
                    <Badge color={roleColors[detail.role]} className='text-capitalize'>
                      {detail.role}
                    </Badge>
                  ) : null} */}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-around my-2 pt-75">
            <div className="d-flex align-items-start me-2">
              <Badge color="light-primary" className="rounded p-75">
                <UserCheck className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">{SeparationPrice(detail.cost)} تومان</h4>
                <small>قیمت دوره</small>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <Badge color="light-primary" className="rounded p-75">
                <Check className="font-medium-2" />
              </Badge>
              <div className="ms-75">
                <h4 className="mb-0">
                  {courseGroup && courseGroup[0]?.groupName}
                </h4>
                <small>گروه دوره</small>
              </div>
            </div>
          </div>
          <h4 className="fw-bolder border-bottom pb-50 mb-1">جزئیات دوره</h4>
          <div className="info-container">
            {detail !== null ? (
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام دوره : </span>
                  <span>{detail.title}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام استاد : </span>
                  <Link to={"/user/userInfo/" + detail.teacherId}>
                    {teacherDetails ? teacherDetails.fullName : ""}
                  </Link>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت برگذاری : </span>
                  <Badge
                    className="text-capitalize"
                    color={
                      detail.courseStatusName == "درحال برگذاری"
                        ? "light-success"
                        : detail.courseStatusName == "درحال ثبت نام" &&
                          "light-warning"
                    }
                  >
                    {detail.courseStatusName}
                  </Badge>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نام کلاس : </span>
                  <span className="text-capitalize">
                    {detail.courseClassRoomName}
                  </span>
                </li>
                {/* <li className='mb-75'>
                  <span className='fw-bolder me-25'>Tax ID:</span>
                  <span>Tax-</span>
                </li> */}
                <li className="mb-75">
                  <span className="fw-bolder me-25">نحوه برگذاری : </span>
                  <span>{detail.courseTypeName}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">سطح دوره : </span>
                  <span>{detail.courseLevelName}</span>
                </li>
                {teches.length > 0 ? (
                  <li className="mb-75">
                    <span className="fw-bolder me-25">
                      {" "}
                      تکنولوژی های دوره :{" "}
                    </span>
                    <div className="tech">
                      {teches.map((thech, i) => (
                        <Badge
                          className="text-capitalize"
                          color={"light-primary"}
                        >
                          {thech}
                        </Badge>
                      ))}
                    </div>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            ) : null}
          </div>
          <div className="d-flex justify-content-center pt-2 text-nowrap">
            <Link to={"/course/edit/" + detail.courseId}>
              <Button color="primary">ویرایش دوره</Button>
            </Link>
            {isActive ? (
              <Button
                className="ms-1"
                color="warning"
                outline
                onClick={reverseActiveStatus}
              >
                غیر فعال کردن دوره
              </Button>
            ) : (
              <Button
                className="ms-1"
                color="success"
                outline
                onClick={reverseActiveStatus}
              >
                فعال کردن دوره
              </Button>
            )}

            <Button
              className="ms-1"
              color="danger"
              outline
              onClick={handleSuspendedClick}
            >
              حذف دوره
            </Button>
          </div>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default UserInfoCard;
