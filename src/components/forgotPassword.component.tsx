import React, { useState } from "react";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
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
import { forgotPassword } from "../services/auth.service";

const ForgotPassword: React.FC = () => {
  let navigate: NavigateFunction = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const initialValues: {
    username: string;
  } = {
    username: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required."),
  });

  const handleSubmit = (formValue: { username: string }) => {
    const { username } = formValue;

    setLoading(true);

    try {
      console.log(username);

      localStorage.setItem("FPUsername", username);

      forgotPassword(username).then((response: any) => {
        console.log(response);

        if (response.data.body) {
          const parsedRes = JSON.parse(response.data.body);
          setSuccessful(true);
          setMessage(
            `Confirmation has been sent to ${parsedRes.CodeDeliveryDetails.Destination}. Redirecting you to create password page.`
          );

          setTimeout(() => {
            navigate("/confirmforgotpassword");
          }, 3000);

          console.log(parsedRes);
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
                  to={RoutePath.Login.path}
                  className="text-gray-700"
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
                  Back to Sign In
                </Card.Link>
              </p>
              <Col
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h3>Forgot Password</h3>
                  <p className="mb-4">
                    Just type in your username and we will send you a code to
                    reset your password!
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
                        <FormBS.Group id="username" className="mb-4">
                          <FormBS.Label>Username</FormBS.Label>
                          <InputGroup>
                            <InputGroup.Text>
                              <FontAwesomeIcon icon={faUser} />
                            </InputGroup.Text>
                            <Field
                              name="username"
                              type="text"
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            name="username"
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

export default ForgotPassword;
