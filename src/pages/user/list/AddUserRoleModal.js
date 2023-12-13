// ** React Import
import { useState, Fragment } from 'react'
import toast from "react-hot-toast";
import { Button, Label, Input, Modal, ModalBody, ModalHeader, Row, Col, CardBody } from 'reactstrap'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { User, UserPlus } from "react-feather";
import AddUserRole from '../../../utility/api/PostData/AddUserRole/AddUserRole';

// Validation
import { AddNewsValidation } from '../../../utility/validation/AddNewsValidation';

// ** Styles
import "@styles/react/pages/modal-create-app.scss";

const AddUserRoleModal = ({ userId }, value) => {

  // Function to handle checkbox change
  const [student, setStudent] = useState();
  const handleStudentCheckbox = () => {
    setStudent(3);
    
  };
  // console.log("student=",student)

  const [teacher, setTeacher] = useState();
  const handleTeacherCheckbox = () => {
    setTeacher(2);
  };

  // ** States
  const [show, setShow] = useState(false);

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
          <Formik
            initialValues={{ 
              isStudent: "", 
              isTeacher: "",
            }}
            // validationSchema={AddNewsValidation}
            onSubmit={(value) => AddUserRole(value, userId)}
          >
            <Form>
              <div className='mb-2 position-relative'>
                <Label className='form-label' for='isStudent'>
                  سطح دسترسی کاربر 
                </Label>
                <div className='mt-1 d-flex flex-row gap-3'>
                  <div className='d-flex flex-row gap-75'>
                    <span className='mx-8'>دانشجو</span>
                    <Field 
                      id='isStudent' 
                      type="checkbox"
                      name={"isStudent"} 
                      checked={student}
                      onChange={handleStudentCheckbox}
                      className=""
                    />
                  </div>
                  <div className='d-flex flex-row gap-75'>
                    <span className='ml-2'>استاد</span>
                    <Field 
                      id='isStudent' 
                      type="checkbox"
                      name={"isTeacher"} 
                      checked={teacher}
                      onChange={handleTeacherCheckbox}
                      className=""
                    />
                  </div>
                </div> 
                <ErrorMessage name="isTeacher" className="position-absolute text-danger" component={'span'}/>
              </div>
              <Button type='submit' className='btn btn-primary me-1 mt-2' color='primary'>
                ثبت
              </Button>
              <Button type='reset' className='mt-2' color='secondary' onClick={() => setShow(!show)}>
                لغو
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default AddUserRoleModal;
