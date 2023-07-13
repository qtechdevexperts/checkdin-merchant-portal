import React from "react";
import Sidebar from "../components/dashboard/sidebar.component";
import NavBar from "../components/dashboard/navbar.component";
import AddCoupon from "../components/manager/addcoupon.manager";
import { Row, Col, Container } from "@themesberg/react-bootstrap";

const AddCouponPage: React.FC = () => {
  const value = "Insert Value Here";
  return (
    <div>
      <Sidebar />
      <div className="content">
        <NavBar />
        <AddCoupon />
      </div>
    </div>
  );
};

export default AddCouponPage;
