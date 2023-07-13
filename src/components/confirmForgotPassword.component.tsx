import React, { useState } from "react";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faUnlockAlt, faHashtag } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Col,
  Row,
  Form as FormBS,
  InputGroup,
  Button,
  Card,
} from "@themesberg/react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { RoutePath } from "../router/routes";
import BgImage from "../assets/signin.svg";
import { forgotPasswordConfirm } from "../services/auth.service";

const ConfirmForgotPassword: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    code: string;
    password: string;
    confirmPassword: string;
  } = {
    code: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string().required("This field is required."),
    password: Yup.string()
      .required("This field is required.")
      .min(8, "Password requires more than 8 characters")
      .matches(/^(?=.*[!@#\$%\^&\*])/, "Password requires a special character")
      .matches(/^(?=.*[A-Z])/, "Password requires an uppercase letter")
      .matches(/^(?=.*[0-9])/, "Password requires a number"),
    confirmPassword: Yup.string()
      .required("Please retype your password.")
      .oneOf([Yup.ref("password")], "Your passwords do not match."),
  });

  const handleSubmit = (formValue: { code: string; password: string }) => {
    const { code, password } = formValue;

    const username = localStorage.getItem("FPUsername") || "";

    setLoading(true);

    try {
      console.log(username);

      forgotPasswordConfirm(code, password, username).then((response: any) => {
        console.log(response);

        if (response.data.body) {
          setSuccessful(true);
          setMessage("Password change successful! Redirecting you to login page.");

          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }

        if (response.data.errorMessage) {
          setSuccessful(false);
          setMessage(response.data.errorMessage);
        }
      });

      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
      setSuccessful(false);
      setMessage("An error has occured.");
    }
  };

  return (
    <>
      <main>
        <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
          <Container>
            <Row
              className="justify-content-center form-bg-image"
              style={{ backgroundImage: `url(${BgImage})` }}
            >
              <p className="text-center">
                <Card.Link
                  as={Link}
                  to={RoutePath.ForgotPassword.path}
                  className="text-gray-700"
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
                  Back to Forgot Password
                </Card.Link>
              </p>
              <Col
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h3>Create New Password</h3>
                  <p className="mb-4">
                    Type in your confirmation code and new password below.
                  </p>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(data) => {
                      handleSubmit(data);
                    }}
                  >
                    <Form>
                      <div className="mt-4">
                        <FormBS.Group id="code" className="mb-4">
                          <FormBS.Label>Confirmation Code</FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faHashtag} />
                            </InputGroup.Text>
                            <Field
                              name="code"
                              type="text"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="code"
                            component="div"
                            className="alert alert-danger mt-1"
                          />
                        </FormBS.Group>
                        <FormBS.Group id="password" className="mb-4">
                          <FormBS.Label>New Password</FormBS.Label>
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
                            className="alert alert-danger mt-1"
                          />
                        </FormBS.Group>
                        <FormBS.Group id="confirmPassword" className="mb-4">
                          <FormBS.Label>Confirm New Password</FormBS.Label>
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
                            className="alert alert-danger mt-1"
                          />
                        </FormBS.Group>
                        <FormBS.Group>
                          <Button
                            variant="primary"
                            type="submit"
                            className="w-100"
                            disabled={loading}
                          >
                            {loading && (
                              <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Submit</span>
                          </Button>
                        </FormBS.Group>
                        {message && (
                          <div
                            className={
                              successful
                                ? "alert alert-success mt-2 text-center"
                                : "alert alert-danger mt-2 text-center"
                            }
                            role="alert"
                          >
                            {message}
                          </div>
                        )}
                      </div>
                    </Form>
                  </Formik>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </>
  );
};

export default ConfirmForgotPassword;
