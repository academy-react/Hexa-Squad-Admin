import { useEffect, useState } from "react";
import GetCourseDetail from "../../../utility/api/GetData/GetCourseGroups copy/GetCourseDetail";
import Avatar from "../avatar";
import instance from "../../../utility/interceptor";

const UserImage = ({ id }) => {
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const getData = async () => {
    const data = await instance.get(`/User/UserDetails/${id}`);
    setImage(data.currentPictureAddress);
    setImageName(data.fName + " " + data.lName);
    console.log(data);
  };
  useEffect(() => {
    getData();
  }, []);
  if (image) {
    return (
      <img
        height="25"
        width="25"
        alt="user-avatar"
        src={image}
        className="rounded"
      />
    );
  } else {
    return (
      <Avatar
        initials
        className="rounded"
        content={imageName}
        contentStyles={{
          borderRadius: 0,
          fontSize: "calc(10px)",
          width: "25px",
          height: "25px",
        }}
        style={{
          height: "25px",
          width: "25px",
        }}
      />
    );
  }
};

export default UserImage;
