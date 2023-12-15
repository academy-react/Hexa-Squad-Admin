import instance from "../../../interceptor";
const replyNewsComment = async (id) => {
  try {
    const replyNewsComments = await instance.get(
      "/News/GetAdminRepliesComments?CommentId=" + id
    );
    console.log(replyNewsComments);
  } catch (error) {
    console.log(error);
  }
};

export default replyNewsComment;
