import instance from "../../../interceptor";
const AddReply = async (NewsId, parentId, value) => {
  try {
    const AddReplyNews = await instance.post("/News/CreateNewsReplyComment", {
      NewsId: NewsId,
      parentId: parentId,
      title: "title testt",
      describe: value.describe,
    });
    console.log(AddReplyNews);
  } catch (error) {
    console.log(error);
  }
};

export default AddReply;
