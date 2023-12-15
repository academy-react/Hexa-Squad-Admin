// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, Row, Col } from "reactstrap";
import StatsVertical from "../../@core/components/widgets/stats/StatsVertical";
import { Award, Eye, MessageSquare, ShoppingBag } from "react-feather";

const Detail = ({ detail }) => {
  console.log("detail", detail);
  return (
    <div>
      <Row className="pt-1">
        <Col xl="3" md="6">
          <StatsVertical
            icon={<Eye size={21} />}
            color="info"
            stats={detail.courseUserTotal}
            statTitle="دانشجو ها"
          />
        </Col>
        <Col xl="3" md="6">
          <StatsVertical
            icon={<MessageSquare size={21} />}
            color="warning"
            stats={detail.courseCommentTotal}
            statTitle="نظر"
          />
        </Col>
        <Col xl="3" md="6">
          <StatsVertical
            icon={<ShoppingBag size={21} />}
            color="danger"
            stats={detail.paymentDoneTotal}
            statTitle="خرید موفق"
          />
        </Col>
        <Col xl="3" md="6">
          <StatsVertical
            icon={<Award size={21} />}
            color="success"
            stats={detail.courseLikeTotal}
            statTitle="نفر پسندیدند"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Detail;
