// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom';
import {handleDeleteUser} from '../../../utility/api/DeleteData/DeleteUser';
import ActiveUser from '../../../utility/api/PutData/ActiveUser';

// ** Icons Imports
import { AlignJustify } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import profileBg from "../../../assets/images/pages/pages/profile-bg.jpg";
import userIcon from "../../../assets/images/pages/pages/userIcon2.jpg";
import UserRoleModal from '../list/UserRoleModal';

const ProfileHeader = ({ data }) => {
  // ** States
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  // const [userActive, setUserActive] = useState(data.active)

  return (
    <Card className='profile-header mb-2'>
      <CardImg src={profileBg} alt='User Profile Image' top />
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img'>
            <img className='rounded img-fluid' src={data.currentPictureAddress === "Not-set" ? userIcon : data.currentPictureAddress } alt='Card image' />
          </div>
          <div className='profile-title ms-3 d-flex flex-row gap-2'>
            <h2 className='text-white'>
              {data.fName === null ? "کاربر"  : data.fName }
            </h2>
            <h2 className='text-white'>
              {data.lName === null ? "هگزا اسکواد": data.lName}
            </h2>
          </div>
        </div>
      </div>
      <div className='profile-header-nav'>
        <Navbar container={false} className='justify-content-end justify-content-md-between w-100' expand='md' light>
          <Button color='' className='btn-icon navbar-toggler' onClick={toggle}>
            <AlignJustify size={21} />
          </Button>
          <Collapse isOpen={isOpen} navbar>
            <div className='profile-tabs d-flex justify-content-end flex-wrap mt-1 mt-md-0'>
              <Link to={"/userList/userInfoEdit/" + data.id}>
                <Button color='primary' className=''>
                  <span className='fw-bold d-none d-md-block'>ویرایش اطلاعات</span>
                </Button>
              </Link>

              {/* <UserRoleModal 
                userId={data.id} 
                // isStudent={row.isStudent} 
                // isTeacher={row.isTeacher} 
                userRoles={data.roles} 
              /> */}

              {data.active === true 
                ? 
                  <Button 
                    color='danger' 
                    className='mx-2'
                    onClick={() => handleDeleteUser(
                      data.id, 
                      "/userList/userInfo/" + data.id
                    )}
                  >
                    <span className='fw-bold d-none d-md-block'>حذف کردن کاربر</span>
                  </Button>   
                :  
                  <Button 
                    color='primary' 
                    className='mx-2'
                    onClick={() => ActiveUser(data.id, "/userList/userInfo/" + data.id)}
                  >
                    <span className='fw-bold d-none d-md-block'>فعال کردن کاربر</span>
                  </Button>         
              }
            </div>
          </Collapse>
        </Navbar>
      </div>
    </Card>
  )
}

export default ProfileHeader;
