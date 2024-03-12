import React, { useEffect, useState } from "react";
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
import { DateRangePicker ,Loader } from 'rsuite';
import subDays from 'date-fns/subDays';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { date } from "yup";
import { start } from "repl";
// Define the type for the value parameter
// Define the type for the value parameter
type ValueFunction = (value?: [Date, Date]) => [Date, Date];

const predefinedRanges:any[] = [
  {
    label: 'Today',
    value: [new Date(), new Date()],
    placement: 'left'
  },
  {
    label: 'Yesterday',
    value: [addDays(new Date(), -1), addDays(new Date(), -1)],
    placement: 'left'
  },
  {
    label: 'This week',
    value: [startOfWeek(new Date()), endOfWeek(new Date())],
    placement: 'left'
  },
  {
    label: 'Last 7 days',
    value: [subDays(new Date(), 6), new Date()],
    placement: 'left'
  },
  {
    label: 'Last 30 days',
    value: [subDays(new Date(), 29), new Date()],
    placement: 'left'
  },
  {
    label: 'This month',
    value: [startOfMonth(new Date()), new Date()],
    placement: 'left'
  },
  {
    label: 'Last month',
    value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
    placement: 'left'
  },
  {
    label: 'This year',
    value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
    placement: 'left'
  },
  {
    label: 'Last year',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
    placement: 'left'
  },
  {
    label: 'All time',
    value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
    placement: 'left'
  },
  {
    label: 'Last week',
    closeOverlay: false,
    value: (value: Date[]) => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
      ];
    },
    appearance: 'default'
  },
  {
    label: 'Next week',
    closeOverlay: false,
    value: (value: Date[]) => {
      const [start = new Date()] = value || [];
      return [
        addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
        addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)
      ];
    },
    appearance: 'default'
  }
];


