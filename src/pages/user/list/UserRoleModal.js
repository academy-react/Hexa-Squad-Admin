// ** React Import
import { useState, Fragment, useEffect } from 'react'
import { Button, Label, Input, Modal, ModalBody, ModalHeader, Row, Col, CardBody, CardText, Card, Badge, UncontrolledTooltip } from 'reactstrap'
import AddUserRole from '../../../utility/api/PostData/AddUserRole/AddUserRole';

// ** Styles
import "@styles/react/pages/modal-create-app.scss";
import { Check, X } from 'react-feather';

const UserRoleModal = ({ userId, userRoles }) => {

  // ** States
  const [show, setShow] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [isTeacher, setIsTeacher] = useState(false)
  const [isStudent, setIsStudent] = useState(false)

  // Check User Admin Role Access
  const handleAdminDisabled = () => {
    if(userRoles?.includes("Administrator")){
      setIsAdmin(true)
    }
  }

  // Check User Teacher Role Access
  const handleStudentDisabled = () => {
    if(userRoles?.includes("Student")){
      setIsStudent(true)
    }
  }

  // Check User Student Role Access
  const handleTeacherDisabled = () => {
    if(userRoles?.includes("Teacher")){
      setIsTeacher(true)
    }
  }

  useEffect(() => {
    handleAdminDisabled()
    handleTeacherDisabled()
    handleStudentDisabled()
  },[handleAdminDisabled, handleTeacherDisabled, handleStudentDisabled])

  console.log("isStudentttttttt=",isStudent)

  const CustomLabel = ({ htmlFor }) => {
    return (
      <Label className='form-check-label' htmlFor={htmlFor}>
        <span className='switch-icon-left'>
          <Check size={14} />
        </span>
        <span className='switch-icon-right'>
          <X size={14} />
        </span>
      </Label>
    )
  }

  return (
    <Fragment>
      <Button
        color="primary"
        onClick={() => setShow(!show)}
        className="ms-2"
        size="sm"
      >
        دسترسی
        {/* <UserPlus /> */}
      </Button>
      <Modal
        isOpen={show}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-xs"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-sm-3">
          <h3 className="text-center mb-3">لطفا دسترسی های مورد نظر را به کاربر بدهید!</h3>
          {/* <h3 className='mb-75'>نقش های فعال این کاربر:</h3>
          <div className="d-flex flex-row gap-2 align-items-center my-2">
            {admin !== null 
              ?
                <Badge color="success" className='text-lg'>{admin}</Badge>
              : ""
            }
            {teacher !== null 
              ?
                <Badge color="success">{teacher}</Badge>
              : ""
            }
            {student !== null 
              ?
                <Badge color="success">{student}</Badge>
              : ""
            }          
          </div> */}
          <Card>
            <CardBody className="">
              <Badge color={isAdmin ? "success" : "light-secondary"} className='mb-2'>
                {isAdmin ? "فعال" : "غیرفعال"}
              </Badge>
              <div className='d-flex flex-row justify-content-center gap-2'>
                <h3 htmlFor='switch-success' className='form-check-label mb-50'>
                  ادمین
                </h3>                
                <div 
                  className='form-switch form-check-success cursor-pointer' 
                  id='switch-admin'
                
                >
                  <Input 
                    type='switch' 
                    // id='switch-success'
                    name='success' 
                    defaultChecked={isAdmin ? true : false} 
                    onClick={
                      isAdmin ? 
                        () => AddUserRole("false", 1, userId) 
                      : 
                        () => AddUserRole("true", 1, userId)
                    }  
                  />
                  <CustomLabel htmlFor='icon-primary' />
                </div>
                {isAdmin ? 
                  <UncontrolledTooltip placement='top' target='switch-admin'>
                    غیر فعال کردن این دسترسی
                  </UncontrolledTooltip>
                :
                  <UncontrolledTooltip placement='top' target='switch-admin'>
                  فعال کردن این دسترسی
                  </UncontrolledTooltip>                  
                }
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Badge color={isTeacher ? "success" : "light-secondary"} className='mb-2'>
                {isTeacher ? "فعال" : "غیرفعال"}
              </Badge>
              <div className='d-flex flex-row justify-content-center gap-2'>
                <h3 htmlFor='switch-success' className='form-check-label mb-50'>
                  استاد
                </h3>                
                <div 
                  className='form-switch form-check-success' 
                  id='switch-teacher'
                
                >
                  <Input 
                    type='switch' 
                    // id='switch-success' 
                    name='success' 
                    defaultChecked={isTeacher ? true : false} 
                    onClick={
                      isTeacher ? 
                        () => AddUserRole("false", 2, userId) 
                      : 
                        () => AddUserRole("true", 2, userId)
                    }
                  />
                  <CustomLabel htmlFor='icon-primary' />
                </div>
                {isTeacher ? 
                  <UncontrolledTooltip placement='top' target='switch-teacher'>
                    غیر فعال کردن این دسترسی
                  </UncontrolledTooltip>
                :
                  <UncontrolledTooltip placement='top' target='switch-teacher'>
                    فعال کردن این دسترسی
                  </UncontrolledTooltip>                  
                }
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Badge color={isStudent ? "success" : "light-secondary"} className='mb-2'>
                {isStudent ? "فعال" : "غیرفعال"}
              </Badge>
              <div className='d-flex flex-row justify-content-center gap-2'>
                <h3 htmlFor='switch-success' className='form-check-label mb-50'>
                  دانشجو
                </h3>                
                <div 
                  className='form-switch form-check-success' 
                  id='switch-student'
                  // onClick={
                  //   isStudent ? 
                  //     () => AddUserRole("false", 3, userId) 
                  //   : 
                  //     () => AddUserRole("true", 3, userId)
                  // }
                >
                  <Input 
                    type='switch' 
                    // id='switch-success' 
                    name='success' 
                    defaultChecked={isStudent ? true : false} 
                    onClick={
                      isStudent ? 
                        () => AddUserRole("false", 3, userId) 
                      : 
                        () => AddUserRole("true", 3, userId)
                    }
                  />
                  <CustomLabel htmlFor='icon-primary' />
                </div>
                {isStudent ? 
                  <UncontrolledTooltip placement='top' target='switch-student'>
                    غیر فعال کردن این دسترسی
                  </UncontrolledTooltip>
                :
                  <UncontrolledTooltip placement='top' target='switch-student'>
                    فعال کردن این دسترسی
                  </UncontrolledTooltip>                  
                }
              </div>
            </CardBody>
          </Card>





          {/* <h3 className='mb-75'>نقش های فعال این کاربر:</h3>
          <div className="d-flex flex-row gap-2 align-items-center my-2">
            {admin !== null 
              ?
                <Badge color="success" className='text-lg'>{admin}</Badge>
              : ""
            }
            {teacher !== null 
              ?
                <Badge color="success">{teacher}</Badge>
              : ""
            }
            {student !== null 
              ?
                <Badge color="success">{student}</Badge>
              : ""
            }          
          </div>
          <Card>
            <CardBody>
              <div className='d-flex flex-row gap-2 my-2'>
                <h3 for='switch-success' className='form-check-label mb-50'>
                  ادمین
                </h3>                
                <div className='form-switch form-check-success'>
                  <Input 
                    type='switch' 
                    id='switch-success' 
                    name='success' 
                    defaultChecked={isAdmin ? true : false} 
                    onClick={isAdmin ? () => AddUserRole("false", 1, userId) : () => AddUserRole("true", 1, userId)}
                  />
                  {isAdmin ? 
                    <UncontrolledTooltip placement='top' target='switch-success'>
                      غیر فعال کردن این دسترسی
                    </UncontrolledTooltip>
                  :
                    <UncontrolledTooltip placement='top' target='switch-success'>
                    فعال کردن این دسترسی
                    </UncontrolledTooltip>                  
                  }
                </div>
              </div>  
              <div className='d-flex flex-row gap-2 my-2'>
                <h3 for='switch-success' className='form-check-label mb-50'>
                  استاد
                </h3>                
                <div className='form-switch form-check-success'>
                  <Input 
                    type='switch' 
                    id='switch-success' 
                    name='success' 
                    defaultChecked={isTeacher ? true : false} 
                    onClick={isTeacher ? () => AddUserRole("false", 2, userId) : () => AddUserRole("true", 1, userId)}
                  />
                  {isTeacher ? 
                    <UncontrolledTooltip placement='top' target='switch-success'>
                      غیر فعال کردن این دسترسی
                    </UncontrolledTooltip>
                  :
                    <UncontrolledTooltip placement='top' target='switch-success'>
                    فعال کردن این دسترسی
                    </UncontrolledTooltip>                  
                  }
                </div>
              </div>   
              <div className='d-flex flex-row gap-2 my-2'>
                <h3 for='switch-success' className='form-check-label mb-50'>
                دانشجو
                </h3>                
                <div className='form-switch form-check-success'>
                  <Input 
                    type='switch' 
                    id='switch-success' 
                    name='success' 
                    defaultChecked={isStudent ? true : false} 
                    onClick={isStudent ? () => AddUserRole("false", 3, userId) : () => AddUserRole("true", 1, userId)}
                  />
                  {isStudent ? 
                    <UncontrolledTooltip placement='top' target='switch-success'>
                      غیر فعال کردن این دسترسی
                    </UncontrolledTooltip>
                  :
                    <UncontrolledTooltip placement='top' target='switch-success'>
                    فعال کردن این دسترسی
                    </UncontrolledTooltip>                  
                  }
                </div>
              </div>                                    
            </CardBody>
          </Card> */}
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default UserRoleModal;
