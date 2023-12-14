import { Fragment } from "react";
import BreadCrumbs from "../../../../@core/components/breadcrumbs";
import UserRoleTabs from "./UserRoleTabs";
import TeacherList from "../TeacherList";

const User = () => {

  return (
    <Fragment>
        <BreadCrumbs
            title={"لیست کاربران هگزا اسکواد"}
            data={[{ title: "لیست کاربران", link: "/userList" }]}
        />
        <UserRoleTabs/>
    </Fragment>
  )
}
export default User;