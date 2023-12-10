import instance from "../../../interceptor";

const GetCourseDetail = async (id) => {
  try {
    const Detail = await instance.get("/Course/" + id);
    return Detail;
  } catch (error) {
    console.log(error);
  }
};

export default GetCourseDetail;
