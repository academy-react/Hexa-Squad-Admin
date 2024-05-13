import { Fragment, useContext, useEffect, useState } from "react";
import { CheckSquare, CreditCard, DollarSign, Eye, Save, User, XCircle } from "react-feather";
import { Row, Col } from "reactstrap";
import { getAdminPanelReport } from "../utility/api/GetData/GetAdminPanelReport";
import StatsVertical from "../@core/components/widgets/stats/StatsVertical";
import StatsHorizontal from "../@core/components/StatsHorizontal";
import { ThemeColors } from '@src/utility/context/ThemeColors'
import ReportChart from "./Dashboard/ReportChart";

// ** Styles
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import CardCongratulations from "./Dashboard/CardCongratulations";

const Home = () => {

  const { colors } = useContext(ThemeColors)

  const [data, setData] = useState([])

  useEffect(() => {
    getAdminPanelReport(setData)
  },[])

  return (
    <Fragment>
      <Row className=''>
        <Col lg='6' sm='12'>
          <CardCongratulations data={data} />
        </Col>
        <Col lg='3' sm='6'>
          <StatsVertical
            icon={<User size={21} />}
            color="info"
            stats={data.allUser}
            statTitle="تعداد تمام کاربر ها"
          />        
        </Col>
        <Col lg='3' sm='6'>
          <StatsVertical
            icon={<Save size={21} />}
            color="info"
            stats={data.allReserve}
            statTitle="تعداد تمام دوره های رزرو شده"
          />        
        </Col>
      </Row>
      <Row>
        <Col
          lg={{ size: 6, order: 3 }}
          sm={{ size: 12 }}
          xs={{ order: 3 }}        
        >
          <ReportChart 
            data={data} 
            primary={colors.success.main} 
            danger={colors.danger.main} 
            title={"اطلاعات کاربران"}
            total={"همه ی کاربران"}
            active={"کاربران فعال"}
            diactive={"کاربران غیر فعال"}
            totalCount={data.allUser}
            activeCount={data.inCompeletUserCount}
            diactiveCount={data.deactiveUsers}
            activePercent={data.activeUserPercent && data.activeUserPercent.slice(0, 2)}
            activeLlabel={'کاربران فعال'}
            diactivePercent={data.interActiveUserPercent && data.interActiveUserPercent.slice(0, 1)}
            diactiveLlabel={"کاربران غیرفعال"}
          />
        </Col>
        <Col
          lg={{ size: 6, order: 3 }}
          sm={{ size: 12 }}
          xs={{ order: 3 }}        
        >
          <ReportChart 
            data={data} 
            primary={colors.success.main} 
            danger={colors.danger.main} 
            title={"اطلاعات دوره ها"}
            total={"همه ی دوره های رزرو شده"}
            active={"رزرو های تایید شده"}
            diactive={"رزرو های تایید نشده"}
            totalCount={data.allReserve}
            activeCount={data.allReserveAccept}
            diactiveCount={data.allReserveNotAccept}
            activePercent={data.reserveAcceptPercent && data.reserveAcceptPercent.slice(0, 2)}
            activeLlabel={"رزوهای تایید شده"}
            diactivePercent={data.reserveNotAcceptPercent && data.reserveNotAcceptPercent.slice(0, 2)}
            diactiveLlabel={"رزوهای تایید نشده"}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Home;
