import toast from "react-hot-toast";
import instance from "../../interceptor";

const DeleteUser = async (id, to) => {
  const obj = {
    userId: id,
  };
  try {
    const deletedUser = await toast.promise(
      instance.delete("/User/DeleteUser", { data: obj }),
      {
        loading: "در حال حذف کردن کاربر",
        success: "عملیات با موفقیت انجام شد",
      }
    );
    if (deletedUser.success) {
      setTimeout(() => {
        window.location = to;
      }, 600);
    }
  } catch (error) {
    console.log(error);
  }
};
export default DeleteUser;
