import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Col, Row, Button, Container, Card } from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import CouponManagerTable from "../components/manager/table.manager";
import Sidebar from "../components/dashboard/sidebar.component";
import NavBar from "../components/dashboard/navbar.component";

import { RoutePath } from "../router/routes";

const CouponManager: React.FC = () => {
  const value = "https://chekdin-merchant-coupons.s3.amazonaws.com/07e5a6a9-3b08-4a90-84f3-605bdfbd2050/coupons/a7519222-cb89-4b94-bd76-76888798a8d0.json";
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    (async () => 
    {
      
      // check for desktop size
      if(window.innerWidth < 767)
      {
        setIsMobile(true)
      }
      
      // function to check window size
      const windowUpdate = async () =>
      {
          if(window.innerWidth < 767)
          {
            setIsMobile(true)
          }
          else 
          {
            setIsMobile(false);
          }
      }

      
      window.addEventListener('resize', windowUpdate);
      return () => window.removeEventListener('resize', windowUpdate);
    })();
  }, []);

  return (
    <div>
      <Sidebar />
      <div className="content">
        <NavBar />
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h4>Coupon Manager</h4>
            <p className="mb-0">View and manage all coupons</p>
          </div>
          <Button as={Link} to={RoutePath.AddCoupon.path} className="me-2" variant="primary" size="lg">
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Coupon
          </Button>
        </div>

        <CouponManagerTable />

        <Row>
          <Col xs={6} className="mb-4 d-none d-sm-block"></Col>
        </Row>
      </div>
    </div>
  );
};

export default CouponManager;