const Statistics: React.FC = () => {
  const [title, setTitle] = React.useState("ChekdIn Coupons");
  const [value, setValue] = React.useState<number[]>([]); // Track open rows
  const [topUser, setTopUser] = React.useState<any[]>([]);
  const [tableFlag, setTableFlag] = React.useState(false);
  const [checkdinCoupon, setCheckdinCoupon] = React.useState<number[]>([]); // Track open rows
  const [viewerCoupon, setViewerCoupon] = React.useState<number[]>([]); // Track open rows
  const [redeemCoupon, setRedeemCoupon] = React.useState<number[]>([]); // Track open rows\
  const [chekdinPer, setChekdinPer] = React.useState<number[]>([]); // Track open rows
  const [viewerPer, setViewerPer] = React.useState<number[]>([]); // Track open rows
  const [redeemPer, setRedeemPer] = React.useState<number[]>([]); // Track open rows
  const [loading, setLoading] = useState(false);

  const currentWeekStart =startOfWeek(new Date());
  const currentWeekEnd =endOfWeek(new Date());
  
  const [selectedDateRange, setSelectedDateRange] = useState<[Date, Date] | undefined>([currentWeekStart, currentWeekEnd]);
const [startDate, setStartDate] = useState<Date | null>(currentWeekStart);
const [endDate, setEndDate] = useState<Date | null>(currentWeekEnd);

const handleDateRangeChange = (value: [Date, Date] | null) => {
  
  if (value !== null) {
    setSelectedDateRange(value);
    fetchData(value[0],value[1]);
    fetchDataUser(value[0],value[1]);
  } else {
    setSelectedDateRange(undefined);
  }
  // You can also perform any additional actions here, such as calling an API with the selected date range
  console.log("Selected Date Range:", value);
};


  useEffect(() => {
    (async () => {
      window.addEventListener("resize", renderWindow);
    })();
  }, []);
  useEffect(() => {
    fetchData(startDate,endDate);
  }, []);

  const fetchData = async (sDate : any, eDate : any) => {
    try {
      const id = localStorage.getItem("merchantId");
      const accessToken = localStorage.getItem("accessToken");
      let startDate_ = "";
      let endDate_ ="";
    
      if(sDate != null){
        startDate_=formatDate(sDate);
      }
      if(eDate != null){
         endDate_ = formatDate(eDate);
      }
      
      if (id && accessToken && startDate && endDate) {
        setLoading(true);
        const res = await fetch(`https://api.chekdin.com/api/v1/merchant/merchant-stats?merchant_id=${id}&start-date=${startDate_}&end-date=${endDate_}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
          }
        });

        if (res.ok) {
          setLoading(false);

          const data = await res.json();
          const stats = data?.data?.[0];

          if (stats) {
            setCheckdinCoupon(stats.checkdinCoupon);
            setViewerCoupon(stats.viewerCoupon);
            setRedeemCoupon(stats.redeemedCoupon);
            setChekdinPer(stats.viewer_percentage_increase)
            setViewerPer(stats.checkdin_percentage_increase)
            setRedeemPer(stats.redeemed_percentage_increase)
          }
        } else {
          setLoading(false);
          console.error('Failed to fetch data:', res.status);
        }
      }
    } catch (error) {
      setLoading(false);

      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    
    fetchDataUser(startDate,endDate);
  }, []);


  const fetchDataUser = async (sDate : any,eDate : any) => {
    try {
      const id = localStorage.getItem("merchantId");
      const accessToken = localStorage.getItem("accessToken");
      let startDate_ = "";
      let endDate_ ="";
    
      if(sDate != null){
        startDate_=formatDate(sDate);
      }
      if(eDate != null){
         endDate_ = formatDate(eDate);
      }
      if (id && accessToken && sDate && eDate) {
        setLoading(true);

        const res = await fetch(`https://api.chekdin.com/api/v1/merchant/top-chekdin-users?merchant_id=${id}&start-date=${startDate_}&end-date=${endDate_}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(accessToken)}`
          }
        });

        if (res.ok) {
          setLoading(false);

          const data = await res.json();
          const stats = data?.data;

          if (stats) {
            setTopUser(stats)
            console.warn('stats', stats)
          }
        } else {
          setLoading(false);
          console.error('Failed to fetch data:', res.status);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  function formatDate(date : Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  


  const SalesValueChart = (chartData: any, chartLabels: any) => {
    return <></>;
  };

  const SalesValueWidget = (props: any) => {
    const { title, value, percentage, couponName, couponValue } = props;
    console.warn('title', title, value)
    const percentageIcon = percentage < 0 ? faAngleDown : faAngleUp;
    const percentageColor = percentage < 0 ? "text-danger" : "text-success";

    if (!tableFlag) {
      return (
        <Card className="bg-secondary-alt shadow-sm">
          <Card.Header className="d-flex flex-row align-items-center flex-0">
            <div className="d-block">
              <h5 className="fw-normal mb-2">{title}</h5>
              <h3>{couponValue}</h3>
              <small className="fw-bold mt-2">
                <span className="me-2">Yesterday</span>
                <FontAwesomeIcon
                  icon={percentageIcon}
                  className={`${percentageColor} me-1`}
                />
                <span className={percentageColor}>  {percentage !== null ? `${String(percentage).split('.')[0]}` : "0"}%</span>
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
                  <th className="border-bottom">User Name</th>
                  {/* <th className="border-bottom">Email</th> */}
                  <th className="border-bottom">Chekdin Count</th>
                  {/* <th className="border-bottom">Percentage</th> */}
                </tr>
              </thead>
              <tbody>
                {topUser.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    {/* <td>{user.email}</td> */}
                    <td>{user.checkin_count}</td>
                    {/* <td>{user.percentage_increase !== null ? `${String(percentage).split('.')[0]}` : "0"}%</td> */}
                  </tr>
                ))}
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
          <Col xs={3} className="mb-4 d-none d-sm-block">
            <h1>Analytics</h1>
            <Row>  
          <label>Please select date range:</label>
            <DateRangePicker
             defaultValue={selectedDateRange && selectedDateRange.length === 2 ? selectedDateRange : undefined}
            onChange={handleDateRangeChange}
            ranges={predefinedRanges}
            showOneCalendar
            placeholder="Date range"
            style={{ width: 300 }}
            onShortcutClick={(shortcut, event) => {
              console.log(shortcut);
            }}
          />
            {loading && <Loader size="xs" content="Loading..." />} {/* Display loader if loading state is true */}
          </Row>
          </Col>
          <Col xs={12} className="mb-4 d-sm-block">
          
            <SalesValueWidget
              title={title}
              percentage={title == 'ChekdIn Coupons' ? chekdinPer : title === 'Viewer Coupons' ? viewerPer : title === 'Redeems' ? redeemPer : 0} // Pass the coupon value here
              couponName="ChekdIn Coupons" // Pass the coupon name here
              couponValue={title == 'ChekdIn Coupons' ? checkdinCoupon : title === 'Viewer Coupons' ? viewerCoupon : title === 'Redeems' ? redeemCoupon : 0} // Pass the coupon value here
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
              title={checkdinCoupon}
              period="Feb 1 - Apr 1"
              percentage={chekdinPer !== null ? String(chekdinPer).split('.')[0] : "0"}
              icon={faBuilding}
              iconColor="shape-secondary"
            />
          </Col>
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="Viewer Coupons"
              title={viewerCoupon}
              period="Feb 1 - Apr 1"
              percentage={viewerPer !== null ? String(viewerPer).split('.')[0] : "0"}
              icon={faUserAlt}
              iconColor="shape-tertiary"
            />
          </Col>
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="Redeems"
              title={redeemCoupon}
              period="Feb 1 - Apr 1"
              percentage={redeemPer !== null ? String(redeemPer).split('.')[0] : "0"}
              icon={faCheckSquare}
              iconColor="shape-primary"
            />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col xs={12} sm={6} xl={4} className="mb-4">
            <CounterWidget
              category="Top 10 ChekdIn Users"
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
