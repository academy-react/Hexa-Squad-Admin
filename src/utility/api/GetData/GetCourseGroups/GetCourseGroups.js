import instance from "../../../interceptor";

const GetCourseGroups = async (TeacherId, CourseId) => {
  const objParam = {
    CourseId: CourseId,
    TeacherId: TeacherId,
  };
  try {
    const CourseGroup = await instance.get("/CourseGroup/GetCourseGroup", {
      params: objParam,
    });
    console.log(CourseGroup);
    return CourseGroup;
  } catch (error) {
    console.log(error);
  }
};

export default GetCourseGroups;
