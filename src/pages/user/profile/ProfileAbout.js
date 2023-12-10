import { useState } from 'react'
import { Card, CardBody, CardText, Row, Badge } from 'reactstrap'
// import GregorianToSolar from '../../../../utility/GregorianToSolar/GregorianToSolar'

const ProfileAbout = ({ data }) => {

  return (
    <Card>
      <CardBody>
        <h3 className='text-center mb-3'>اطلاعات کاربر</h3>
        <div className='mt-2'>
          <h5 className='mb-75'>نام کاربری:</h5>
          <CardText>{data.userName}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>کدملی:</h5>
          <CardText>{data.nationalCode}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>وضعیت کاربر:</h5>
          {data.active ? (
              <Badge color="light-success">فعال</Badge>
            ) : (
              <Badge color="light-danger">غیر فعال</Badge>
            )}          
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>درباره من:</h5>
          <CardText>{data.userAbout}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>تاریخ تولد:</h5>
          <CardText>{data.birthDay}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>آدرس محل زندگی:</h5>
          <CardText>{data.homeAdderess}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
