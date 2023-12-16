import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardTitle,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'

const ReportChart = ({
    data,
    primary, 
    danger,
    title,
    total,
    active,
    diactive,
    totalCount,
    activeCount,
    diactiveCount,
    activePercent,
    activeLlabel,
    diactivePercent,
    diactiveLlabel,
}) => {

    const options1 = {
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '50%'
          },
          track: {
            background: '#D3D3D3',
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: -5,
              fontFamily: 'Montserrat',
              fontSize: '1rem'
            },
            value: {
              offsetY: 15,
              fontFamily: 'Montserrat',
              fontSize: '1.714rem'
            }
          }
        }
      },
      colors: [danger],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 8
      },
      labels: [activeLlabel]
    },
    series1 = [activePercent]

    const options2 = {
      plotOptions: {
        radialBar: {
          size: 150,
          offsetY: 20,
          startAngle: -150,
          endAngle: 150,
          hollow: {
            size: '50%'
          },
          track: {
            background: '#D3D3D3',
            strokeWidth: '100%'
          },
          dataLabels: {
            name: {
              offsetY: -5,
              fontFamily: 'Montserrat',
              fontSize: '1rem'
            },
            value: {
              offsetY: 15,
              fontFamily: 'Montserrat',
              fontSize: '1.714rem'
            }
          }
        }
      },
      colors: [danger],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: [primary],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        dashArray: 8
      },
      labels: [diactiveLlabel]
    },
    series2 = [diactivePercent]

  return (
    <Card>
      <CardHeader className='pb-0 d-flex'>
        <CardTitle tag='h2'>{title}</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          {/* <Col sm='2' className='d-flex flex-column flex-wrap text-center'>
            <h1 className='font-large-2 fw-bolder mt-2 mb-0'>{data.totalTicket}</h1>
            <CardText>Tickets</CardText>
          </Col> */}
          <Col sm='15' className='d-flex justify-content-center'>
            <Chart options={options1} series={series1} type='radialBar' height={270} id='support-tracker-card' />
            <Chart options={options2} series={series2} type='radialBar' height={270} id='support-tracker-card' />
          </Col>
        </Row>
        <div className='d-flex justify-content-between mt-1'>
          <div className='text-center'>
            <CardText className='mb-50'>{total}</CardText>
            <span className='font-large-1 fw-bold'>{totalCount}</span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>{active}</CardText>
            <span className='font-large-1 fw-bold'>{activeCount}</span>
          </div>
          <div className='text-center'>
            <CardText className='mb-50'>{diactive}</CardText>
            <span className='font-large-1 fw-bold'>{diactiveCount}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}
export default ReportChart
