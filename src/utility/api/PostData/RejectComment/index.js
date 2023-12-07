import toast from "react-hot-toast";
import instance from "../../../interceptor";

const RejectComment = async (id, to) => {
  try {
    const result = await instance.post(
      "/Course/RejectCourseComment?CommentCourseId=" + id
    );
    console.log(result);
    if (result.success) {
      toast.success(result.message);
      setTimeout(() => {
        window.location = to;
      }, 700);
    }
  } catch (error) {
    console.log(error);
  }
};

export default RejectComment;
