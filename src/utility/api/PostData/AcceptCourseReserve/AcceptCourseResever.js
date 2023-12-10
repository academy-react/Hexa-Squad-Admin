import toast from "react-hot-toast";
import instance from "../../../interceptor";
import GetCourseDetail from "../../GetData/GetCourseGroups copy/GetCourseDetail";
import GetCourseGroups from "../../GetData/GetCourseGroups/GetCourseGroups";

const AcceptCourseReserves = async (courseId, studentId, to) => {
  // get course details
  const detail = await GetCourseDetail(courseId);
  const teacherId = detail.teacherId;
  // get Course group
  const group = await GetCourseGroups(teacherId, courseId);

  const reserveBody = {
    courseId: courseId,
    courseGroupId: group[0].groupId,
    studentId: studentId,
  };
  try {
    const CourseReserve = await instance.post(
      "/CourseReserve/SendReserveToCourse",
      reserveBody
    );
    console.log(CourseReserve);
    if (CourseReserve.success) {
      toast.success(CourseReserve.message);
      setTimeout(() => {
        window.location = to;
      },700);
    } else {
      toast.error(CourseReserve.message);
      toast.error(CourseReserve.errors[0]);
    }
    return CourseReserve;
  } catch (error) {
    console.log(error);
  }
};

export default AcceptCourseReserves;
