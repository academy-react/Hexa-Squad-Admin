// ** React Imports
import { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// ** Third Party Components
import instance from "../../../../utility/interceptor";

// ** Custom Components
import UILoader from "@components/ui-loader";
import Breadcrumbs from "@components/breadcrumbs";

// ** Reactstrap Imports
import { Row, Col, Button } from "reactstrap";

// ** Demo Components
// import ProfilePoll from './ProfilePolls'
import ProfileAbout from "./ProfileAbout";
import ProfileConnection from "./ProfileConnection";
// import ProfilePosts from './ProfilePosts'
import ProfileHeader from "./ProfileHeader";
// import ProfileTwitterFeeds from './ProfileTwitterFeeds'
import ProfileLatestPhotos from "./ProfileLatestPhotos";
// import ProfileSuggestedPages from './ProfileSuggestedPages'
// import ProfileFriendsSuggestions from './ProfileFriendsSuggestions'

// ** Styles
import "@styles/react/pages/page-profile.scss";
import BreadCrumbs from "../../../../@core/components/breadcrumbs";

const Profile = () => {
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
          { title: "لیست کاربران", link: "/user/userList" },
          { title: "اطلاعات کاربر", link: "/user/userInfo"+urlParam.id }
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
                <ProfileConnection data={data} />
                {/* <ProfileSuggestedPages data={data.suggestedPages} /> */}
                {/* <ProfileTwitterFeeds data={data.twitterFeeds} /> */}
              </Col>
              <Col
                lg={{ size: 6, order: 2 }}
                sm={{ size: 12 }}
                xs={{ order: 1 }}
              >
                {/* <ProfilePosts data={data.post} /> */}
              </Col>
              <Col
                lg={{ size: 3, order: 3 }}
                sm={{ size: 12 }}
                xs={{ order: 3 }}
              >
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
