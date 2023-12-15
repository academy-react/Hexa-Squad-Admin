import toast from "react-hot-toast";
import instance from "../../interceptor";

const handleActive = async (value,id) => {
  const obj = {
    id: id,
    Active: value,
  };
  try {
    const response = await instance.put("/News/ActiveDeactiveNews", obj, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    if (response.success) {
      toast.success(" بلاگ شما ثبت شد");
    } else {
      toast.error(" لطفا متن بلاگ را به درستی وارد کنید");
    }
  } catch (error) {
    console.error("Error submitting post:", error);
  }
};
export default handleActive;
