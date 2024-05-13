import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FileText, Phone } from "react-feather";

import Wizard from "../../../@core/components/wizard/index";
import AddNewsInfo from "./Steps/AddNewsInfo";
import AddNewsPhoto from "./Steps/AddNewsPhoto";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
import instance from "../../../utility/interceptor";

const EditProfile = () => {
  // get profile info
  const urlParam = useParams();
  const [newsInfo, setNewsInfo] = useState([]);

  const GetNewsInfo = async () => {
    try {
      const response = await instance.get(`/News/${urlParam.id}`);
      setNewsInfo(response.detailsNewsDto);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(newsInfo.currentImageAddress);
  useEffect(() => {
    GetNewsInfo();
  }, []);

  const [title, setTitle] = useState();
  const [describe, setDescribe] = useState();
  const [miniDescribe, setMiniDescribe] = useState();
  const [keyword, setKeyword] = useState();
  const [newsCatregoryId, setNewsCatregoryId] = useState();
  const [googleTitle, setGoogleTitle] = useState();
  const [googleDescribe, setGoogleDescribe] = useState();
  const [currentImageAddress, setCurrentImageAddress] = useState();
  const [currentImageAddressTumb, setCurrentImageAddressTumb] = useState();
  const [image, setImage] = useState();
  const [files, setFiles] = useState([]);

  const ref = useRef(null);

  const [stepper, setStepper] = useState(null);

  const updateNewsInfo = async () => {
    const obj = {
      id: urlParam.id,
      Title: title, // 1
      Describe: describe, // 1
      MiniDescribe: miniDescribe, // 1
      Keyword: keyword, // 1
      NewsCatregoryId: newsCatregoryId, // 1
      Active: true,
      GoogleTitle: googleTitle, // 2
      GoogleDescribe: googleDescribe, // 2
      CurrentImageAddress: files[0], // 2
      CurrentImageAddressTumb: files[0], //2
      Image: files[0], // 2
    };
    try {
      const result = await toast.promise(instance.put("/News/UpdateNews", obj, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
        { loading: "در حال ویرایش خبر" }
      )

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.errors[0]);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    console.log(obj);
  };
  const steps = [
    {
      id: "user-info",
      title: " ویرایش توضیحات بلاگ",
      subtitle: " توضیحات خبر را وارد کنید",
      icon: <FileText size={18} />,
      content: (
        <AddNewsInfo
          stepper={stepper}
          setTitle={setTitle}
          setDescribe={setDescribe}
          setMiniDescribe={setMiniDescribe}
          setKeyword={setKeyword}
          setNewsCatregoryId={setNewsCatregoryId}
          newsInfo={newsInfo}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "user-connection",
      title: " ویرایش تصویر بلاگ",
      subtitle: "تصویر خبر را وارد کنید ",
      icon: <Phone size={18} />,
      content: (
        <AddNewsPhoto
          stepper={stepper}
          setGoogleTitle={setGoogleTitle}
          setGoogleDescribe={setGoogleDescribe}
          setCurrentImageAddress={setCurrentImageAddress}
          setCurrentImageAddressTumb={setCurrentImageAddressTumb}
          setImage={setImage}
          currentImage={newsInfo.currentImageAddress}
          newsInfo={newsInfo}
          files={files}
          setFiles={setFiles}
          onSubmit={updateNewsInfo}
          type="wizard-modern"
        />
      ),
    },
  ];

  return (
    <Fragment>
      <BreadCrumbs
        title={" ویرایش توضیحات بلاگ"}
        data={[
          { title: "لیست اخبار", link: "/NewsList" },
          {
            title: ` جزئیات ${newsInfo.title}`,
            link: "/NewsDetails/" + urlParam.id,
          },
          { title: "ویرایش اطلاعات اخبار", link: "/EditBlog/" + urlParam.id },
        ]}
      />
      <div className="modern-horizontal-wizard">
        <Wizard
          type="modern-horizontal"
          ref={ref}
          steps={steps}
          options={{
            linear: false,
          }}
          instance={(el) => setStepper(el)}
        />
      </div>
    </Fragment>
  );
};

export default EditProfile;
