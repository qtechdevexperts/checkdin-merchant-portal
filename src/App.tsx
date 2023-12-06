import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";

import "./styles/_main.scss";
import PrivateRoute from "./router/privateRoutes";
import Register from "./components/register.component";
import RegisterConfirmation from "./components/registerConfirm.component";
import Login from "./components/login.component";
import BusinessAccount from "./pages/account.dashboard";
import CouponManager from "./pages/manager.dashboard";
import AddCouponPage from "./pages/addcoupon.dashboard";
import Statistics from "./pages/statistics.dashboard";
import Stripe from "./components/stripe.component";
import PostStripe from "./components/postStripe.componenet";
import UpdateUserDashboard from "./pages/updateUser.dashboard";
import ForgotPassword from "./components/forgotPassword.component";
import ConfirmForgotPassword from "./components/confirmForgotPassword.component";
import CouponHistory from "./components/manager/history.manager";
import AccountSetting from "./components/accountsetting.component";

// eslint-disable-next-line

const App: React.FC = () => {
  return (
    <Container fluid>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route
          path="/registerconfirmation"
          element={<RegisterConfirmation />}
        />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="/confirmforgotpassword"
          element={<ConfirmForgotPassword />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/paymentform" element={<Stripe />} />
        <Route path="/paymentcompletion" element={<PostStripe />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <BusinessAccount />
            </PrivateRoute>
          }
        />
        {/* <Route path="/" element={<BusinessAccount />} /> */}
        <Route
          path="/couponmanager"
          element={
            <PrivateRoute>
              <CouponManager />
            </PrivateRoute>
          }
        />
        {/* <Route path="/couponmanager" element={<CouponManager />} /> */}
        <Route
          path="/addcoupon"
          element={
            <PrivateRoute>
              <AddCouponPage />
            </PrivateRoute>
          }
        />
        {/* <Route path="/addcoupon" element={<AddCouponPage />} /> */}
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/accountsetting" element={<AccountSetting />} />
        <Route path="/updateuser" element={<UpdateUserDashboard />} />
        <Route
          path="/history/:id"
          element={
            <PrivateRoute>
              <CouponHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
