import toast from "react-hot-toast";
import instance from "../../../interceptor";

const activeAndDeActiveCourse = async (id, to, active) => {
  const obj = {
    active: active,
    id: id,
  };
  try {
    console.log(obj);
    const deletedCourse = await toast.promise(
      instance.put("/Course/ActiveAndDeactiveCourse", obj),
      {
        loading: active ? "در حال غیر فعال کردن دوره" : "در حال فعال کردن دوره",
        success: "عملیات با موفقیت انجام شد",
      }
    );
    if (deletedCourse.success) {
      // setTimeout(() => {
      //   window.location = to;
      // }, 600);
    }
    console.log(deletedCourse);
    return deletedCourse;
  } catch (error) {
    console.log(error);
  }
};

export default activeAndDeActiveCourse;
