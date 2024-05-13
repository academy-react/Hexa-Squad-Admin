// ** React Import
import { useState } from 'react'
import toast from "react-hot-toast";

// ** Custom Components
import Sidebar from '@components/sidebar'

import { useForm, Controller } from 'react-hook-form'

// ** Reactstrap Imports
import { Button, Label, FormText, Form, Input } from 'reactstrap'


// ** Store & Actions
// import { addUser } from '../store'
import { useDispatch } from 'react-redux'
import instance from '../../../utility/interceptor'

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

const SidebarNewUsers = ({ open, toggleSidebar }) => {

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
    value.preventDefault()
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
    data.preventDefault()
    setData(data)
    if (checkIsValid(data)) {
      AddNewUser(data)
    } else {
      for (const key in data) {
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
      <Form method='post' onSubmit={(value) => AddNewUser(value)}>
        <div className='mb-2'>
          <Label className='form-label' for='firstName'>
             <span className='text-danger'>*</span>{" "}نام
          </Label>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <Input id='firstName' placeholder='نام کاربر را وارد کنید' invalid={errors.firstName && true} {...field} />
            )}
          />
        </div>
        <div className='mb-2'>
          <Label className='form-label' for='lastName'>
             <span className='text-danger'>*</span>{" "}نام خانوادگی
          </Label>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <Input id='lastName' placeholder='نام خانوادگی کاربر را وارد کنید' invalid={errors.lastName && true} {...field} />
            )}
          />
        </div>
        <div className='mb-2'>
          <Label className='form-label' for='userEmail'>
             <span className='text-danger'>*</span>{" "}ایمیل
          </Label>
          <Controller
            name='gmail'
            control={control}
            render={({ field }) => (
              <Input
                type='gmail'
                id='userEmail'
                placeholder='example@gmail.com'
                invalid={errors.gmail && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-2'>
          <Label className='form-label' for='password'>
             <span className='text-danger'>*</span>{" "}رمز عبور
          </Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Input id='password' placeholder='رمز عبور کاربر را وارد کنید' invalid={errors.password && true} {...field} />
            )}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
        </div>
        <div className='mb-2'>
          <Label className='form-label' for='phoneNumber'>
             <span className='text-danger'>*</span>{" "}شماره موبایل
          </Label>
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field }) => (
              <Input id='phoneNumber' placeholder='(شماره موبایل کاربر را وارد کنید' invalid={errors.phoneNumber && true} {...field} />
            )}
          />
        </div>


        <div className='mb-2'>
          <Label className='form-label' for='isStudent'>
            <span className='text-danger'>*</span>سطح دسترسی کاربر 
          </Label>
          <div className='mt-2'>
            <span className='mx-8'>دانشجو</span>
            <Input type="checkbox" id='isStudent' name='isStudent' checked={student} onChange={handleStudentCheckbox}></Input>
            <span className='ml-2'>استاد</span>
            <Input type="checkbox" id='isTeacher' name='isTeacher' checked={teacher} onChange={handleTeacherCheckbox}></Input>
          </div>

        </div>
        
        {/* <div className='mb-2'>
          <Label className='form-label' for='user-role'>
            سطح دسترسی کاربر
          </Label>
          <Input type='select' id='user-role' name='user-role' value={role} onChange={e => setRole(e.target.value)}>
            <option value='teacher'>Teacher</option>
            <option value='student'>Student</option>
            <option value='courseAssistance'>CourseAssistance</option>
            <option value='employeeAdmin'>Employee.Admin</option>
            <option value='employeeWrite'>Employee.Writer</option>
            <option value='tournamentAdmin'>TournamentAdmin</option>
            <option value='tournamentMentor'>TournamentMentor</option>

          </Input>
        </div> */}
        {/* <div className='mb-1' value={plan} onChange={e => setPlan(e.target.value)}>
          <Label className='form-label' for='select-plan'>
            Select Plan
          </Label>
          <Input type='select' id='select-plan' name='select-plan'>
            <option value='basic'>Basic</option>
            <option value='enterprise'>Enterprise</option>
            <option value='company'>Company</option>
            <option value='team'>Team</option>
          </Input>
        </div> */}
        <Button type='submit' className='me-1 mt-2' color='primary'>
          ثبت اطلاعات
        </Button>
        <Button type='reset' className='mt-2' color='secondary' outline onClick={toggleSidebar}>
          لغو
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
