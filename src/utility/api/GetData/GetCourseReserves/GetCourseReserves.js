import instance from "../../../interceptor";
const GetCourseReserves = async (courseId) => {
  try {
    const CourseReserve = await instance.get("/CourseReserve/" + courseId);
    return CourseReserve;
  } catch (error) {
    console.log(error);
  }
};

export default GetCourseReserves;
