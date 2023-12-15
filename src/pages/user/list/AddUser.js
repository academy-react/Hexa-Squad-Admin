// ** React Import
import { useState, Fragment } from 'react'
import toast from "react-hot-toast";
import { Button, Label, Input, Modal, ModalBody, ModalHeader, Row, Col, CardBody } from 'reactstrap'
import { ErrorMessage, Field, Form, Formik } from "formik";
import { User } from "react-feather";
import instance from '../../../utility/interceptor';
import Sidebar from '@components/sidebar'

// Validation
import { AddNewsValidation } from '../../../utility/validation/AddNewsValidation';

// ** Styles
import "@styles/react/pages/modal-create-app.scss";

const AddUSer = ({ BtnTitle, modalHeader, isStudent, isTeacher, roleAccess }) => {

  // Function to handle checkbox change
  const [student, setStudent] = useState(false);
  const handleStudentCheckbox = () => {
    setStudent(!student);
    console.log("student=",student)
  };

  const [teacher, setTeacher] = useState(false);
  const handleTeacherCheckbox = () => {
    setTeacher(!teacher);
    console.log("teacher=",teacher)
  };

  // ** States
  const [show, setShow] = useState(false);

  // Create User API
  const AddNewUser = async (value) => {
    const obj = {
      lastName: value.lastName,
      firstName: value.firstName,
      gmail: value.gmail,
      password: value.password,
      phoneNumber: value.phoneNumber,
      isStudent: roleAccess ? student : isStudent,
      isTeacher: roleAccess ? teacher : isTeacher,
    }
    try{
      const result = await instance.post("/User/CreateUser", obj);
      setShow(!show)
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.errors[0])
      }
    } catch(error) {
      console.log(error);
    }
  }


  return (
    <Fragment>
      <Button
        color="primary"
        onClick={() => setShow(!show)}
        className="d-flex gap-1 align-items-center"
      >
        {BtnTitle}
        <User />
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
          <h1 className="text-center mb-1">{modalHeader}</h1>
          <Formik
            initialValues={{ 
              firstName: "", 
              lastName: "", 
              password: "", 
              gmail: "", 
              phoneNumber: "", 
              // isStudent: "", 
              // isTeacher: "",
            }}
            validationSchema={AddNewsValidation}
            onSubmit={(value) => AddNewUser(value)}
          >
            <Form>
              <div className='mb-2 position-relative'>
                <Label className='form-label' for='firstName'>
                  <span className='text-danger'>*</span>{" "}نام
                </Label>
                <Field 
                  id='firstName' 
                  name={"firstName"} 
                  placeholder='نام کاربر را وارد کنید' 
                  className="form-control"
                />
                <ErrorMessage name="firstName" className="position-absolute text-danger" component={'span'}/>
              </div>
              <div className='mb-2 position-relative'>
                <Label className='form-label' for='lastName'>
                  <span className='text-danger'>*</span>{" "}نام خانوادگی
                </Label>
                <Field 
                  id='lastName' 
                  name={"lastName"} 
                  placeholder='نام خانوادگی کاربر را وارد کنید' 
                  className="form-control"
                />
                <ErrorMessage name="lastName" className="position-absolute text-danger" component={'span'}/>
              </div>
              <div className='mb-2 position-relative'>
                <Label className='form-label' for='userEmail'>
                  <span className='text-danger'>*</span>{" "}ایمیل
                </Label>
                <Field 
                  id='userEmail' 
                  type='gmail'
                  name={"gmail"} 
                  placeholder='example@gmail.com'
                  className="form-control"
                />
                <ErrorMessage name="gmail" className="position-absolute text-danger" component={'span'}/>
              </div>
              <div className='mb-2 position-relative'>
                <Label className='form-label' for='password'>
                  <span className='text-danger'>*</span>{" "}رمز عبور
                </Label>
                <Field 
                  id='password' 
                  name={"password"} 
                  placeholder='رمز عبور کاربر را وارد کنید'
                  className="form-control"
                />
                <ErrorMessage name="password" className="position-absolute text-danger" component={'span'}/>
              </div>
              <div className='mb-2 position-relative'>
                <Label className='form-label' for='phoneNumber'>
                  <span className='text-danger'>*</span>{" "}شماره موبایل
                </Label>
                <Field 
                  id='phoneNumber' 
                  name={"phoneNumber"} 
                  placeholder='شماره موبایل کاربر را وارد کنید'
                  className="form-control"
                />
                <ErrorMessage name="phoneNumber" className="position-absolute text-danger" component={'span'}/>
              </div>
              {roleAccess ? (
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
              ) : ""}
              <Button type='submit' className='btn btn-primary me-1 mt-2' color='primary'>
                ثبت اطلاعات
              </Button>
              <Button type='reset' className='mt-2' color='secondary' outline onClick={() => setShow(!show)}>
                لغو
              </Button>
            </Form>
          </Formik>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default AddUSer
