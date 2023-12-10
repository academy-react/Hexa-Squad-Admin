import toast from "react-hot-toast";
import instance from "../../../interceptor";

const DeleteCourseReserve = async (id, to) => {
  try {
    const result = await instance.delete("/CourseReserve", {
      data: { id: id },
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        window.location = to;
      }, 700);
    } else {
      toast.error(result.errors[0]);
    }
  } catch (error) {
    console.log(error);
  }
};

export default DeleteCourseReserve;
