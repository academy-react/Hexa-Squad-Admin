// ** React Imports
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

// ** Store & Actions
// import { getUser } from '../store'
// import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col } from "reactstrap";

// ** User View Components
import UserTabs from "./Tabs";
// import PlanCard from "./PlanCard";
import UserInfoCard from "./CourseInfoCard";

// ** Styles
import "@styles/react/apps/app-course-detail.scss";
import GetCourseDetail from "../../utility/api/GetData/GetCourseGroups copy/GetCourseDetail";

const DetailCourse = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [active, setActive] = useState("1");

  const getDetail = async () => {
    console.log("ssssssss");
    try {
      const detail = await GetCourseDetail(id);
      setDetail(detail);
      console.log("detail", detail);
    } catch (error) {}
  };
  useEffect(() => {
    getDetail();
    console.log(detail);
  }, []);

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  // useEffect(() => getDetail(), []);

  return (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard detail={detail} />
          {/* <PlanCard />  */}
        </Col>
        <Col
          xl="8"
          lg="7"
          className="d-flex justify-content-end"
          xs={{ order: 0 }}
          md={{ order: 1, size: 7 }}
        >
          <div style={{ width: "95%" }}>
            <UserTabs active={active} detail={detail} toggleTab={toggleTab} />
          </div>
        </Col>
      </Row>
    </div>
  );
};
export default DetailCourse;
