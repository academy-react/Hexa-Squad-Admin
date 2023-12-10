// ** React Import
import { useState } from 'react'
import toast from "react-hot-toast";

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Input } from 'reactstrap'
import { ErrorMessage, Field, Form, Formik } from "formik";


// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch } from 'react-redux'
import instance from '../../../../utility/interceptor'

const defaultValues = {
  firstName: '',
  lastName: '',
  gmail: '',
  phoneNumber: '',
  password: '',
  isStudent: '',
  isTeacher: '',
}

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const AddUSer = ({ open, toggleSidebar }) => {

  // Function to handle checkbox change
  const [student, setStudent] = useState(false);
  const handleStudentCheckbox = () => {
    setStudent(!student);
  };

  const [teacher, setTeacher] = useState(false);
  const handleTeacherCheckbox = () => {
    setTeacher(!teacher);
  };


  const [userInfo, setUserInfo] = useState()

  // Create User API
  const AddNewUser = async (value) => {
    const obj = {
      lastName: value.lastName,
      firstName: value.firstName,
      gmail: value.gmail,
      password: value.password,
      phoneNumber: value.phoneNumber,
      isStudent: value.isStudent,
      isTeacher: value.isTeacher
    }
    try{
      const result = await instance.post("/User/CreateUser", obj);
      setUserInfo([obj])
      if (result.success) {
        toast.success(result.message)
      } else {
        toast.error(result.error)
      }
    } catch(error) {
      console.log(error);
    }
  }



  // ** States
  const [data, setData] = useState(null)
  const [plan, setPlan] = useState('basic')
  const [role, setRole] = useState()

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      // toggleSidebar()
      // dispatch(
      //   addUser({
      //     role,
      //     avatar: '',
      //     status: 'active',
      //     email: data.email,
      //     currentPlan: plan,
      //     billing: 'auto debit',
      //     company: data.company,
      //     contact: data.contact,
      //     fullName: data.fullName,
      //     username: data.username,
      //     country: data.country.value
      //   })
      // )
      AddNewUser(data)
    } else {
      for (const key in data) {
        // if (data[key] === null) {
        //   setError('country', {
        //     type: 'manual'
        //   })
        // }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('subscriber')
    setPlan('basic')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='کاربر جدید'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
        <Formik
            initialValues={{ 
                firstName: "", 
                lastName: "", 
                password: "", 
                gmail: "", 
                phoneNumber: "", 
                isStudent: "", 
                isTeacher: "",
            }}
            enableReinitialize={true}
            validationSchema={EditProfileValidation}
            onSubmit={(value) => {handleEditProfileInfo(value)}}
        ></Formik>
    </Sidebar>
  )
}

export default AddUSer
