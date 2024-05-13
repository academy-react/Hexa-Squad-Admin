import { Fragment, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FileText, Phone } from "react-feather";

// import instance from "../../../../../utility/interceptor";

// import Wizard from "../../../../../@core/components/wizard";
import AddUserInfo from "./steps/AddUserInfo";
import AddUserConnection from "./steps/AddUserConnection";
// import BreadCrumbs from "../../../../../@core/components/breadcrumbs";
import instance from "../../../../utility/interceptor";
import Wizard from "../../../../@core/components/wizard";
import BreadCrumbs from "../../../../@core/components/breadcrumbs";

const EditProfile = () => {
  // get profile info
  const urlParam = useParams();
  const [userInfo, setUserInfo] = useState([]);
  // console.log(urlParam);
  const GetUserInfo = async () => {
    try {
      const response = await instance.get(`/User/UserDetails/${urlParam.id}`);
      setUserInfo(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    GetUserInfo();
  }, []);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [userAbout, setUserAbout] = useState();
  const [linkdin, setLinkdin] = useState();
  const [telegram, setTelegram] = useState();
  const [homeAdderess, setHomeAdderess] = useState();
  const [nationalCode, setNationalCode] = useState();
  const [birthDay, setBirthDay] = useState();
  const ref = useRef(null);

  const [stepper, setStepper] = useState(null);

  const updateUserInfo = async () => {
    const obj = {
      id: urlParam.id,
      fName: firstName, // 1
      lName: lastName, // 1
      gmail: email, // 2
      phoneNumber: phoneNumber, // 2
      userAbout: userAbout, // 1
      linkdinProfile: linkdin, // 2
      telegramLink: telegram, // 2
      homeAdderess: homeAdderess, // 1
      nationalCode: nationalCode, // 1
      // birthDay: birthDay, // 1
    };
    try {
      const result = await instance.put("/User/UpdateUser", obj);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.errors[0]);
      }
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
    // console.log(obj);
  };
  const steps = [
    {
      id: "user-info",
      title: "اطلاعات کاربر",
      subtitle: "اطلاعات کاربر را وارد کنید",
      icon: <FileText size={18} />,
      content: (
        <AddUserInfo
          stepper={stepper}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setUserAbout={setUserAbout}
          setHomeAdderess={setHomeAdderess}
          setNationalCode={setNationalCode}
          setBirthDay={setBirthDay}
          userInfo={userInfo}
          type="wizard-modern"
        />
      ),
    },
    {
      id: "user-connection",
      title: "راه های ارتباطی کاربر",
      subtitle: "راه های ارتباطی با کاربر را وارد کنید ",
      icon: <Phone size={18} />,
      content: (
        <AddUserConnection
          stepper={stepper}
          setEmail={setEmail}
          setPhoneNumber={setPhoneNumber}
          setLinkdin={setLinkdin}
          setTelegram={setTelegram}
          userInfo={userInfo}
          onSubmit={updateUserInfo}
          type="wizard-modern"
        />
      ),
    },
  ];

  return (
    <Fragment>
      <BreadCrumbs
        title={"ویرایش اطلاعات کاربر"}
        data={[
          { title: "لیست کاربران", link: "/userList" },
          {
            title: ` اطلاعات ${userInfo.gmail}`,
            link: "/userList/userInfo/" + urlParam.id,
          },
          {
            title: "ویرایش اطلاعات کاربر",
            link: "/userList/userInfoEdit/" + urlParam.id,
          },
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
