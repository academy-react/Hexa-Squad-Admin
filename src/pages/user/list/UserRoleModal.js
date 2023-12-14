// ** React Import
import { useState, Fragment, useEffect } from 'react'
import { Button, Label, Input, Modal, ModalBody, ModalHeader, Row, Col, CardBody, CardText, Card, Badge } from 'reactstrap'
import AddUserRole from '../../../utility/api/PostData/AddUserRole/AddUserRole';

// ** Styles
import "@styles/react/pages/modal-create-app.scss";

const UserRoleModal = ({ userId, userRoles }) => {

  // ** States
  const [show, setShow] = useState(false);

  const [admin, setAdmin] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isNotAdmin, setIsNotAdmin] = useState(true)

  const [teacher, setTeacher] = useState(null)
  const [isTeacher, setIsTeacher] = useState(false)
  const [isNotTeacher, setIsNotTeacher] = useState(true)

  const [student, setStudent] = useState(null)
  const [isStudent, setIsStudent] = useState(false)
  const [isNotStudent, setIsNotStudent] = useState(true)

  // Check User Admin Role Access
  const handleAdminDisabled = () => {
    if(userRoles?.includes("Administrator")){
      setIsAdmin(true)
      setIsNotAdmin(false)
      setAdmin("ادمین")
    }
  }

  // Check User Teacher Role Access
  const handleStudentDisabled = () => {
    if(userRoles?.includes("Student")){
      setIsStudent(true)
      setIsNotStudent(false)
      setTeacher("استاد")
    }
  }

  // Check User Student Role Access
  const handleTeacherDisabled = () => {
    if(userRoles?.includes("Teacher")){
      setIsTeacher(true)
      setIsNotTeacher(false)
      setStudent("دانشجو")
    }
  }

  useEffect(() => {
    handleAdminDisabled()
    handleTeacherDisabled()
    handleStudentDisabled()
  },[handleAdminDisabled, handleTeacherDisabled, handleStudentDisabled])

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
        className="modal-dialog-centered modal-md"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="pb-3 px-sm-3">
          <h1 className="text-center mb-1">لطفا نقش مورد نظر را انتخاب کنید!</h1>
          {/* <h3 className='mb-75'>نقش های این کاربر:</h3>
          <CardText>{userRoles}</CardText> */}
          <h3 className='mb-75'>نقش های این کاربر:</h3>
          <div className="d-flex flex-row gap-2 align-items-center my-2">
          {admin !== null 
            ?
              <Badge color="light-success" className='text-lg'>{admin}</Badge>
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
            <CardBody className="d-flex flex-row gap-2 align-items-center">
              <h3>ادمین:</h3>
              <Button color='primary' disabled={isAdmin} onClick={() => AddUserRole("false", 1, userId)}>فعال</Button>
              <Button color='danger' disabled={isNotAdmin} onClick={() => AddUserRole("false", 1, userId)}>غیر فعال</Button>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="d-flex flex-row gap-2 align-items-center">
              <h3>استاد:</h3>
              <Button color='primary' type='submit' disabled={isTeacher} onClick={() => AddUserRole("true", 2, userId)}>فعال</Button>
              <Button color='danger' type='submit' disabled={isNotTeacher} onClick={() => AddUserRole("false", 2, userId)}>غیر فعال</Button>
            </CardBody>
          </Card>
          <Card>
            <CardBody className="d-flex flex-row gap-2 align-items-center">
              <h3>دانشجو:</h3>
              <Button color='primary' disabled={isStudent} onClick={() => AddUserRole("true", 3, userId)}>فعال</Button>
              <Button color='danger' disabled={isNotStudent} onClick={() => AddUserRole("false", 3, userId)}>غیر فعال</Button>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default UserRoleModal;
