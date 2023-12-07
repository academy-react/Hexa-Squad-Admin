import instance from "../../../interceptor";

const GetTeacher = async (id) => {
  console.log(id);
  try {
    const result = await instance.get(
      "/Home/GetTeacherDetails?TeacherId=" + id
    );
    console.log("result", result);
    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default GetTeacher;
