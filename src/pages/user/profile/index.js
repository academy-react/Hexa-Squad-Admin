// ** React Imports
import { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

// ** Third Party Components
import instance from "../../../utility/interceptor";

// ** Custom Components
import UILoader from "@components/ui-loader";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Row, Col, Button } from "reactstrap";

// ** Demo Components
// import ProfilePoll from './ProfilePolls'
import ProfileAbout from "./ProfileAbout";
import ProfileConnection from "./ProfileConnection";
import SupportTracker from "./SupportTracker";
// import ProfilePosts from './ProfilePosts'
import ProfileHeader from "./ProfileHeader";
// import ProfileTwitterFeeds from './ProfileTwitterFeeds'
import ProfileLatestPhotos from "./ProfileLatestPhotos";
// import ProfileSuggestedPages from './ProfileSuggestedPages'
// import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'

// ** Styles
import "@styles/react/pages/page-profile.scss";
import BreadCrumbs from "../../../@core/components/breadcrumbs";
// import BreadCrumbs from "../../../../@core/components/breadcrumbs";

// ** Context
import { ThemeColors } from '@src/utility/context/ThemeColors'


const Profile = () => {

  // ** Context
  const { colors } = useContext(ThemeColors)

  // ** States
  const [data, setData] = useState([]);
  const [block, setBlock] = useState(false);

  const handleBlock = () => {
    setBlock(true);
    setTimeout(() => {
      setBlock(false);
    }, 2000);
  };

  const urlParam = useParams();
  console.log(urlParam);
  const GetUserInfo = async () => {
    try {
      const response = await instance.get(`/User/UserDetails/${urlParam.id}`);
      setData(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUserInfo();
  }, []);
  console.log("data", data);

  return (
    <Fragment>
      <BreadCrumbs
        title={"اطلاعات کاربر"}
        data={[
          { title: "لیست کاربران", link: "/userList" },
          { title: "اطلاعات کاربر", link: "/userList/userInfo/"+urlParam.id }
        ]}
      />
      {data !== null ? (
        <div id="user-profile">
          <Row>
            <Col sm="12">
              <ProfileHeader data={data} />
            </Col>
          </Row>
          <section id="profile-info">
            <Row>
              <Col
                lg={{ size: 3, order: 1 }}
                sm={{ size: 12 }}
                xs={{ order: 2 }}
              >
                <ProfileAbout data={data} />
                {/* <ProfileConnection data={data} /> */}
                {/* <ProfileSuggestedPages data={data.suggestedPages} /> */}
                {/* <ProfileTwitterFeeds data={data.twitterFeeds} /> */}
              </Col>
              <Col
                lg={{ size: 3, order: 2 }}
                sm={{ size: 12 }}
                xs={{ order: 1 }}
              >
                {/* <ProfilePosts data={data.post} /> */}
                <ProfileConnection data={data} />
              </Col>
              <Col
                lg={{ size: 6, order: 3 }}
                sm={{ size: 12 }}
                xs={{ order: 3 }}
              >
                <SupportTracker data={data} primary={colors.primary.main} danger={colors.danger.main} />
                {/* <ProfileLatestPhotos data={data.latestPhotos} /> */}
                {/* <ProfileFriendsSuggestions data={data.suggestions} /> */}
                {/* <ProfilePoll data={data.polls} /> */}
              </Col>
            </Row>
            
          </section>
        </div>
      ) : null}
    </Fragment>
  );
};

export default Profile;
