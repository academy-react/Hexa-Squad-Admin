import instance from "../../../interceptor";

const GetCourseComments = async (id) => {
  try {
    const comments = await instance.get("/Course/GetCourseCommnets/" + id);
    console.log(comments);
    return comments;
  } catch (error) {
    console.log(error);
  }
};

export default GetCourseComments;
