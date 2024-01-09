// ** React Imports
import { Fragment, useState } from "react";

// ** Icons Imports
import { Home, Settings, EyeOff, User, Bookmark ,Heart} from "react-feather";

// ** Reactstrap Imports
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import UserReserveTableTab from "./ProfileCoursesTabs/UserReserveTableTab";
import UserFavoriteTable from "./ProfileCoursesTabs/UserFavoriteTable";
const TabsIcons = () => {
  // ** State
  const [active, setActive] = useState("1");

  const toggle = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };
  return (
    <Fragment>
      <Nav tabs className="mt-4 ">
        <NavItem className="me-2">
          <NavLink
            active={active === "1"}
            onClick={() => {
              toggle("1");
            }}
          >
            <Bookmark size={22} />
            <span className="align-middle fs-3 ">دوره های رزرو شده</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === "2"}
            onClick={() => {
              toggle("2");
            }}
          >
            <Heart size={22} />
            <span className="align-middle fs-3 ">دوره های موردعلاقه </span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="py-50" activeTab={active}>
        <TabPane tabId="1">
          <UserReserveTableTab />
        </TabPane>
        <TabPane tabId="2">
          <UserFavoriteTable />
        </TabPane>
      </TabContent>
    </Fragment>
  );
};
export default TabsIcons;
