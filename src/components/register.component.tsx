import React, { useState } from "react";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUnlockAlt,
  faMobileButton,
  faBuilding,
  faBusinessTime,
  faBuildingCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Row,
  Col,
  Button,
  Form as FormBS,
  InputGroup,
  Card,
  FormCheck,
} from "@themesberg/react-bootstrap";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "yup-phone";

import { RoutePath } from "../router/routes";
import IUser from "../types/user.type";
import BgImage from "../assets/signin.svg";

const Register: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [termsConfirmed, isTermsConfirmed] = useState<boolean>(false);

  const initialValues: IUser = {
    email: "",
    password: "",
    phoneNumber: "",
    businessName: "",
    businessWebsite: "",
    businessAddress: "",
    businessVolume: "",
    businessFacebook: "",
    businessInstagram: "",
    businessTwitter: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required."),
    password: Yup.string()
      .required("This field is required.")
      .min(8, "Password requires more than 8 characters")
      .matches(/^(?=.*[!@#\$%\^&\*])/, "Password requires a special character")
      .matches(/^(?=.*[A-Z])/, "Password requires an uppercase letter")
      .matches(/^(?=.*[0-9])/, "Password requires a number"),
    confirmPassword: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
    phoneNumber: Yup.string()
      .phone("US", true, "Please enter a valid phone number.")
      .required("This field is required.")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(10, "Only ten digits are allowed"),
    businessWebsite: Yup.string().required("This field is required."),
    businessName: Yup.string()
      .max(256, "Max 256 characters")
      .required("This field is required"),
    businessAddress: Yup.string().max(256, "Max 256 characters"),
    businessVolume: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(256, "Max 256 characters"),
    termsCheckbox: Yup.boolean().oneOf(
      [true],
      "Terms and Conditions must be checked"
    ),
  });

  const confirmCheckBox = () => {
    if (!termsConfirmed) {
      isTermsConfirmed(true);
    } else {
      isTermsConfirmed(false);
    }
  };

  const handleRegister = (formValue: IUser) => {
    const {
      email,
      password,
      phoneNumber,
      businessName,
      businessAddress,
      businessWebsite,
      businessVolume,
      businessFacebook,
      businessInstagram,
      businessTwitter,
    } = formValue;

    console.log(formValue);

    const business_name = businessName ? businessName : "None";
    const business_address = businessAddress ? businessAddress : "None";
    const business_volume = businessVolume ? businessVolume : "None";
    const business_facebook = businessFacebook ? businessFacebook : "None";
    const business_twitter = businessTwitter ? businessTwitter : "None";
    const business_instagram = businessInstagram ? businessInstagram : "None";
    const business_website = businessWebsite ? businessWebsite : "None";

    const phone_number = "+1" + phoneNumber;

    localStorage.setItem("registerUsername", email);
    localStorage.setItem("registerPassword", password);
    localStorage.setItem("business_name", business_name);
    localStorage.setItem("business_address", business_address);
    localStorage.setItem("business_volume", business_volume);
    localStorage.setItem("business_facebook", business_facebook);
    localStorage.setItem("business_twitter", business_twitter);
    localStorage.setItem("business_instagram", business_instagram);
    localStorage.setItem("business_website", business_website);
    localStorage.setItem("phone_number", phone_number);

    setTimeout(() => {
      navigate("/paymentform");
    }, 1500);
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Create an account</h3>
                </div>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, actions) => {
                    handleRegister(values);
                    actions.setSubmitting(true);
                  }}
                >
                  <Form>
                    {!successful && (
                      <div className="mt-4">
                        <FormBS.Group id="businessName" className="mb-4">
                          <FormBS.Label>Business Name</FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBusinessTime} />
                            </InputGroup.Text>
                            <Field
                              name="businessName"
                              type="text"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="businessName"
                            component="div"
                            className="alert alert-danger"
                          />
                        </FormBS.Group>
                        <FormBS.Group id="businessAddress" className="mt-4">
                          <FormBS.Label>Business Address</FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon
                                icon={faBuildingCircleExclamation}
                              />
                            </InputGroup.Text>
                            <Field
                              name="businessAddress"
                              type="text"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="businessAddress"
                            component="div"
                            className="alert alert-danger"
                          />
                        </FormBS.Group>
                        <FormBS.Group id="phoneNumber" className="mb-4">
                          <FormBS.Label>Your Phone Number</FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faMobileButton} />
                            </InputGroup.Text>
                            <Field
                              name="phoneNumber"
                              type="text"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="alert alert-danger"
                          />
                        </FormBS.Group>
                        <FormBS.Group id="businessWebsite" className="mb-4">
                          <FormBS.Label>Website</FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBuilding} />
                            </InputGroup.Text>
                            <Field
                              name="businessWebsite"
                              type="text"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="businessWebsite"
                            component="div"
                            className="alert alert-danger"
                          />
                        </FormBS.Group>
                        <FormBS.Group id="email" className="mb-4">
                          <FormBS.Label>
                            Your Email (which will also be your username)
                          </FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faEnvelope} />
                            </InputGroup.Text>
                            <Field
                              name="email"
                              type="text"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="alert alert-danger"
                          />
                        </FormBS.Group>
                        <FormBS.Group id="password" className="mb-4">
                          <FormBS.Label>Your Password</FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Field
                              name="password"
                              type="password"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="alert alert-danger"
                          />
                        </FormBS.Group>
                        <FormBS.Group id="confirmPassword" className="mb-4">
                          <FormBS.Label>Confirm Password</FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Field
                              name="confirmPassword"
                              type="password"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="alert alert-danger"
                          />
                        </FormBS.Group>
                        <FormCheck type="checkbox" className="d-flex mb-4">
                          <FormCheck.Input
                            required
                            id="terms"
                            className="me-2"
                            onChange={() => {
                              confirmCheckBox();
                            }}
                          />
                          <FormCheck.Label htmlFor="terms">
                            I agree to the{" "}
                            <Card.Link href="https://app.termly.io/document/terms-of-use-for-website/f9b23560-eb82-4e60-811d-434dc2541ec5">
                              terms and conditions
                            </Card.Link>
                          </FormCheck.Label>
                        </FormCheck>
                        {/* <a
                          style={{
                            fontSize: "12px",
                            color: "blue",
                            textAlign: "center",
                            textDecorationLine: "underline",
                          }}
                          href="https://app.termly.io/document/terms-of-use-for-website/f9b23560-eb82-4e60-811d-434dc2541ec5"
                        >
                          By Clicking Sign Up, you agree to the terms and
                          conditions.
                        </a> */}

                        {/* <FormBS.Group id="businessVolume" className="mb-4">
                          <FormBS.Label>
                            Business Volume (Optional)
                          </FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faBarChart} />
                            </InputGroup.Text>
                            <Field
                              name="businessVolume"
                              type="text"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="businessVolume"
                            component="div"
                            className="alert alert-danger"
                          />
                        </FormBS.Group> */}
                        <Button
                          variant="primary"
                          className={
                            termsConfirmed ? "w-100" : "w-100 disabled"
                          }
                          type="submit"
                        >
                          Sign Up
                        </Button>
                      </div>
                    )}

                    {message && (
                      <FormBS>
                        <div
                          className={
                            successful
                              ? "alert alert-success"
                              : "alert alert-danger"
                          }
                          role="alert"
                        >
                          {message}
                        </div>
                      </FormBS>
                    )}
                  </Form>
                </Formik>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or</span>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Already have an account?
                    <Card.Link
                      as={Link}
                      to={RoutePath.Login.path}
                      className="fw-bold"
                    >
                      {` Login here `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Register;
