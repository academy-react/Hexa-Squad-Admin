import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DeleteUser from "./DeleteUser";

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
      const deleteUser = await DeleteUser(id, to);
      deleteUser.success &&
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
        text: "حذف کامنت لغو شد :)",
        icon: "error",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  });
};