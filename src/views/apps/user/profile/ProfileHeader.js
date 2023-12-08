// ** React Imports
import { useState } from 'react'
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import instance from '../../../../utility/interceptor';

// ** Icons Imports
import { AlignJustify, Rss, Info, Image, Users, Edit, Trash } from 'react-feather'

// ** Reactstrap Imports
import { Card, CardImg, Collapse, Navbar, Nav, NavItem, NavLink, Button } from 'reactstrap'

import profileBg from "../../../../assets/images/pages/pages/profile-bg.jpg";
import userIcon from "../../../../assets/images/pages/pages/userIcon2.jpg";

const ProfileHeader = ({ data }) => {
  // ** States
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  // const [userActive, setUserActive] = useState(data.active)

  // Delete User API
  const DeleteUser = async () => {
    const obj = {
      userId: data.id,
    };
    try {
      const deletedUser = await toast.promise(
        instance.delete("/User/DeleteUser", { data: obj }),
        {
          loading: "در حال حذف کردن کاربر",
          success: "عملیات با موفقیت انجام شد",
        }
      );
      if (deletedUser.success) {
        setTimeout(() => {
          window.location = to;
        }, 600);
      }
      console.log(deletedUser);
    } catch (error) {
      console.log(error);
    }
  };

  // Active User 
  const ActiveUser = async () => {
    const obj = {
      userId: data.id,
    };
    try {
      const activedUser = await toast.promise(
        instance.put("/User/ReverseToActiveUser", obj),
        {
          loading: "در حال فعال کردن کاربر",
          success: "عملیات با موفقیت انجام شد",
        }
      );
      if (activedUser.success) {
        setTimeout(() => {
          window.location = to;
        }, 600);
      }
      console.log(activedUser);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <Card className='profile-header mb-2'>
      <CardImg src={profileBg} alt='User Profile Image' top />
      <div className='position-relative'>
        <div className='profile-img-container d-flex align-items-center'>
          <div className='profile-img'>
            <img className='rounded img-fluid' src={data.currentPictureAddress === "Not-set" ? userIcon : data.currentPictureAddress } alt='Card image' />
          </div>
          <div className='profile-title ms-3'>
            <h2 className='text-white'>{data.fName+" "+data.lName}</h2>
            {/* <p className='text-white'>{data.designation}</p> */}
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
              <Link to={"/user/userInfoEdit/" + data.id}>
                <Button color='primary' className='mx-2'>
                  <span className='fw-bold d-none d-md-block'>ویرایش اطلاعات</span>
                </Button>
              </Link>

              {data.active === true 
                ? 
                  <Button color='danger' onClick={DeleteUser}>
                    <span className='fw-bold d-none d-md-block'>حذف کردن کاربر</span>
                  </Button>   
                :  
                  <Button color='primary' onClick={ActiveUser}>
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

export default ProfileHeader
