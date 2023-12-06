import toast from "react-hot-toast";
import instance from "../../interceptor";

const DeleteCourse = async (id, to, active) => {
  const obj = {
    active: active,
    id: id,
  };
  try {
    console.log(obj);
    const deletedCourse = await toast.promise(
      instance.delete("/Course/DeleteCourse", { data: obj }),
      {
        loading: active ? "در حال حذف کردن دوره" : "در حال لغو حذف دوره",
        success: "عملیات با موفقیت انجام شد",
      }
    );
    if (deletedCourse.success) {
      setTimeout(() => {
        window.location = to;
      }, 600);
    }
    console.log(deletedCourse);
  } catch (error) {
    console.log(error);
  }
};

export default DeleteCourse;
