import React, { useEffect } from "react";
import Sidebar from "../components/dashboard/sidebar.component";
import NavBar from "../components/dashboard/navbar.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faBuilding,
  faUserAlt,
  faCheckSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Card, Table } from "@themesberg/react-bootstrap";
import { renderWindow } from "../services/user.service";

const Statistics: React.FC = () => {
  const [title, setTitle] = React.useState("ChekdIn Coupons");
  const [headerNum, setHeaderNum] = React.useState("0");
  const [tableFlag, setTableFlag] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    (async () => {
      if (await renderWindow()) setIsMobile(true);
      else setIsMobile(false);

      window.addEventListener("resize", renderWindow);
    })();
  }, []);

  const SalesValueChart = (chartData: any, chartLabels: any) => {
    return <></>;
  };

  const SalesValueWidget = (props: any) => {
    const { title, value, percentage } = props;
    const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
    const percentageColor = percentage < 0 ? "text-danger" : "text-success";

    if (!tableFlag) {
      return (
        <Card className="bg-secondary-alt shadow-sm">
          <Card.Header className="d-flex flex-row align-items-center flex-0">
            <div className="d-block">
              <h5 className="fw-normal mb-2">{title}</h5>
              <h3>{value}</h3>
              <small className="fw-bold mt-2">
                <span className="me-2">Yesterday</span>
                <FontAwesomeIcon
                  icon={percentageIcon}
                  className={`${percentageColor} me-1`}
                />
                <span className={percentageColor}>{percentage}%</span>
              </small>
            </div>
            <div className="d-flex ms-auto">
              {/* <Button variant="secondary" size="sm" className="me-2">
                Month
              </Button>
              <Button variant="primary" size="sm" className="me-3">
                Week
              </Button> */}
            </div>
          </Card.Header>
          <Card.Body className="p-2">
            <SalesValueChart />
          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card>
          <Card.Header className="d-flex flex-row align-items-center flex-0">
            <div className="d-block">
              <h5 className="fw-normal mb-2">{title}</h5>
              <h3>{value}</h3>
            </div>
            <div className="d-flex ms-auto">
              {/* <Button variant="secondary" size="sm" className="me-2">
                Month
              </Button>
              <Button variant="primary" size="sm" className="me-3">
                Week
              </Button> */}
            </div>
          </Card.Header>
          <Card.Body className="p-2">
            <Table responsive hover className="user-table align-items-center">
              <thead className="align-items-center">
                <tr>
                  <th className="border-bottom">User</th>
                  <th className="border-bottom">Impressions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <span>Results will show one month after usage</span>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      );
    }
  };

  const CounterWidget = (props: any) => {
    const { icon, iconColor, category, title, percentage } = props;
    const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
    const percentageColor = percentage < 0 ? "text-danger" : "text-success";

    return (
      <Card
        border="light"
        className="shadow-sm"
        onClick={() => {
          setTitle(props.category);
          if (props.category === "Top 10 ChekdIn Users") {
            setTableFlag(true);
          } else {
            setTableFlag(false);
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <Card.Body>
          <Row className="d-block d-xl-flex align-items-center">
            <Col
              xl={5}
              className="text-xl-center d-flex align-items-center justify-content-xl-center mb-3 mb-xl-0"
            >
              <div
                className={`icon icon-shape icon-md icon-${iconColor} rounded me-4 me-sm-0`}
              >
                <FontAwesomeIcon icon={icon} />
              </div>
              <div className="d-sm-none">
                <h5>{category}</h5>
                <h3 className="mb-1">{title}</h3>
              </div>
            </Col>
            <Col xs={12} xl={7} className="px-xl-0">
              <div className="d-none d-sm-block">
                <h5>{category}</h5>
                <h3 className="mb-1">{title}</h3>
              </div>
              {/* <small>
                {period}, <FontAwesomeIcon icon={faGlobeEurope} size="xs" />{" "}
                WorldWide
              </small> */}
              <div className="small mt-2">
                <FontAwesomeIcon
                  icon={percentageIcon}
                  className={`${percentageColor} me-1`}
                />
                <span className={`${percentageColor} fw-bold`}>
                  {percentage}%
                </span>{" "}
                Since last month
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <Sidebar />
      <div className="content">
        <NavBar />
        <Row>
          <Col xs={6} className="mb-4 d-none d-sm-block">
            <h1>Statistics</h1>
          </Col>
          <Col xs={12} className="mb-4 d-sm-block">
            <SalesValueWidget
              title={title}
              value={headerNum}
              percentage={headerNum}
            />
          </Col>
          {/* <Col xs={12} className="mb-4 d-sm-none">
              <SalesValueWidgetPhone
                title="Coupon Report"
                value="10,567"
                percentage={10.57}
              />
            </Col> */}
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="ChekdIn Coupons"
              title="0"
              period="Feb 1 - Apr 1"
              percentage={0}
              icon={faBuilding}
              iconColor="shape-secondary"
            />
          </Col>
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="User Coupons"
              title={headerNum}
              period="Feb 1 - Apr 1"
              percentage={0}
              icon={faUserAlt}
              iconColor="shape-tertiary"
            />
          </Col>
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="Redeems"
              title={headerNum}
              period="Feb 1 - Apr 1"
              percentage={0}
              icon={faCheckSquare}
              iconColor="shape-primary"
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="Top 10 ChekdIn Users"
              title="N / A"
              period="Feb 1 - Apr 1"
              icon={faUserAlt}
              iconColor="shape-secondary"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Statistics;
