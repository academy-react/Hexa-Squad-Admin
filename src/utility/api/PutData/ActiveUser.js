import toast from "react-hot-toast";
import instance from "../../interceptor";

const ActiveUser = async (id, to) => {
  const obj = {
    userId: id,
  };
  try {
    const activedUser = await toast.promise(
      instance.put("/User/ReverseToActiveUser", obj),
      {
        loading: "در حال فعال کردن کاربر",
        success: "عملیات با موفقیت انجام شد",
      }
    );
    if (activedUser.success === true) {
      setTimeout(() => {
        window.location = to;
      }, 600);
    }
    console.log(activedUser);
  } catch (error) {
    console.log(error);
  }
};
export default ActiveUser;
