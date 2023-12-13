import toast from "react-hot-toast";
import instance from "../../../interceptor";

const AddUserRole = async (param, value, id) => {
  const obj = {
    roleId: value,
    userId: id,
  };
  try {
    const userRole = await instance.post(`/User/AddUserAccess?Enable=${param}`, obj)
    if (userRole.success) {
        toast.success("عملیات با موفقیت انجام شد.")
    } else {
        toast.error(userRole.message)
    }
  } catch (error) {
    console.log(error);
  }
};
export default AddUserRole;