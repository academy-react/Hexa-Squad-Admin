// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

const ProfileAbout = ({ data }) => {
  return (
    <Card>
      <CardBody>
        <h5 className='mb-75'>درباره من</h5>
        <CardText>{data.userAbout}</CardText>
        <div className='mt-2'>
          <h5 className='mb-75'>تاریخ ورود:</h5>
          <CardText>{data.insertDate}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>آدرس محل زندگی:</h5>
          <CardText>{data.homeAdderess}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>ایمیل:</h5>
          <CardText>{data.gmail}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>لینکدین:</h5>
          <CardText>{data.linkdinProfile}</CardText>
        </div>
        <div className='mt-2'>
          <h5 className='mb-75'>تلگرام:</h5>
          <CardText>{data.telegramLink}</CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default ProfileAbout
