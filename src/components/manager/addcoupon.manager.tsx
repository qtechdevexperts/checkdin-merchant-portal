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
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
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
import FormData from "form-data";

const AddCoupon: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const [chekdinCouponImage, setChekdinCouponImage] = useState<any>({
    name: "",
  });
  const [viewCouponImage, setViewCouponImage] = useState<any>({ name: "" });
  let navigate: NavigateFunction = useNavigate();

  const initialValues: RegisterValues = {
    chekdin_name: "",
    chekdin_start_date: "",
    chekdin_expiry_date: "",
    chekdin_offer_title: "",
    chekdin_offer_description: "",
    chekdin_url: "",
    chekdin_discount_type: "",
    chekdin_coupon_type: "",
    chekdin_discount_amount: "",
    view_name: "",
    view_start_date: "",
    view_expiry_date: "",
    view_offer_title: "",
    view_offer_description: "",
    view_url: "",
    view_discount_type: "Chekdin Coupon",
    view_coupon_type: "Chekdin Coupon",
    view_discount_amount: "",
    chekdin_coupon_img_url: "",
    view_coupon_img_url: "",
  };

  const validationSchema = Yup.object().shape({
    chekdin_name: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required."),
    view_name: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required."),
    chekdin_offer_title: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required."),
    view_offer_title: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required."),
    chekdin_offer_description: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required."),
    view_offer_description: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required."),
    chekdin_url: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required."),
    view_url: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required."),
    chekdin_discount_amount: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(256, "Max 256 characters")
      .required("This is field is required"),
    view_discount_amount: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(256, "Max 256 characters")
      .required("This is field is required"),
    chekdin_discount_type: Yup.string().required("This field is required"),
    view_discount_type: Yup.string().required("This field is required"),
    chekdin_start_date: Yup.date().required("This field is required"),
    view_start_date: Yup.date().required("This field is required"),
    chekdin_expiry_date: Yup.date().required("This field is required"),
    view_expiry_date: Yup.date().required("This field is required"),
    coupon_type: Yup.string().required("This field is required."),
  });
  let accessTkn = localStorage.getItem("accessToken") || "";
  let id = localStorage.getItem("merchantId") ?? 10;

  const handleSubmit = async (formValue: RegisterValues) => {
    const formData = new FormData();

    // Append each form field's value to the formData object
    formData.append("chekdin_name", formValue.chekdin_name);
    formData.append("chekdin_start_date", formValue.chekdin_start_date);
    formData.append("chekdin_expiry_date", formValue.chekdin_expiry_date);
    formData.append("chekdin_offer_title", formValue.chekdin_offer_title);
    formData.append(
      "chekdin_offer_description",
      formValue.chekdin_offer_description
    );
    formData.append("chekdin_url", formValue.chekdin_url);
    formData.append("chekdin_discount_type", formValue.chekdin_discount_type);
    formData.append("chekdin_coupon_type", formValue.chekdin_coupon_type);
    formData.append(
      "chekdin_discount_amount",
      formValue.chekdin_discount_amount
    );
    formData.append("view_name", formValue.view_name);
    formData.append("view_start_date", formValue.view_start_date);
    formData.append("view_expiry_date", formValue.view_expiry_date);
    formData.append("view_offer_title", formValue.view_offer_title);
    formData.append("view_offer_description", formValue.view_offer_description);
    formData.append("view_url", formValue.view_url);
    formData.append("view_discount_type", formValue.view_discount_type);
    formData.append("view_coupon_type", formValue.view_coupon_type);
    formData.append("view_discount_amount", formValue.view_discount_amount);
    formData.append("chekdin_coupon_img_url", chekdinCouponImage);
    formData.append("view_coupon_img_url", viewCouponImage);

    // console.log("here");
    // const {
    //   chekdin_name,
    //   chekdin_start_date,
    //   chekdin_expiry_date,
    //   chekdin_offer_title,
    //   chekdin_offer_description,
    //   chekdin_url,
    //   chekdin_discount_type,
    //   chekdin_coupon_type,
    //   chekdin_discount_amount,
    //   view_name,
    //   view_start_date,
    //   view_expiry_date,
    //   view_offer_title,
    //   view_offer_description,
    //   view_url,
    //   view_discount_type,
    //   view_coupon_type,
    //   view_discount_amount,
    //   chekdin_coupon_img_url,
    //   view_coupon_img_url,
    // } = formValue;

    let userID = localStorage.getItem("userID") || "";
    let business_address = localStorage.getItem("business_address") || "";
    let business_name = localStorage.getItem("business_name") || "";

    const UUID = await uuidv4();

    console.log("merchant-id", id);

    // let requestBody = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${JSON.parse(accessTkn)}`,
    //   },
    //   body: formData,
    //   // body: JSON.stringify({
    //   //   // UID: UUID,
    //   //   // user_id: JSON.parse(userID),
    //   //   chekdin_name,
    //   //   chekdin_start_date,
    //   //   chekdin_expiry_date,
    //   //   chekdin_offer_title,
    //   //   chekdin_offer_description,
    //   //   chekdin_url,
    //   //   chekdin_discount_type,
    //   //   chekdin_coupon_type,
    //   //   chekdin_discount_amount,
    //   //   view_name,
    //   //   view_start_date,
    //   //   view_expiry_date,
    //   //   view_offer_title,
    //   //   view_offer_description,
    //   //   view_url,
    //   //   view_discount_type,
    //   //   view_coupon_type,
    //   //   view_discount_amount,
    //   //   chekdin_coupon_img_url,
    //   //   view_coupon_img_url,
    //   // }),
    // };
    const request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(accessTkn)}`,
      },
      body: formData,
    };

    try {
      let response = await fetch(ADD_ITEM_COUPON_MANAGER_URL, request);
      let json = await response.json();
      console.log(json);
      setMessage("Coupon added.");
      setSuccessful(true);
      navigate("/couponmanager");
    } catch (error) {
      console.log("merchant id", id);
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
                  <FormBS.Group id="chekdin_name" className="mb-4">
                    <FormBS.Label>Chekdin Name</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileLines} />
                      </InputGroup.Text>
                      <Field
                        name="chekdin_name"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="chekdin_name"
                      component="div"
                      className="alert alert-danger mt-1"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mb-3">
                  <FormBS.Group id="view_name" className="mb-4">
                    <FormBS.Label>View Name</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileLines} />
                      </InputGroup.Text>
                      <Field
                        name="view_name"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="view_name"
                      component="div"
                      className="alert alert-danger mt-1"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="chekdin_offer_title" className="mb-4">
                    <FormBS.Label>Chekdin Offer Title</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileLines} />
                      </InputGroup.Text>
                      <Field
                        name="chekdin_offer_title"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="chekdin_offer_title"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="view_offer_title" className="mb-4">
                    <FormBS.Label>View Offer Title</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileLines} />
                      </InputGroup.Text>
                      <Field
                        name="view_offer_title"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="view_offer_title"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mb-3">
                  <FormBS.Group id="chekdin_offer_description" className="mb-4">
                    <FormBS.Label>Chekdin Description</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileLines} />
                      </InputGroup.Text>
                      <Field
                        name="chekdin_offer_description"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="chekdin_offer_description"
                      component="div"
                      className="alert alert-danger mt-1"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mb-3">
                  <FormBS.Group id="view_offer_description" className="mb-4">
                    <FormBS.Label>View Description</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileLines} />
                      </InputGroup.Text>
                      <Field
                        name="view_offer_description"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="view_offer_description"
                      component="div"
                      className="alert alert-danger mt-1"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="chekdin_discount_amount" className="mb-4">
                    <FormBS.Label>Chekdin Discount Amount</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faDollarSign} />
                      </InputGroup.Text>
                      <Field
                        name="chekdin_discount_amount"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="chekdin_discount_amount"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="view_discount_amount" className="mb-4">
                    <FormBS.Label>View Discount Amount</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faDollarSign} />
                      </InputGroup.Text>
                      <Field
                        name="view_discount_amount"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="view_discount_amount"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="chekdin_discount_type" className="mb-4">
                    <FormBS.Label>Chekdin Discount Type</FormBS.Label>
                    <Field as={FormBS.Select} name="chekdin_discount_type">
                      <option value="User">Fixed</option>
                      <option value="Percentage">Percentage</option>
                    </Field>
                    <ErrorMessage
                      name="chekdin_discount_type"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="view_discount_type" className="mb-4">
                    <FormBS.Label>View Discount Type</FormBS.Label>
                    <Field as={FormBS.Select} name="view_discount_type">
                      <option value="User">Fixed</option>
                      <option value="Percentage">Percentage</option>
                    </Field>
                    <ErrorMessage
                      name="view_discount_type"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="chekdin_coupon_type" className="mb-4">
                    <FormBS.Label>Coupon Type</FormBS.Label>
                    <Field as={FormBS.Select} name="chekdin_coupon_type">
                      <option value="Chekdin Coupon">Chekdin Coupon</option>
                      <option value="User Coupon">User Coupon</option>
                    </Field>
                    <ErrorMessage
                      name="chekdin_coupon_type"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
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
              </Row>
              {/* <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="redeem_code" className="mb-4">
                    <FormBS.Label>Redeem Code</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faTag} />
                      </InputGroup.Text>
                      <Field
                        name="redeem_code"
                        type="number"
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
              </Row> */}
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="chekdin_start_date" className="mb-4">
                    <FormBS.Label>Chekdin Start Date</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Field
                        name="chekdin_start_date"
                        type="date"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="chekdin_start_date"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="chekdin_expiry_date" className="mb-4">
                    <FormBS.Label>Chekdin Expity Date</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Field
                        name="chekdin_expiry_date"
                        type="date"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="chekdin_expiry_date"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="mb-3">
                  <FormBS.Group id="chekdin_url" className="mb-4">
                    <FormBS.Label>Chekdin URL</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileLines} />
                      </InputGroup.Text>
                      <Field
                        name="chekdin_url"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="chekdin_url"
                      component="div"
                      className="alert alert-danger mt-1"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row>
                <Row>
                  <Col md={12} className="mb-3">
                    <FormBS.Group id="chekdin_coupon_img_url" className="mb-4">
                      <FormBS.Label>Chekdin Coupon Image URL</FormBS.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faFileLines} />
                        </InputGroup.Text>
                        <Field
                          id="chekdin_coupon_img_url"
                          name="chekdin_coupon_img_url"
                          type="file"
                          className="form-control"
                          onChange={(event: any) => {
                            setChekdinCouponImage(event.currentTarget.files[0]);
                          }}
                        />
                      </InputGroup>
                      {chekdinCouponImage?.name && (
                        <div className="mt-2">
                          Selected Image: {chekdinCouponImage.name}
                        </div>
                      )}
                      <ErrorMessage
                        name="chekdin_coupon_img_url"
                        component="div"
                        className="alert alert-danger mt-1"
                      />
                    </FormBS.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={12} className="mb-3">
                    <FormBS.Group id="view_coupon_img_url" className="mb-4">
                      <FormBS.Label>View Coupon Image URL</FormBS.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faFileLines} />
                        </InputGroup.Text>
                        <Field
                          name="view_coupon_img_url"
                          type="file"
                          className="form-control"
                          onChange={(event: any) => {
                            setViewCouponImage(event.currentTarget.files[0]);
                          }}
                        />
                      </InputGroup>
                      {viewCouponImage?.name && (
                        <div className="mt-2">
                          Selected Image: {viewCouponImage.name}
                        </div>
                      )}
                      <ErrorMessage
                        name="view_coupon_img_url"
                        component="div"
                        className="alert alert-danger mt-1"
                      />
                    </FormBS.Group>
                  </Col>
                </Row>
                <Col md={12} className="mb-3">
                  <FormBS.Group id="view_url" className="mb-4">
                    <FormBS.Label>View URL</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFileLines} />
                      </InputGroup.Text>
                      <Field
                        name="view_url"
                        type="text"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="view_url"
                      component="div"
                      className="alert alert-danger mt-1"
                    />
                  </FormBS.Group>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col md={6} className="mb-3">
                  <FormBS.Group id="view_start_date" className="mb-4">
                    <FormBS.Label>View Start Date</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Field
                        name="view_start_date"
                        type="date"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="view_start_date"
                      component="div"
                      className="alert alert-danger"
                    />
                  </FormBS.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <FormBS.Group id="view_expiry_date" className="mb-4">
                    <FormBS.Label>View Expity Date</FormBS.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendarAlt} />
                      </InputGroup.Text>
                      <Field
                        name="view_expiry_date"
                        type="date"
                        className="form-control"
                      />
                    </InputGroup>
                    <ErrorMessage
                      name="view_expiry_date"
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
