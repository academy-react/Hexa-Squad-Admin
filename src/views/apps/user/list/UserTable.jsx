import React from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const UserTable = ({userList}) => {
  return (
    <MDBTable align='middle'>
      <MDBTableHead>
        <tr>
          <th scope='col'>نام</th>
          <th scope='col'>شماره موبایل</th>
          <th scope='col'>ایمیل</th>
          <th scope='col'>تاریخ</th>
          <th scope='col'>وضعیت</th>
          <th scope='col'>مدیریت</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {userList.map((data, index) => {
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              {/* <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              /> */}
              <div className='ms-3'>
                <p className='fw-bold mb-1'>{data.fname} {" "} {data.lname} </p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{data.phoneNumber}</p>
          </td>
          <td>
            <p className='fw-normal mb-1'>{data.gmail}</p>
          </td>
          <td>{data.insertDate}</td>

          {data.active === true 
          ? 
            <td>
              <MDBBadge color='success' pill>
                فعال
              </MDBBadge>
            </td>
          :   
            <td>            
              <MDBBadge color='danger' pill>
                غیر فعال
              </MDBBadge>
            </td> 
          }

          <td>
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
        </tr>
      })}
        {/* <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/6.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>Alex Ray</p>
                <p className='text-muted mb-0'>alex.ray@gmail.com</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>Consultant</p>
            <p className='text-muted mb-0'>Finance</p>
          </td>
          <td>
            <MDBBadge color='primary' pill>
              Onboarding
            </MDBBadge>
          </td>
          <td>Junior</td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
        </tr>
        <tr>
          <td>
            <div className='d-flex align-items-center'>
              <img
                src='https://mdbootstrap.com/img/new/avatars/7.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
              />
              <div className='ms-3'>
                <p className='fw-bold mb-1'>Kate Hunington</p>
                <p className='text-muted mb-0'>kate.hunington@gmail.com</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>Designer</p>
            <p className='text-muted mb-0'>UI/UX</p>
          </td>
          <td>
            <MDBBadge color='warning' pill>
              Awaiting
            </MDBBadge>
          </td>
          <td>Senior</td>
          <td>
            <MDBBtn color='link' rounded size='sm'>
              Edit
            </MDBBtn>
          </td>
        </tr> */}
      </MDBTableBody>
    </MDBTable>
  );
}
export default UserTable;