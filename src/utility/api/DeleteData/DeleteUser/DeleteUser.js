import toast from "react-hot-toast";
import instance from "../../interceptor";

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
export default DeleteUser;