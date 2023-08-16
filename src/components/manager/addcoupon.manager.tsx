import React, { useState } from "react";
import {
  Col,
  Row,
  Button,
  InputGroup,
  Form as FormBS,
  Card,
} from "@themesberg/react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faCalendarAlt,
  faDollarSign,
  faFileLines,
  faAngleLeft,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { RegisterValues } from "../../types/auth.type";
import { RoutePath } from "../../router/routes";
import { ADD_ITEM_COUPON_MANAGER_URL } from "../../constants";

const AddCoupon: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);

  const initialValues: RegisterValues = {
    coupon_term: "",
    discount_amount: "",
    discount_type: "Fixed",
    start_date: "",
    end_date: "",
    coupon_type: "Chekdin Coupon",
    redeem_code: ""
  };

  const validationSchema = Yup.object().shape({
    coupon_term: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required."),
    discount_amount: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(256, "Max 256 characters")
      .required("This is field is required"),
    discount_type: Yup.string().required("This field is required"),
    start_date: Yup.date().required("This field is required"),
    end_date: Yup.date().required("This field is required"),
    coupon_type: Yup.string().required("This field is required."),
    redeem_code: Yup.string().required("This is field is required"),
  });
  let accessTkn = localStorage.getItem("accessToken") || "";
  let id = localStorage.getItem("merchantId")

  const handleSubmit = async (formValue: RegisterValues) => {
    const {
      coupon_term,
      discount_amount,
      discount_type,
      start_date,
      end_date,
      coupon_type,
      redeem_code
    } = formValue;

    let userID = localStorage.getItem("userID") || "";
    let business_address = localStorage.getItem("business_address") || "";
    let business_name = localStorage.getItem("business_name") || "";

    const UUID = await uuidv4();

    console.log("merchant-id", id);


    let requestBody = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JSON.parse(accessTkn)}`
      },
      body: JSON.stringify({
        // UID: UUID,
        // user_id: JSON.parse(userID),
        offer_title: coupon_term,
        discount_amount,
        discount_type,
        start_date,
        expiry_date: end_date,
        isActive: true,
        coupon_type: coupon_type,
        coupon_code: redeem_code,
        business_address: business_address,
        name: 'Buy one get one',
        offer_description: 'test',
        merchant: JSON.parse(id)
      }),
    };

    try {
      let response = await fetch(ADD_ITEM_COUPON_MANAGER_URL, requestBody);
      let json = await response.json();
      console.log(json);
      setMessage("Coupon added.");
      setSuccessful(true);
    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
      setSuccessful(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <p className="text-center">
            <Card.Link
              as={Link}
              to={RoutePath.CouponManager.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to
              Coupon Manager
            </Card.Link>
          </p>
        </div>
      </div>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Add Coupon</h5>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Row>
                <Col md={12} className="mb-3">
                  <FormBS.Group id="coupon_term" className="mb-4">
                    <FormBS.Label>Current Chekdin Offer and Terms</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileLines} />
                      </InputGroup.Text>
                      <Field
                        name="coupon_term"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="coupon_term"
                      component="div"
                      className="alert alert-danger mt-1"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="discount_amount" className="mb-4">
                    <FormBS.Label>Discount Amount</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faDollarSign} />
                      </InputGroup.Text>
                      <Field
                        name="discount_amount"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="discount_amount"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="discount_type" className="mb-4">
                    <FormBS.Label>Discount Type</FormBS.Label>
                    <Field as={FormBS.Select} name="discount_type">
                      <option value="User">Fixed</option>
                      <option value="Percentage">Percentage</option>
                    </Field>
                    <ErrorMessage
                      name="discount_type"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="coupon_type" className="mb-4">
                    <FormBS.Label>Coupon Type</FormBS.Label>
                    <Field as={FormBS.Select} name="coupon_type">
                      <option value="Chekdin Coupon">Chekdin Coupon</option>
                      <option value="User Coupon">User Coupon</option>
                    </Field>
                    <ErrorMessage
                      name="coupon_type"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="redeem_code" className="mb-4">
                    <FormBS.Label>Redeem Code</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faTag} />
                      </InputGroup.Text>
                      <Field
                        name="redeem_code"
                        type="text"
                        className="form-control"
                        placeholder="6-digit code"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="redeem_code"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="start_date" className="mb-4">
                    <FormBS.Label>Start Date</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Field
                        name="start_date"
                        type="date"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="start_date"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="end_date" className="mb-4">
                    <FormBS.Label>End Date</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Field
                        name="end_date"
                        type="date"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="end_date"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <div className="mt-1 text-center">
                <Button className="w-50" variant="primary" type="submit">
                  Submit
                </Button>
              </div>
              {message && (
                <div className="d-flex justify-content-center text-center">
                  <div
                    className={
                      successful
                        ? "alert alert-success w-50 mt-3"
                        : "alert alert-danger w-50 mt-3"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
            </Form>
          </Formik>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AddCoupon;
