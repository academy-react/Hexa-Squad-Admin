// ** Icons Imports
import { Award } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

// ** Images
import decorationLeft from '@src/assets/images/pages/pages/decore-left.png'
import decorationRight from '@src/assets/images/pages/pages/decore-right.png'

const CardCongratulations = ({data}) => {
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left w-25' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right w-25' src={decorationRight} alt='decor-right' />
        <Avatar icon={<Award size={12} />} className='shadow' color='primary' size='base' />
        <div className='text-center'>
          <h3 className='mb-1 text-white'>تبریک!</h3>
          <CardText className='m-auto w-75'>
            مبلغ تمام پرداختی دوره های تیم هگزا اسکواد<strong>{" "+data.allPaymentCost}</strong> تومان است. 
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
