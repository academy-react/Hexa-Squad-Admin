// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

// ** Icons Imports
import { User, Bookmark, Bell, Link, Activity } from "react-feather";

// ** course Components
import InvoiceList from "./InvoiceList";
import Detail from "./Detail";
import Describe from "./Describe";
import CourseComments from "./CourseComments";

const UserTabs = ({ active, toggleTab, detail }) => {
  return (
    <Fragment>
      <Nav pills className="mb-2">
        <NavItem>
          <NavLink active={active === "1"} onClick={() => toggleTab("1")}>
            <Activity className="font-medium-3 me-50" />
            <span className="fw-bold">جزئیات</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "3"} onClick={() => toggleTab("3")}>
            <Bookmark className="font-medium-3 me-50" />
            <span className="fw-bold">رزرو کننده ها</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "4"} onClick={() => toggleTab("4")}>
            <Bell className="font-medium-3 me-50" />
            <span className="fw-bold">توضیحات دوره</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active={active === "2"} onClick={() => toggleTab("2")}>
            <User className="font-medium-3 me-50" />
            <span className="fw-bold">نظرات </span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={active}>
        <TabPane tabId="1">
          <Detail />
        </TabPane>
        <TabPane tabId="2">
          <CourseComments detail={detail} />
        </TabPane>
        <TabPane tabId="3">
          <InvoiceList detail={detail} />
        </TabPane>
        <TabPane tabId="4">
          <Describe describe={detail.describe} />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default UserTabs;
