// ** Reactstrap Imports
import { Card, CardBody, CardText, Row } from 'reactstrap'
// import GregorianToSolar from '../../../../utility/GregorianToSolar/GregorianToSolar'

const ProfileConnection = ({ data }) => {

  return (
    <Card>
      <CardBody>
        <h3 className='mb-3 text-center'>راه های ارتباطی کاربر</h3>

        <h5 className='mb-75'>شماره موبایل:</h5>
        <CardText>{data.phoneNumber}</CardText>
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

export default ProfileConnection;
