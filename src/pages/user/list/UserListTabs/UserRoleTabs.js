import React, { useState } from 'react'
import { Activity, User } from 'react-feather'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import HandleUsersList from './HandleUsersList';
import AddUSer from '../AddUser';

const UserRoleTabs = () => {
  const [active, setActive] = useState('1')

  const toggle = tab => {
    if (active !== tab) {
      setActive(tab)
    }
  }
  return (
    <React.Fragment>
      <Nav pills justified>
        <NavItem>
          <NavLink
            active={active === '1'}
            onClick={() => {
              toggle('1')
            }}
          >
            <User className="font-medium-7 me-50" />
            {/* <i class="cis-chalkboard-teacher"></i>  */}
            <span className="fw-bold fs-3 me-2">همه ی کاربران</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '2'}
            onClick={() => {
              toggle('2')
            }}
          >
            <User className="font-medium-7 me-50" />
            {/* <i class="cis-chalkboard-teacher"></i>  */}
            <span className="fw-bold fs-3 me-2">دانشجویان</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '3'}
            onClick={() => {
              toggle('3')
            }}
          >
            <User className="font-medium-7 me-50" />
            <span className="fw-bold fs-3 me-2">استادان</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            active={active === '4'}
            onClick={() => {
              toggle('4')
            }}
          >
            <User className="font-medium-7 me-50" />
            <span className="fw-bold fs-3 me-2">مدیران</span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className='py-50' activeTab={active}>
      <TabPane tabId='1'>
        <HandleUsersList
          // role = {3}
          activeUserCount = "تعداد کاربران فعال شما: "
          deletedUserCount = "تعداد کاربران حذف شده: "
          activeStatTitle = "کاربران فعال شما"
          deletedStatTitle = "کاربران حذف شده"
          addUserBtn = {
            <AddUSer 
              BtnTitle={"اضافه کردن کاربر"} 
              modalHeader={"افزودن کاربر جدید"}
              // isStudent={true}
              // isTeacher={false}
              roleAccess={true}
            />
          }
        />
        </TabPane>
        <TabPane tabId='2'>
          <HandleUsersList
            role = {3}
            activeUserCount = "تعداد دانشجویان فعال شما: "
            deletedUserCount = "تعداد دانشجویان حذف شده: "
            activeStatTitle = "دانشجویان فعال شما"
            deletedStatTitle = "دانشجویان حذف شده"
            addUserBtn = {
              <AddUSer 
                BtnTitle={"اضافه کردن دانشجو"} 
                modalHeader={"افزودن دانشجوی جدید"}
                isStudent={true}
                isTeacher={false}
                roleAccess={false}
              />
            }
          />
        </TabPane>
        <TabPane tabId='3'>
          <HandleUsersList
            role = {2}
            activeUserCount = "تعداد اساتید فعال شما: "
            deletedUserCount = "تعداد اساتید حذف شده: "
            activeStatTitle = "اساتید فعال شما"
            deletedStatTitle = "اساتید حذف شده"
            addUserBtn = {
              <AddUSer 
                BtnTitle={"اضافه کردن استاد"} 
                modalHeader={"افزودن استاد جدید"}
                isStudent={true}
                isTeacher={false}
                roleAccess={false}
              />
            }
          />        
        </TabPane>
        <TabPane tabId='4'>
          <HandleUsersList
            role = {1}
            activeUserCount = "تعداد مدیران فعال شما: "
            deletedUserCount = "تعداد مدیران حذف شده: "
            activeStatTitle = "مدیران فعال شما"
            deletedStatTitle = "مدیران حذف شده"
            addUserBtn = {""}
          />        
        </TabPane>
      </TabContent>
    </React.Fragment>
  )
}
export default UserRoleTabs;