import toast from "react-hot-toast";
import instance from "../../interceptor";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const DeleteUser = async (id, to) => {
  const obj = {
    userId: id,
  };
  try {
    const deletedUser = await instance.delete("/User/DeleteUser", { data: obj })
    if (deletedUser.success) {
      setTimeout(() => {
        window.location = to;
      }, 600);
    }
  } catch (error) {
    console.log(error);
  }
};
// export default DeleteUser;

const MySwal = withReactContent(Swal);
export const handleDeleteUser = (id, to) => {
  return MySwal.fire({
    title: "از حذف کاربر مطمئن هستید ؟",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "بله مطمئنم !",
    cancelButtonText: "نمیخواهم حذف کنم",
    customClass: {
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-outline-danger ms-1",
    },
    buttonsStyling: false,
  }).then(async (result) => {
    if (result.value) {
      const deletedUser = await DeleteUser(id, to);
      deletedUser.success &&
        MySwal.fire({
          icon: "success",
          title: "موفقیت آمیز !",
          text: "کاربر با موفقیت حذف شد .",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
    } else if (result.dismiss === MySwal.DismissReason.cancel) {
      MySwal.fire({
        title: "کاربر حذف نشد",
        text: "حذف کاربر لغو شد :)",
        icon: "error",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  });
};
export default handleDeleteUser;